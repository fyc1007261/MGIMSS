from appliance import Appliance, ArduinoLED
from battery import Battery

import requests
import time
import threading
import datetime
import socket
import random
import pytz
import serial

ser = serial.Serial('COM3', 9600,timeout=0.5)

# define
# whether to print log when succeeded
print_log = 1
# frequency in seconds
frequency = 5
# solar generation
frequency_solar_generation = 1800
area_of_solar_generator = 60
server_solar_generation = "http://localhost:12333/battery/post_generation"  #(String time, int generation)
# as a http client
server = "http://localhost:12333/appliance/post_appliance"
server_change = "http://localhost:12333/appliance/notify_status_change"
server_battery = "http://localhost:12333/battery/post_remaining"  # (String time, int remaining)
server_battery_overflow = "http://localhost:12333/battery/overflow"

file_name = "appliances.mgimss"
tz = pytz.timezone('Asia/Shanghai')


# as a socket server
host = "localhost"
port = 12334

# battery
max_power = 200000

lock = threading.Lock()
global temp_id


def print_debug(obj):
    if print_log:
        print(obj)


def get_apps(apps):
    global temp_id
    with open(file_name, 'r') as file:
        info = file.readlines()
        for line in info:
            line = eval(line)
            if line[0] == 0:
                app = ArduinoLED(line[0], ser,line[1], line[2], line[3], line[4])
            else:
                app = Appliance(line[0], line[1], line[2], line[3], line[4])
            temp_id = line[0] + 1
            apps.append(app)


def save_apps(apps):
    with open(file_name, 'w') as file:
        for app in apps:
            file.write(str(app.get_all()))
            file.write("\n")


def all_to_server(url, apps, battery):
    overflow = 0
    now = datetime.datetime.now(tz).strftime('%Y-%m-%d %H:%M:%S')
    overflow += battery.auto_charge(frequency)
    for app in apps:
        if app.get_status() == 1:
            overflow += battery.discharge(app.get_current() * app.get_voltage() * frequency)
            single_to_server(url, app, now)
    # finally send the status of battery
    sensorStayus = battery.get_light_intensity(ser)
    light_intensity = sensorStayus[0]
    distance = sensorStayus[2]
    print(light_intensity)
    if (sensorStayus[1] == 0):
        my_switch_status(apps,0,0)
    else:
        my_switch_status(apps,0,1)
    print(sensorStayus[5])
    payload = {"time": now, "remaining": round(battery.get_power()), "uid": 1,"light_intensity":light_intensity,"distance":distance,"humidity":sensorStayus[3],"temperature":sensorStayus[4],"tigan":sensorStayus[5]}
    try:
        r = requests.post(url=server_battery, data=payload)
        if r.text.find("success") < 0:
            print("err: during sending battery status to server")
            print(r.text)
        else:
            print_debug("success when sending battery status to server at" + now)
    except requests.exceptions.ConnectionError:
        print("Cannot connect to the server")
    if overflow != 0:
        try:
            payload = {"time": now, "charge": round(abs(overflow)), "uid": 1, "option": round(overflow/abs(overflow))}
            r = requests.post(url=server_battery_overflow, data=payload)
            if r.text.find("success") < 0:
                print("err: during sending battery overflow status to server")
                print(r.text)
            else:
                print_debug("success when sending battery overflow status to server at" + now)
        except requests.exceptions.ConnectionError:
            print("Cannot connect to the server")

def my_switch_status(apps, app_id, option=-1):
    for appliance in apps:
        if appliance.get_id() == app_id:
            status = appliance.get_status()
            if option == status:
                return -1
            if status == 1:
                if appliance.turn_off() == 0:
                    print("LED open")
                    send_status_change(server_change, app_id, 0)
                    save_apps(apps)
                    return -1
                break
            else:
                if appliance.turn_on() == 0:
                    print("LED open")
                    send_status_change(server_change, app_id, 1)
                    save_apps(apps)
                    return -1
                break
    else:
        print("No such appliance.")
        return -1
    save_apps(apps)
    return 0


def single_to_server(url, appliance, now):
    app_id, name, voltage, current, status = appliance.get_all()
    payload = {'time': now, 'id': app_id, 'name': name,

               'voltage': (voltage + random.randrange(-10, 10)),
               'current': current,
               "uid": 1}
    try:
        r = requests.post(url=url, data=payload)
        if r.text != "success":
            print("err: during sending status to server")
            print(r.text)
        else:
            print_debug("success when sending app status to server at" + now)
    except requests.exceptions.ConnectionError:
        print("Cannot connect to the server")


