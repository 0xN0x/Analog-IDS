import re
def main(line):
    data = []
    if "Invalid user" in line:
        data.append(parse_invalid_user(line))
    elif "Accepted password for" in line:
        data.append(parse_accepted_password(line))
    elif "Failed password for" in line:
        data.append(parse_failed_password(line))
    elif "session opened" in line:
        data.append(parse_session_opened(line))
    elif "session closed" in line:
        data.append(parse_session_closed(line))
    elif "Received disconnect" in line:
        data.append(parse_received_disconnected(line))
    elif "Disconnected from" in line:
        data.append(parse_disconnected_from(line))
    elif "authentication failure" in line:
        data.append(parse_authentication_failure(line))
    elif "Connection closed" in line:
        data.append(parse_connection_closed(line))
    else:
        data.append(line)
    return data

def parse_invalid_user(line):
    line = line.split('Invalid user ')
    data = line[1].strip("\n")
    data = data.split(" ")
    return {"user": data[0], "ip": data[2], "port": data[4], "msg": "invalid user"}

def parse_accepted_password(line):
    line = line.split('Accepted password for ')
    data = line[1].strip("\n").split(" ")
    return {"user": data[0], "ip": data[2], "port": data[4], "msg": "accepted password"}

def parse_failed_password(line):
    line = line.split("Failed password for")
    data = line[1].strip("\n")
    if data.find(" invalid user ") == 0:
        data = data[14:]
        data = data.split(" ")
        return {"user": data[0], "ip": data[2], "port": data[4], "msg": "failed password"}
    else:
        data = data.strip(" ").split(" ")
        return {"user": data[0], "ip": data[2], "port": data[4], "msg": "failed password"}

def parse_session_opened(line):
    line = line.split("session opened for user ")
    data = line[1].split(" ")
    return {"user": data[0], "msg": "session opened"}

def parse_session_closed(line):
    line = line.split("session closed for user ")
    data = line[1].split(" ")
    return {"user": data[0], "msg": "session closed"}

def parse_received_disconnected(line):
    line = line.split("Received disconnect from ")
    data = line[1].strip("\n")
    data = data.split(":11: ")
    action = data[1]
    data = data[0].split(" ")
    return {"ip": data[0], "port": data[2], "action": action, "msg": "received disconnected"}

def parse_disconnected_from(line):
    line = line.split("Disconnected from user ")
    data = line[1].strip("\n").split(" ")
    return {"user": data[0], "ip": data[1], "port": data[3], "msg": "Disconnected"}

def parse_authentication_failure(line):
    line = line.split("authentication failure")
    data = line[1].strip("\n").split(" ")
    try:
        return {"ruser": data[5].split("=")[1], "ip": data[6].split("=")[1], "user": data[8].split("=")[1], "msg": "Authentication failure"}
    except:
        return {"ruser": data[5].split("=")[1], "ip": data[6].split("=")[1], "msg": "Authentication failure"}

def parse_connection_closed(line):
    line = line.split("Connection closed by ")
    data = line[1].strip("\n")
    data = re.search(r'^(?P<action>\w+ \w+) (?P<user>\w+) (?P<ip>[(\d\.)]+) port (?P<port>\d+)', data).groupdict()
    data["msg"] = "Connection closed"
    return data


