while true
do
	scp -oKexAlgorithms=+diffie-hellman-group1-sha1 root@192.168.1.1:/tmp/wiviz2-dump /d/Senior\ Project/Router\ SNMP\ Monitor/snmp-monitor/asset/wiviz/
	sleep 10
done
