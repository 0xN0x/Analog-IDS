import re
from urllib.parse import unquote

XSS_L = ['%3C','<img','<a href','<body','<script','<b','<h','<marquee','location','cookie','iframe','createelement','string.fromcharcode','\\\\','onload','&#','onerror','href']
SQLI_L = ['%27','--','%3B','exec','union+','union*','system','eval(','group_concat','column_name','order by','insert into','load_file', '@version', 'where', 'and', 'between','count']
PT_L = ['../','%2e%2f','%2e%2e/','.%2f','..%c1%9','..%c0%af','/usr/','/passwd','/grub','boot.ini','/conf/','/etc/','/proc/','/opt/','/sbin/','/dev/','/tmp/','/kern/','/root/','/sys/','/system/','/windows/','/winnt/','/inetpub/','/localstart/','/boot/']
LDAPI_L = ['cn=','objectclass', 'sn=']
CRLFI_L = ['SET', '%0A', '%0D', '+', 'TAMPER', ':', '%0D%0A', 'COOKIE']
OTHER_L = ['wso.php','phpshell.php','shell_uploader.php','mysql.php','r57.php','filesman.php','spam.php','b374k.php','c99.php','phpemailer.php','cmd.php','cmd.asp','noname.php','hiddenshell.php','cmd.pl','s72shell.php','cocacola_shell.php','cih.php','lamashell.php','cshell.php','troyan.php','cyberspy5.asp','cmd.jsp','spam_trustapp.php','arab_black_hat.pl','indishell.php','savefile.php','gnyshell.php','hackerps.php','phpfilemanager.php','joomla_spam.php','elmaliseker.asp','irc_bot.pl','teamsql.php','pbot.php','insomnia.aspx','antisecshell.php','aspydrv.vb','951078biJ.php','nstview.php','unitxshell.pl','phpspy.php','getlinks.php','imhapftp.php','stressbypass.php','darkshell.php','isko.php','worse.php','zaco.php','server_config.php','crystal.php','ahlisyurga_shell.php','batavi4.php','blindshell.c','r3laps3.php','w3dshell.php','albanianshell.php','hostdevil.pl','420532shell.php','php_mailer.php','udpflooder.php','egyspider.php','629788tryag.php','efso2.asp','phantasma.php','jspreverse.jsp','ajan.asp','ipays777.php','safemode.php','mahkeme.php','rootshell.php','clearshell.php','lizozim.php','ironshell.php','al-marhum.php','lolipop.php','phpbackdoor.php','devilzshell.php','ajax_command_shell.php','nshell.php','connectback2.pl','king511.pl','cristercorp_infocollector.php','smtpd.py','dc3shell.php','pzadv.php','O0O.php','aZRaiL.php','stunshell.php','perlbot.pl','harauku.php','metasploit.php','c100.php','backdoor.php','simshell.php','gfs.php','myshell.php','ntdaddy.asp','tdshell.php','dxshell.php','spyshell.php','hacker.php','c2007.php','indexer.asp','webroot.php','FaTaLisTiCz.php','fx0.php','pas.php','gscshell.php','kadotshell.php','htaccess_shell.htaccess','kaushell.php','madspot.php','elmaliseker.vbs','telnet.pl','foreverpp.php','antichat_shell.php','smartshell.asp','webadmin.php','bogel_shell.php','erne.php','moroccan_spam.php','cmos_clr.php','s72shell.php','rhtool.asp','brute_force_tool.php','sec4ever.php','webshell.php','mrtiger.php','empo.php','v0ld3m0r.php','jspwebshell.java','us3rspl.pl','m1n1shell.php','cpanel.php','symlink.php','constance.php','nixshell.php','teamps.php','remoteview.php','simple_shell.php','sempak.php','powerdreamshell.asp','networkfilemanager.php','cgitelnet.pl','snipershell.php','gammashell.pl','variables.asp','nccshell.php','sincap.php','cgi-python.py','cmd.aspx','wordpress_exploit.php','qReyFuRt.aspx','simattacker.php','tryag.php','fatalshell.php','g00nshell.php','wacking.php','mildnet.php','cybershell.php','cbot.php','devil.php','sroshell.php','shell_commander.php','buckethead.php','fuckphpshell.php','cfexec.cfm','ayyildiz_tim.php','includeshell.php','dtool.php','andr3a.php','backup.php','nogrodpBot.php','mulcishell.php','orbshell.php','onboomshell.php','ctt_shell.php','javashell.py','scanner_jatimcrew.pl','rader.asp','nexpl0rer.php','goon.php','fenix.php','itsecteam_shell.php','phytonshell.py','locusshell.php','gohack_powerserver.php','shellbot.pl','shell_exploit.php','akatsuki.php','coderz.php','priv8_scr.pl','hostdevil.php','accept_language.php','shellatildi.php','1n73ction.php','cgi-shell.pl','remoteshell.php','gaulircbot.php','img.php','pwnshell.jsp','diveshell.php','reverse_shell.php','mohajer22.pl','mm.php','phpmyadmin_exploit.php','empixcrew.pl','winx.php','entrika.php','b64shell.php','backdoorconnect.pl','n3fa5t1ca.php','iframe.php','120667kk.php','xinfo.php','blood3rpriv8.php','stakershell.php','klasvayv.asp','phvayv.php','zorro.pl','i47.php','lostdc.php','removexplorer.vb','ekin0x.php','zehir4.asp','obet.php','h4ntu.php','lurm.cgi','asmodeus.pl','shellarchive.php','mysql_adminer.php','loadshell.php','perlwebshell.pl','extplorer.php','zehir4.php','casus15.php','tbdsecurity.php','postman.php','telnetd.pl','devilz0de.php','v0ld3m0rt.php','kral.php','hshell.php','aspx-shell.aspx','update.php','explore.asp','configspy.php','jackal.php']