def send_status_change(url, app_id, status):
    payload = {'id': app_id, 'mode': status,"uid":1}
    try:
        r = requests.post(url=url, data=payload)
        if r.text != "success":
            print("err: during sending status to server")
            print(r.text)
        else:
            print_debug("success when sending status change.")
    except requests.exceptions.ConnectionError:
        print("Cannot connect to the server")


def continuous_sending(url, apps, battery):
    while 1:
        lock.acquire()
        all_to_server(url, apps, battery)
        lock.release()
        time.sleep(frequency)


def show_all_apps(apps):
    for app in apps:
        print(app.get_all())


def create_app(apps, info):
    global temp_id
    lock.acquire()
    for appliance in apps:
        if appliance.get_name() == info["name"]:
            print("duplicate name of appliances.")
            lock.release()
            return -1
    if "id" not in info.keys():
        info["id"] = temp_id
    app = Appliance(info["id"], info["name"], info["voltage"], info["current"])
    temp_id += 1
    apps.append(app)
    save_apps(apps)
    lock.release()
    return 0


def create_app_from_server(apps, info):
    global temp_id
    lock.acquire()
    for appliance in apps:
        if appliance.get_id() == info["id"]:
            print("duplicate ids of appliances.")
            lock.release()
            return -1
    app = Appliance(info["id"], info["name"], info["voltage"], info["current"])
    apps.append(app)
    save_apps(apps)
    lock.release()
    return 0


def delete_app(apps, app_id):
    lock.acquire()
    for i in range(len(apps)):
        if apps[i].get_id() == app_id:
            del(apps[i])
            break
    else:
        print("nothing to delete")
        lock.release()
        return -1
    save_apps(apps)
    lock.release()
    return 0


def change_properties(apps, app_id, info):
    lock.acquire()
    for appliance in apps:
        if appliance.get_id() == app_id:
            appliance.set_current(info["current"])
            appliance.set_voltage(info["voltage"])
            break
    else:
        print("No such appliance.")
        lock.release()
        return -1
    save_apps(apps)
    lock.release()
    return 0


# option: 1 for on, 0 for off, -1 for switch
def m_switch_status(apps, app_id, option=-1):

    for appliance in apps:
        if appliance.get_id() == app_id:
            status = appliance.get_status()
            if option == status:

                return -1
            if status == 1:
                if appliance.turn_off() != 0:
                    send_status_change(server_change, app_id, 0)

                    return -1
                break
            else:
                if appliance.turn_on() != 0:
                    send_status_change(server_change, app_id, 1)

                    return -1
                break
    else:
        print("No such appliance.")

        return -1
    save_apps(apps)

    return 0


def wait_server(apps, battery):
    sk = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sk.bind((host, port))
    sk.listen()
    while 1:
        conn, addr = sk.accept()
        thread_doit = threading.Thread(target=do_server, args=(conn, addr,apps, battery))
        thread_doit.start()


