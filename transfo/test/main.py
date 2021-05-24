import time
from analog import *

def main():
    f = open("dataset", "r")
    read_line(f)

def read_line(f):
    while True:
        line = ''
        while len(line) == 0 or line[-1] != '\n':
            tail = f.readline()
            if tail == '':
                time.sleep(0.1)
                continue
            line += tail
            print(Log(line).result())

if __name__ == '__main__':
    main()