def main(line):
    line = re.search(r'(?P<ip>[(\d\.)]+) - - \[(?P<date>.*?) (.*?)] "(?P<method>\w+) (?P<request_path>.*?) HTTP\/(?P<http_version>.*?)" (?P<status_code>\d+) (?P<response_size>\d+) "(?P<referrer>.*?)" "(?P<user_agent>.*?)"',line).groupdict()
    line = analyse(line)
    return [line]

def analyse(line):
    if XSS_check(line) is True:
        line['tag'] = 'Cross Site Scripting'
    elif SQLi_check(line) is True:
        line['tag'] = 'SQL Injection'
    elif PT_check(line) is True:
        line['tag'] = 'Path Traversal Attack'
    elif LDAPi_check(line) is True:
        line['tag'] = 'LDAP Injection'
    elif CRLFi_check(line) is True:
        line['tag'] = 'CRLF Injection'
    elif OTHER_check(line) is True:
        line['tag'] = 'Evil request'
    return line

def XSS_check(line):
    line = unquote(line['request_path']) + unquote(line['referrer'])
    line = unquote(line)
    line = line.replace('\n', '')
    line = line.replace(' ', '').lower()
    check = False
    for col in XSS_L:
        if col in line:
            check = True
        else:
            pass
    return check

def SQLi_check(line):
    line = unquote(line['request_path']) + unquote(line['referrer'])
    line = unquote(line)
    line = line.replace('\n', '')
    line = line.replace(' ', '').lower()
    check = False
    for col in SQLI_L:
        if col in line:
            check = True
        else:
            pass
    return check

def PT_check(line):
    line = unquote(line['request_path']) + unquote(line['referrer'])
    line = unquote(line)
    line = line.replace('\n', '')
    line = line.replace(' ', '').lower()
    check = False
    for col in PT_L:
        if col in line:
            check = True
        else:
            pass
    return check

def LDAPi_check(line):
    line = unquote(line['request_path']) + unquote(line['referrer'])
    line = unquote(line)
    line = line.replace('\n', '')
    line = line.replace(' ', '').lower()
    check = False
    for col in LDAPI_L:
        if col in line:
            check = True
        else:
            pass
    return check

def CRLFi_check(line):
    line = unquote(line['request_path']) + unquote(line['referrer'])
    line = unquote(line)
    line = line.replace('\n', '')
    line = line.replace(' ', '').lower()
    check = False
    for col in CRLFI_L:
        if col in line:
            check = True
        else:
            pass
    return check

def OTHER_check(line):
    line = unquote(line['request_path']) + unquote(line['referrer'])
    line = unquote(line)
    line = line.replace('\n', '')
    line = line.replace(' ', '').lower()
    check = False
    for col in OTHER_L:
        if col in line:
            check = True
        else:
            pass
    return check
