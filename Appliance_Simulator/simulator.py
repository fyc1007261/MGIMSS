from appliance import Appliance
import requests
import time
import threading
import datetime

# frequency in seconds
frequency = 15
global temp_id
server = "http://localhost:12333/post_appliance"
lock = threading.Lock()


def get_apps(apps):
    global temp_id
    app = Appliance(temp_id, "light", 220, 0.2, 1)
    temp_id += 1
    apps.append(app)


def all_to_server(url, apps):
    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    for app in apps:
        single_to_server(url, app, now)


def single_to_server(url, appliance, now):
    app_id, name, voltage, current, status = appliance.get_all()
    payload = {'time': now, 'id': app_id, 'name': name, 'voltage': voltage, 'current': current, 'status': status}
    try:
        r = requests.post(url=url, data=payload)
        print(r.text)
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
    lock.release()
    return 0


def main():
    global temp_id
    temp_id = 0
    # including all the appliances added
    apps = []
    get_apps(apps)
    # create a thread to continually send info to the server
    thread_cont_send = threading.Thread(target=continuous_sending, args=(server, apps,))
    thread_cont_send.start()
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
