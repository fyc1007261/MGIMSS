from appliance import Appliance
import requests
import time
import threading

# frequency in seconds
frequency = 15
server = "http://localhost:12333/post_appliance"
lock = threading.Lock()


def get_apps(apps):
    app = Appliance("light", 220, 0.2, 1)
    apps.append(app)


def all_to_server(url, apps):
    for app in apps:
        single_to_server(url, app)


def single_to_server(url, appliance):
    name, voltage, current, status = appliance.get_all()
    payload = {'name': name, 'voltage': voltage, 'current': current, 'status': status}
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
    lock.acquire()
    for appliance in apps:
        if appliance.get_name() == info["name"]:
            print("duplicate name of appliances.")
            lock.release()
            return -1
    app = Appliance(info["name"], info["voltage"], info["current"])
    apps.append(app)
    lock.release()


def change_properties(apps, name, info):
    lock.acquire()
    for appliance in apps:
        if appliance.get_name() == name:
            appliance.set_current(info["current"])
            appliance.set_voltage(info["voltage"])
            break
    else:
        print("No such appliance.")
    lock.release()


def switch_status(apps, name):
    lock.acquire()
    for appliance in apps:
        if appliance.get_name() == name:
            status = appliance.get_status()
            if status == 1:
                appliance.turn_off()
                break
            else:
                appliance.turn_on()
                break
    else:
        print("No such appliance.")
    lock.release()


def main():
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
            create_app(apps, info)
        elif selection == "3":
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
            change_properties(apps, name, info)
        elif selection == "4":
            name = input("Name?")
            switch_status(apps, name)


main()
