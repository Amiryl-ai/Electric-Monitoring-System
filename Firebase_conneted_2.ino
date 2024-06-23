#include <WiFi.h>
#include <FirebaseESP32.h>
#include <time.h>

// Define the unique ID for this ESP32
#define DEVICE_ID "ESP32_Device_3"  // Change this for each ESP32

// WiFi credentials
#define WIFI_SSID "Hostel 47"
#define WIFI_PASSWORD "Lina@710"

// Firebase project details
#define FIREBASE_HOST "https://electricmonitor-fb-default-rtdb.asia-southeast1.firebasedatabase.app/"
#define FIREBASE_AUTH "UjqNeleG7ZweiYsc7Favs4yXNesJOHab54IRte0t"

// Initialize Firebase
FirebaseData firebaseData;
FirebaseConfig firebaseConfig;
FirebaseAuth firebaseAuth;

void setup() {
  Serial.begin(115200);

  // Connect to WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi!");

  // Initialize Firebase config
  firebaseConfig.host = FIREBASE_HOST;
  firebaseConfig.signer.tokens.legacy_token = FIREBASE_AUTH;

  // Initialize Firebase
  Firebase.begin(&firebaseConfig, &firebaseAuth);
  Firebase.reconnectWiFi(true);

  // Initialize time
  initializeTime();

  // Test sending data
  sendDataToFirebase();
}

void loop() {
  // Periodically send data to Firebase
  sendDataToFirebase();
  delay(5000);  // Adjust as needed
}

String getCurrentTimestamp() {
  time_t now;
  struct tm timeinfo;
  
  if (!::getLocalTime(&timeinfo)) {
    Serial.println("Failed to obtain time");
    return "";
  }
  
  char buffer[30];
  strftime(buffer, sizeof(buffer), "%Y-%m-%d/%H:%M:%S", &timeinfo);

  return String(buffer);
}

void sendDataToFirebase() {
  float voltage = analogRead(35) * (3.3 / 4095.0);  // Example voltage reading
  float current = analogRead(34) * (3.3 / 4095.0);  // Example current reading
  float power = voltage * current;  // Example power calculation

  String timestamp = getCurrentTimestamp();

  // Prepare the data in JSON format
  FirebaseJson json;
  json.set("device_id", DEVICE_ID);
  json.set("voltage", voltage);
  json.set("current", current);
  json.set("power", power);
  json.set("timestamp", timestamp);

  // Send data to Firebase under the path "devices/DEVICE_ID"
  String path = "/devices/" + String(DEVICE_ID);
  if (Firebase.pushJSON(firebaseData, path, json)) {
    Serial.println("Data sent to Firebase successfully.");
  } else {
    Serial.print("Failed to send data to Firebase: ");
    Serial.println(firebaseData.errorReason());
  }
}

void initializeTime() {
  configTime(28800, 0, "pool.ntp.org", "time.nist.gov"); // UTC +8 hours for Malaysia
  Serial.println("Waiting for NTP time sync.");
  while (!time(nullptr)) {
    Serial.print(".");
    delay(1000);
  }
  Serial.println("");
}

void fetchLocalTime(struct tm * info) {
  time_t now;
  time(&now);
  localtime_r(&now, info);
}
