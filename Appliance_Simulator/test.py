import serial
ser = serial.Serial('COM3', 9600)
while True:
    ch = input("input: ")
    ser.write(bytes(ch, 'UTF-8'))

