import requests

r = requests.get("http://localhost:12333/appliance/open_close_appliance?aid=0&option=off")
print(r.text)
print(r.headers)