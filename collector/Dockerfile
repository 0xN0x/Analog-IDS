FROM ubuntu:20.04

RUN apt-get update -y && \
    apt install -y rsyslog rsyslog-gnutls gnutls-bin rsync openssh-client

COPY rsyslog.conf /etc/rsyslog.conf

VOLUME [ "/var/log" ]

ADD templates /templates

WORKDIR /opt/CA

# CA
RUN certtool --generate-privkey --outfile ca-key.pem --sec-param High && \
    certtool --generate-self-signed --load-privkey ca-key.pem --outfile ca.pem --template=/templates/ca.template && \
    certtool --generate-privkey --outfile analog-server.pem --sec-param High && \
    certtool --generate-request --load-privkey analog-server.pem --outfile analog-server.csr --template=/templates/analog-server.template && \
    certtool --generate-certificate --load-request analog-server.csr --outfile analog-server.crt --load-ca-certificate ca.pem --load-ca-privkey ca-key.pem --template=/templates/ca-analog-server.template && \
    mkdir /etc/rsyslog-tls/ && \
    mv analog-server.* /etc/rsyslog-tls/

WORKDIR /var/log

COPY syslog syslog

COPY cert-client /bin/cert-client

EXPOSE 514/tcp

CMD [ "rsyslogd", "-n" ]