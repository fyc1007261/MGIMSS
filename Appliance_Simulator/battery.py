import datetime
import requests
import pytz
import datetime


tz = pytz.timezone('Asia/Shanghai')
username = "531121540741hVPxo"
password = "4MXFSbf"
# generation = {0: 0,
#               1: 0,
#               2: 0,
#               3: 0,
#               4: 0,
#               5: 16,
#               6: 57,
#               7: 104,
#               8: 148,
#               9: 190,
#               10: 221,
#               11: 236,
#               12: 236,
#               13: 224,
#               14: 197,
#               15: 156,
#               16: 107,
#               17: 57,
#               18: 15,
#               19: 0,
#               20: 0,
#               21: 0,
#               22: 0,
#               23: 0
#               }


def get_generation():
    today = datetime.datetime.now(tz).strftime('%Y%m%d') + "000000"
    yesterday = (datetime.datetime.now(tz) - datetime.timedelta(days=1)).strftime('%Y%m%d') + "000000"
    time_range = [yesterday, today]

    generation = {x: 0 for x in range(24)}
    args = {"userID": username, "pwd": password, "dataFormat": "json", "staIDs": 58361,
            "interfaceId": "getRadiEleByTimeRangeAndStaID", "dataCode": "RADI_CHN_MUL_HOR2400",
            "timeRange": "[20180731000000,20180801000000]", "elements": "V14311"
            }
    r = requests.get("http://api.data.cma.cn:8090/api", args)
    response = eval(r.text)
    if response["returnCode"] != "0":
        print("Err: fail to get solar generation")
        print(response["returnMessage"])
        return generation
    count = int(response["rowCount"])
    zeros = int((24 - count)/2)
    for i in range(zeros, zeros + count):
        generation[i] = round(eval(response["DS"][i-zeros]["V14311"]))
    return generation


class Battery:
    def __init__(self, max_power):
        self.__max_power = max_power
        self.__power = 0
        self.__generation_volume = get_generation()

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
        return self.charge(self.__generation_volume[hour] * sec)

    def get_power(self):
        return self.__power

    def get_generation_volume(self):
        return self.__generation_volume


if __name__ == "__main__":
    battery = Battery(200)
    print(battery.get_generation_volume())
