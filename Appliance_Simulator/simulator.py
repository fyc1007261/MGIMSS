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
    r = requests.post(url=url, data=payload)
    print(r.text)


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
    app = Appliance(info["name"], info["voltage"], info["current"])
    apps.append(app)
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
        print("Input a number:\n")
        print("1. Show all conditions\n")
        print("2. Add new appliance\n")
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


main()