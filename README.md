# AnaLog

## Manuel d'installation

### Côté serveur

> :warning: Il est requis que **docker** et **docker-compose** soit installés sur le serveur ainsi que les ports 514 et 80/443 ne soit pas utilisés par d'autres services.

- Cloner le répertoire GitHub suivant :
    ```bash
    git clone https://github.com/Nundir/AnaLog.git && cd Analog
    ```
- Construire et démarrer le serveur AnaLog :
    ```bash
    docker-compose up -d --build
    ```
### Côté client
- Installation des paquets requis
    ```bash
    sudo apt install rsyslog rsyslog-gnutls rsync
    ```
    > :information_source: `rsyslog` : envoi des logs de la machine cliente vers le serveur Analog.
    > 
    > :information_source: `rsyslog-gnutls` : permet de chiffrer les logs envoyés par la machine cliente.
    >
    > :information_source: `rsync` : outil utilisé pour le transfert de certificat de l'autorité de certification vers le client.

- Création du dossier **rsyslog-tls** qui va accueillir les certificats pour chiffrer les logs envoyés
    ```bash
    sudo mkdir /etc/rsyslog-tls
    sudo chown -R $USER:$USER /etc/rsyslog-tls
    ```
- Depuis le serveur Analog, créez les certificat du client à l'aide de la commande suivante :
    ```bash
    docker exec -it collector cert-client
    ```
    > :warning: Assurez-vous d'avoir le droit d'écriture pour envoyer les certificats depuis le serveur à l'aide de la commande `rsync`.
- Sur le client : édition du fichier `/etc/rsyslog.conf` :
    ```bash
    # Les modules utilisés pour le client AnaLog
    $ModLoad imuxsock
    module(load="imfile")

    # Indique que les flux vont être chiffrés en TLS par défault 
    $DefaultNetstreamDriver gtls

    # Le triplé de lignes suivant sert  à localiser :
    # 1 - le certificat racine ca.pem
    # 2 - le certificat de la machine <common-name>.crt
    # 3 - sa clé privée <common-name>.pem
    $DefaultNetstreamDriverCAFile /etc/rsyslog-tls/ca.pem
    $DefaultNetstreamDriverCertFile /etc/rsyslog-tls/<common-name>.crt
    $DefaultNetstreamDriverKeyFile /etc/rsyslog-tls/<common-name>.pem

    # Toutes les machines qui ont un certificat signé par la CA peut envoyer des logs au serveur
    $ActionSendStreamDriverAuthMode anon
    # Force le mode TLS
    $ActionSendStreamDriverMode 1

    ##########
    # Exemple pour la lecture de fichier de journal comme Apache :
    input(type="imfile"
                File="/var/log/apache2/access.log"
                Tag="apache"
    )
    ##########

    *.* @@<ip_analog_server>:514
    ```
- Redémarrer le service `rsyslog` :
    ```bash
    sudo systemctl restart rsyslog
    ```
> :warning: **CHANGEZ VOTRE MOT DE PASSE ET VOTRE ADRESSE EMAIL DÈS VOTRE PREMIÈRE CONNEXION SUR ANALOG**
