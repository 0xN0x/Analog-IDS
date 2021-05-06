import re
def main(line):
    return [re.search(r'(?P<ip>[(\d\.)]+) - - \[(?P<date>.*?) (.*?)] "(?P<method>\w+) (?P<request_path>.*?) HTTP\/(?P<http_version>.*?)" (?P<status_code>\d+) (?P<response_size>\d+) "(?P<referrer>.*?)" "(?P<user_agent>.*?)"',line).groupdict()]

if __name__ == '__main__':
    main()
