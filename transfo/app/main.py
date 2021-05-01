#!/usr/bin/env python
import time, re
from rethinkdb import RethinkDB

"""
DB Operations
"""
r = RethinkDB()
r.connect('db', 28015).repl()

def dbInit():
    if 'analog' not in r.db_list().run():
        r.db_create('analog').run()
        r.db('analog').table_create('log').run()

def dbSend(res):
    log = r.db('analog').table('log')
    log.insert(res).run()

"""
Modules
"""
def apache(timestamp, host, app, line):
    regex = re.compile(r'(?P<ip>[(\d\.)]+) - - \[(?P<date>.*?) (.*?)] "(?P<method>\w+) (?P<request_path>.*?) HTTP\/(?P<http_version>.*?)" (?P<status_code>\d+) (?P<response_size>\d+) "(?P<referrer>.*?)" "(?P<user_agent>.*?)"')
    log = re.search(regex, line)
    res = {
        "timestamp": timestamp,
        "application": app,
        "data": [log.groupdict()]
    }
    return res

"""
Main
"""
def load_file():
    return open("/data/syslog", "r")

def read_line(f):
    while True:
        line = ''
        while len(line) == 0 or line[-1] != '\n':
            tail = f.readline()
            if tail == '':
                time.sleep(0.1)
                continue
            line += tail
        parser(line)

def parser(line):
    line = line.split(' ')
    timestamp = line[0]
    host = line[1]
    app = line[2]
    line = ' '.join(line[3:])
    parseRedirect(timestamp, host, app, line)
    if app == "apache-access":
        res = apache(timestamp, host, app, line)
        dbSend(res)
    else:
        res = {
            "timestamp": timestamp,
            "application": app,
            "data": [line]
        }
        dbSend(res)

def parseRedirect(timestamp, host, app, line):
    regex = re.compile(r"^(?P<app>\w+)")
    parsedApp = re.search(regex,app)
    app = parsedApp.group()
    if app == "apache":
        res = apache(timestamp, host, app, line)
    else:
        res = {
            "timestamp": timestamp,
            "application": app,
            "data": [line]
        }
    dbSend(res)
    
def main():
    dbInit()
    f = load_file()
    read_line(f)

if __name__ == "__main__":
    main()