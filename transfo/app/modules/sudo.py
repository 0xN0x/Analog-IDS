import re
def main(line):
    data = []
    tag = []
    if "user NOT in sudoers" in line:
        data.append(parse_not_sudoers(line))
        tag.append('Sudo privileges failure')
    else:
        data.append(parse_basic(line))
    return data, tag

def parse_basic(line):
    return re.search(r'^\s+(?P<user>\w+)\s?:.*TTY=(?P<tty>\w+\/\d).*.*COMMAND=(?P<command>.*)', line).groupdict()

def parse_not_sudoers(line):
    data = re.search(r'^\s+(?P<user>\w+)\s?: user NOT in sudoers ; .*TTY=(?P<tty>\w+\/\d).*.*COMMAND=(?P<command>.*)', line).groupdict()
    data["info"] = "user NOT in sudoers"
    return data

