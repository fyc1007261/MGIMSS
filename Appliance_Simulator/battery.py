import datetime

generation = {0: 0,
              1: 0,
              2: 0,
              3: 0,
              4: 0,
              5: 50,
              6: 100,
              7: 200,
              8: 400,
              9: 800,
              10: 1200,
              11: 2000,
              12: 3000,
              13: 2000,
              14: 1200,
              15: 800,
              16: 400,
              17: 200,
              18: 100,
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

    def charge(self, value):
        self.__power += value

    def discharge(self, value):
        self.__power -= value

    def auto_charge(self, sec):
        hour = int(datetime.datetime.now().strftime('%H'))
        self.charge(generation[hour] * sec)

    def get_power(self):
        return self.__power


if __name__ == "__main__":
    battery = Battery(200)
    battery.auto_charge(200)

