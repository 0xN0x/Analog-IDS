# AnaLog

## Deployment

- Clone the repository :
```
git clone https://github.com/Nundir/AnaLog.git
```
- Initialize the configuration files and certificates:
```
docker-compose run --rm openvpn ovpn_genconfig -u udp://VPN.SERVERNAME.COM
docker-compose run --rm openvpn ovpn_initpki
```

- Fix ownership (depending on how to handle your backups, this may not be needed)
```
sudo chown -R $(whoami): ./openvpn-data
```

- Start container
```
docker-compose up -d
```

- Generate a client certificate
```
export CLIENTNAME="your_client_name"
docker-compose run --rm openvpn easyrsa build-client-full $CLIENTNAME
```

- Retrieve the client configuration with embedded certificates
```
docker-compose run --rm openvpn ovpn_getclient $CLIENTNAME > $CLIENTNAME.ovpn
```

- Revoke a client certificate
```
docker-compose run --rm openvpn ovpn_revokeclient $CLIENTNAME remove
```
