import serial
ser = serial.Serial('COM3', 9600)
option_on = b'b'
option_off = b'a'


class Appliance:
    def __init__(self, app_id, name="unknown appliance", voltage=220, current=0, status=0):
        self.__id = app_id
        self.__voltage = voltage
        self.__current = current
        self.__name = name
        # status==1 for on and 0 for off.
        self.__status = status

    def get_id(self):
        return self.__id

    def set_voltage(self, voltage):
        self.__voltage = voltage

    def set_current(self, current):
        self.__current = current

    def set_name(self, name):
        self.__name = name

    def turn_on(self):
        if self.__status == 1:
            return -1
        self.__status = 1
        return 0

    def turn_off(self):
        if self.__status == 0:
            return -1
        self.__status = 0
        return 0

    def get_voltage(self):
        return self.__voltage

    def get_current(self):
        return self.__current

    def get_name(self):
        return self.__name

    def get_status(self):
        # 1 for on and 0 for off
        return self.__status

    def get_all(self):
        # get the name, voltage, current and status of the appliance
        return self.get_id(), self.get_name(), self.get_voltage(),\
               self.get_current(), self.get_status()


class ArduinoLED(Appliance):
    def __init__(self, app_id, name="unknown appliance", voltage=220, current=0, status=0):
        Appliance.__init__(self, app_id, name, voltage, current, status)
        if status == 1:
            ser.write(option_on)
        if status == 0:
            ser.write(option_off)

    def turn_on(self):
        ser.write(option_on)
        return Appliance.turn_on(self)

    def turn_off(self):
        ser.write(option_off)
        return Appliance.turn_off(self)
