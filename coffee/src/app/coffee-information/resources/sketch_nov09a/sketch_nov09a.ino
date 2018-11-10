
#include <MFRC522.h>
#include <SPI.h>
//#include <MFRC522.h>

#define SS_PIN 10 // SDA an Pin 10
#define RST_PIN 9 // RST an Pin 9

MFRC522 mfrc522(SS_PIN, RST_PIN); // RFID-Empfänger benennen

void setup() {
  // put your setup code here, to run once

  Serial.begin(9600);

  SPI.begin();

  mfrc522.PCD_Init();
  pinMode(2, OUTPUT);
  digitalWrite(2, HIGH);

}

void loop() {
  // put your main code here, to run repeatedly:

 
// Diese Funktion wird in Endlosschleife ausgeführt
//&& mfrc522.PICC_ReadCardSerial()
  if (mfrc522.PICC_IsNewCardPresent()) {
 
    //Start 
    Serial.println("TRIGGER");
    delay(1000);
    //Serial.println();
    digitalWrite(2, LOW);
    delay(3000);
    digitalWrite(2, HIGH);
    delay(2000);
 
    // Versetzt die gelesene Karte in einen Ruhemodus, um nach anderen Karten suchen zu können.
    //mfrc522.PICC_HaltA();
  }
  Serial.println();
}
