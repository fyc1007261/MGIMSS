from appliance import Appliance
import requests
import time
import threading
import datetime
import socket


# define
# frequency in seconds
frequency = 15
server = "http://localhost:12333/post_appliance"
file_name = "appliances.mgimss"
host = "localhost"
port = 12334

lock = threading.Lock()
global temp_id


def get_apps(apps):
    global temp_id
    with open(file_name, 'r') as file:
        info = file.readlines()
        for line in info:
            line = eval(line)
            app = Appliance(line[0], line[1], line[2], line[3], line[4])
            temp_id += 1
            apps.append(app)


def save_apps(apps):
    with open(file_name, 'w') as file:
        for app in apps:
            file.write(str(app.get_all()))
            file.write("\n")


def all_to_server(url, apps):
    lock.acquire()
    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    for app in apps:
        single_to_server(url, app, now)
    lock.release()


def single_to_server(url, appliance, now):
    app_id, name, voltage, current, status = appliance.get_all()
    payload = {'time': now, 'id': app_id, 'name': name, 'voltage': voltage, 'current': current, 'status': status}
    try:
        r = requests.post(url=url, data=payload)
        # print(r.text)
    except requests.exceptions.ConnectionError:
        print("Cannot connect to the server")


def continuous_sending(url, apps):
    while 1:
        lock.acquire()
        all_to_server(url, apps)
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
    app = Appliance(temp_id, info["name"], info["voltage"], info["current"])
    temp_id += 1
    apps.append(app)
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


def switch_status(apps, app_id):
    lock.acquire()
    for appliance in apps:
        if appliance.get_id() == app_id:
            status = appliance.get_status()
            if status == 1:
                if appliance.turn_off() != 0:
                    lock.release()
                    return -1
                break
            else:
                if appliance.turn_on() != 0:
                    lock.release()
                    return -1
                break
    else:
        print("No such appliance.")
        lock.release()
        return -1
    save_apps(apps)
    lock.release()
    return 0


def wait_server():
    sk = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sk.bind((host, port))
    sk.listen(1)
    while 1:
        conn, addr = sk.accept()
        print("Connected by back-end.")
        data = conn.recv(1024)
        print(str(data))
        conn.close()


def main():
    global temp_id
    temp_id = 0
    # including all the appliances added
    apps = []
    get_apps(apps)
    # create a thread to continually send info to the server
    thread_cont_send = threading.Thread(target=continuous_sending, args=(server, apps,))
    thread_cont_send.start()
    # create a thread to process requests from back-end
    thread_proccess_request = threading.Thread(target=wait_server, args=())
    thread_proccess_request.start()

    # man-made operations
    while 1:
        print()
        print("Input a number:")
        print("1. Show all conditions")
        print("2. Add new appliance")
        print("3. Change properties of an appliance")
        print("4. Turn on/off an appliance")
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
                print("Success")
            else:
                print("Error")
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
                print("Success")
            else:
                print("Error")
        elif selection == "4":
            try:
                app_id = int(input("ID?"))
            except ValueError:
                print("Invalid input")
                continue
            if switch_status(apps, app_id) == 0:
                print("Success")
            else:
                print("Error")


main()
