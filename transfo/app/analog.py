import re
from rethinkdb import RethinkDB

class Database:
    def __init__(self):
        r = RethinkDB()
        r.connect('db', 28015).repl()
        self.r = r

    def init(self):
        r = self.r
        if 'analog' not in r.db_list().run():
            r.db_create('analog').run()
            r.db('analog').table_create('log').run()
        if 'test' in r.db_list().run():
            r.db_drop('test').run()

    def sendLog(self, log):
        r = self.r
        r.db('analog').table('log').inser(log).run()

class Log:
    def __init__(self, line):
        self.line = line
        self.date, self.host, self.app, self.line, self.parsed = self.logParser()

    def logParser(self):
        line = self.line.split(' ')
        date, host = line[0], line[1]
        app = re.search(r'^(\w+)', line[2]).group().lower()
        line = ' '.join(line[3:])
        try:
            app_module = __import__("modules.%s" % app, fromlist=["modules"])
            print(app_module)
            line = app_module.main(line)
            return date, host, app, line, True
        except:
            return date, host, app, [line], False
    
    def result(self):
        return {"date": self.date, "host": self.host, "app": self.app, "data": self.line, "parsed": self.parsed}


