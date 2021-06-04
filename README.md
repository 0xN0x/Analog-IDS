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
sudo apt install rsyslog
```

- Edit rsyslog.conf
```bash
sudo vim /etc/rsyslog.conf
```

You can replace de 192.168.1.22 with the IP that match with the Analog server
```bash
# /etc/rsyslog.conf configuration file for rsyslog
#
# For more information install rsyslog-doc and see
# /usr/share/doc/rsyslog-doc/html/configuration/index.html
*.* @@192.168.1.22:514

module(load="imuxsoxk")
module(load="imfile")

# Basic logs
auth,authpriv.none        /var/log/auth.log
*.*;auth,authpriv.none    /var/log/syslog

# Others
input(type="imfile"
    File="/var/log/apache2/access.log
    Tag="apache"
)

# Global directives
$WorkDirectory /var/spool/rsyslog

```

- Restart syslog service
```
sudo service rsyslog restart
```
