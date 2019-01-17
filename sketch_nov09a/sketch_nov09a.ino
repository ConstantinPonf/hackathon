
#include <MFRC522.h>
#include <SPI.h>
//#include <MFRC522.h>

#define SS_PIN 10 // SDA an Pin 10
#define RST_PIN 9 // RST an Pin 9

MFRC522 mfrc522(SS_PIN, RST_PIN); // RFID-Empfänger benennen

void setup() {
  // put your setup code here, to run once

  Serial.begin(9600);
  while (!Serial);    // Do nothing if no serial port is opened (added for Arduinos based on ATMEGA32U4)
  SPI.begin();

  mfrc522.PCD_Init();
  pinMode(2, OUTPUT);
  digitalWrite(2, HIGH);


}

void loop() {
  // Look for new cards
  if ( ! mfrc522.PICC_IsNewCardPresent())
    return;

  // Select one of the cards
  if ( ! mfrc522.PICC_ReadCardSerial())
    return;


  // Show some details of the PICC (that is: the tag/card)
  Serial.print(F("Card UID:"));
  dump_byte_array(mfrc522.uid.uidByte, mfrc522.uid.size);
  Serial.println();
  Serial.print(F("PICC type: "));
  MFRC522::PICC_Type piccType = mfrc522.PICC_GetType(mfrc522.uid.sak);
  Serial.println(mfrc522.PICC_GetTypeName(piccType));

  delay(1000);
  digitalWrite(2, LOW);
  delay(3000);
  digitalWrite(2, HIGH);
  delay(2000);

  // Halt PICC
  mfrc522.PICC_HaltA();
  // Stop encryption on PCD
  mfrc522.PCD_StopCrypto1();
}
/**
   Helper routine to dump a byte array as hex values to Serial.
*/
void dump_byte_array(byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? " 0" : " ");
    Serial.print(buffer[i], HEX);
  }
}
