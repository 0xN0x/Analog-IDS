# AnaLog

## Deployment

- Clone the repository :
```
git clone https://github.com/Nundir/AnaLog.git
```

- Start container
```
docker-compose up -d
```

# Setup rsyslog client

- Install rsyslog
```bash
sudo apt install rsyslog rsyslog-gnutls
```

- Create rsyslog-tls folder
```bash
sudo mkdir /etc/rsyslog-tls
```

- On Analog server, run cert-client script :
```bash
docker exec -it collector cert-client
```

- Edit rsyslog.conf
```bash
sudo vim /etc/rsyslog.conf
```

```bash
# Modules
$ModLoad imuxsock
module(load="imfile")

# Global directives
$ActionFileDefaultTemplate RSYSLOG_TraditionalFileFormat

$DefaultNetstreamDriver gtls

$DefaultNetstreamDriverCAFile /etc/rsyslog-tls/ca.pem
$DefaultNetstreamDriverCertFile /etc/rsyslog-tls/analog-client.crt
$DefaultNetstreamDriverKeyFile /etc/rsyslog-tls/analog-client.pem

$ActionSendStreamDriverAuthMode anon
$ActionSendStreamDriverMode 1

# Rules
input(type="imfile"
    File="/var/log/apache2/access.log"
    Tag="apache"
)

input(type="imfile"
    File="/var/log/nginx/access.log"
    Tag="nginx"
)

*.* @@192.168.1.22:514

```

- Restart syslog service
```
sudo service rsyslog restart
```
