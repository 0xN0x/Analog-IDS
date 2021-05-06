import time
from analog import *

def main():
    db = Database()
    db.init()
    f = open("/data/syslog", "r")
    read_line(f, db)

def read_line(f, db):
    while True:
        line = ''
        while len(line) == 0 or line[-1] != '\n':
            tail = f.readline()
            if tail == '':
                time.sleep(0.1)
                continue
            line += tail
            db.sendLog(Log(line).result())

if __name__ == '__main__':
    main()