def do_server(conn, addr, apps, battery):
    print("Connected by" + str(addr))
    data = conn.recv(1024)
    data = eval(data)
    option = data["option"]
    if option == "get":
        conn.send(b'Data will be delivered via http post.')
        all_to_server(server, apps)
    elif option == "on":
        try:
            app_id = eval(data["id"])
        except ValueError:
            conn.send(b"err: Invalid input")
            conn.close()
            return
        if m_switch_status(apps, app_id, 1) == 0:
            conn.send(b"success")
            print_debug("success when turning on an app")
            send_status_change(server_change, app_id, 1)
        else:
            conn.send(b"err: can't turn on appliance")
    elif option == "off":
        try:
            app_id = eval(data["id"])
        except ValueError:
            conn.send(b"err: Invalid input")
            conn.close()
            return
        if m_switch_status(apps, app_id, 0) == 0:
            conn.send(b"success")
            print_debug("success when turning off an app")
            send_status_change(server_change, app_id, 0)
        else:
            conn.send(b"err: can't turn off appliance")
    elif option == "add":
        try:
            app_id = eval(data["id"])
            app_name = data["name"]
            power = int(data["power"])
        except ValueError:
            conn.send(b"err: Invalid input")
            conn.close()
            return
        info = dict()
        info["id"] = app_id
        info["name"] = app_name
        info["voltage"] = 220
        info["current"] = power/220
        if create_app(apps, info) == 0:
            conn.send(b"success")
            print_debug("success when adding an app")
        else:
            conn.send(b"err: can't add appliance")
    elif option == "modify":
        try:
            app_id = eval(data["id"])
            power = int(data["power"])
        except ValueError:
            conn.send(b"err: Invalid input")
            conn.close()
            return
        for app in apps:
            if app.get_id() == app_id:
                app.set_current(power/220)
                conn.send(b"success")
                print_debug("success when modify app")
                break
        else:
            conn.send(b"err: No such appliance")
            conn.close()
            return
    elif option == "delete":
        try:
            app_id = eval(data["id"])
        except ValueError:
            conn.send(b"err: Invalid input")
            conn.close()
            return
        if delete_app(apps, app_id) == 0:
            conn.send(b"success")
            print_debug("success when deleting on an app")
        else:
            conn.send(b"err: can't delete appliance")
    elif option == "require_generation":
        try:
            hour = int(data["time"])
            value = battery.get_generation_volume()[hour] * area_of_solar_generator
        except ValueError:
            conn.send(b"err: Invalid input")
            conn.close()
            return
        conn.send(bytes(str(value), 'utf-8'))
    conn.close()


def send_solar_generation(battery):
    while 1:
        hour = int(datetime.datetime.now(tz).strftime('%H'))
        value = battery.get_generation_volume()[hour] * area_of_solar_generator
        try:
            r = requests.post(server_solar_generation,
                              {"time": datetime.datetime.now(tz).strftime('%Y-%m-%d %H:%M:%S'),
                                    "generation": value, "uid": 1})
            if r.text != "success":
                print("err: when sending solar generation to server.")
                print(r.text)
            else:
                print_debug(r.text)
        except requests.exceptions.ConnectionError:
            print("Cannot connect to the server")

        time.sleep(frequency_solar_generation)


def main():
    global temp_id
    temp_id = 0
    # including all the appliances added
    apps = []
    get_apps(apps)
    battery = Battery(max_power)
    # create a thread to continually send info to the server
    thread_cont_send = threading.Thread(target=continuous_sending, args=(server, apps, battery))
    thread_cont_send.start()
    # create a thread to process requests from back-end2
    thread_process_request = threading.Thread(target=wait_server, args=(apps, battery))
    thread_process_request.start()
    # create a thread to send solar generation
    thread_solar_generation = threading.Thread(target=send_solar_generation, args=(battery,))
    thread_solar_generation.start()
    # man-made operations
    while 1:
        print()
        print("Input a number:")
        print("1. Show all conditions")
        print("2. Add new appliance")
        print("3. Change properties of an appliance")
        print("4. Turn on/off an appliance")
        print("5. Delete an appliance")
        selection = input()
        if selection == "1":
            show_all_apps(apps)
        elif selection == "2":
            try:
                name = input("Name?")
                voltage = float(input("Voltage?"))
                current = float(input("Current?"))
            except ValueError:
                print("Invalid input")
                continue
            info = dict()
            info["name"] = name
            info["voltage"] = voltage
            info["current"] = current
            if create_app(apps, info) == 0:
                print("success")
            else:
                print("err:")
        elif selection == "3":
            try:
                app_id = int(input("ID?"))
                voltage = float(input("Voltage?"))
                current = float(input("Current?"))
            except ValueError:
                print("Invalid input")
                continue
            info = dict()
            info["id"] = app_id
            info["voltage"] = voltage
            info["current"] = current
            if change_properties(apps, app_id, info) == 0:
                print("success")
            else:
                print("err:")
        elif selection == "4":
            try:
                app_id = int(input("ID?"))
            except ValueError:
                print("Invalid input")
                continue
            if m_switch_status(apps, app_id) == 0:
                print("success")
            else:
                print("err:")
        elif selection == "5":
            try:
                app_id = int(input("ID?"))
            except ValueError:
                print("Invalid input")
                continue
            if delete_app(apps, app_id) == 0:
                print("success")
            else:
                print("err:")


if __name__ == "__main__":
    main()
