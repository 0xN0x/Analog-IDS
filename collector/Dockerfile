FROM alpine

RUN apk add --no-cache rsyslog

COPY rsyslog.conf /etc/rsyslog.conf

VOLUME /var/log

WORKDIR /var/log

COPY syslog syslog

EXPOSE 514/tcp \
    514/udp

ENTRYPOINT [ "rsyslogd", "-n" ]
