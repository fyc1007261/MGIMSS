import datetime

generation = {0: 0,
              1: 0,
              2: 0,
              3: 0,
              4: 0,
              5: 16,
              6: 57,
              7: 104,
              8: 148,
              9: 190,
              10: 221,
              11: 236,
              12: 236,
              13: 224,
              14: 197,
              15: 156,
              16: 107,
              17: 57,
              18: 15,
              19: 0,
              20: 0,
              21: 0,
              22: 0,
              23: 0
              }


class Battery:
    def __init__(self, max_power):
        self.__max_power = max_power
        self.__power = 0
        self.__generation_volume = generation

    def charge(self, value):
        self.__power += value
        if self.__power > self.__max_power:
            overflow = self.__power - self.__max_power
            self.__power = self.__max_power
            return overflow
        return 0

    def discharge(self, value):
        self.__power -= value
        if self.__power < 0:
            overflow = self.__power
            self.__power = 0
            return overflow
        return 0

    def auto_charge(self, sec):
        hour = int(datetime.datetime.now().strftime('%H'))
        return self.charge(generation[hour] * sec)

    def get_power(self):
        return self.__power

    def get_generation_volume(self):
        return self.__generation_volume


if __name__ == "__main__":
    battery = Battery(200)
    battery.auto_charge(200)