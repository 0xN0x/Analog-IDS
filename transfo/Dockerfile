FROM ubuntu:18.04

RUN apt-get update -y && \
    apt-get install -y python-pip python-dev

RUN mkdir -p {app,data}

COPY ./app /app

RUN pip install -r app/requirements.txt``

ENTRYPOINT [ "python" ]

CMD [ "/app/main.py" ]