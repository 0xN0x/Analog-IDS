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
            r.db('analog').table_create('users').run()
        if 'test' in r.db_list().run():
            r.db_drop('test').run()
    def sendLog(self, log):
        if log is not None:
            r = self.r
            r.db('analog').table('log').insert(log).run()
        else:
            pass

class Log:
    def __init__(self, line):
        self.line = line
        try:
            self.date, self.host, self.app, self.line = self.logParser()
        except:
            pass

    def logParser(self):
        line = self.line.split(' ')
        date, host = line[0], line[1]
        try:
            app = re.search(r'^(\w+)', line[2]).group().lower()
            line = ' '.join(line[3:])
            app_module = __import__("modules.%s" % app, fromlist=["modules"])
            line = app_module.main(line)
            print(line)
            return date, host, app, line
        except:
            pass
    
    def result(self):
        try:
            return {"date": self.date, "host": self.host, "app": self.app, "data": self.line}
        except:
            pass