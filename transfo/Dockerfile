FROM python:3.7-alpine

RUN pip install pyinotify
COPY main.py /main.py
RUN mkdir /data
ENTRYPOINT [ "python", "/main.py" ]