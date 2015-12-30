 subl ~/.bash_history
 # be rake db:drop && be rake db:create && be rake db:migrate && be rake db:seed # !reset database

 xclip -sel clip < ~/.ssh/id_rsa.pub # !copy ssh

 # scp dom98@dom98.ru:/home/dom98/temp_dump.sql /home/victor/Загрузки/dom98/ # !secure copy files via ssh

 ssh victor@192.168.10.78 # !Hyperion ssh
 ssh rails@85.25.204.175 # !credit ssh
 ssh rails@209.239.124.48 # !coffeelab server
 ssh dom98@dom98.ru # !dom98 server
 ssh hackday@85.25.209.110 -p 21212 # !hackday server
 ssh optihouse@opti.house -p 21212 # !optihouse server
 ssh boats@boats.mkechinov.ru -p 21212 # !boats staging server
 ssh rails@188.166.124.47  # !ssh rentalyachts production server
 ssh root@188.166.124.47  # !ssh root rentalyachts production server

 git update-index --assume-unchanged path/to/file # git update-index --no-assume-unchanged path/to/file
 git refresh # !refresh

 for i in folder2/*.jpg; do convert -strip -interlace Plane -quality 80 $i $i; done # !optimize files in folder2
 identify -verbose croatia.jpg | grep Interlace # !check if file is optimized

 # pg_dump optihouse_dev > optihous_dev.dump # !dump database
 # psql dom98_development < /home/victor/Загрузки/dom98/dom98_dump.sql # !restore dump to db

 # cap production deploy && sleep 10 && cap production deploy:stop && sleep 2 && cap production deploy:start # !deploy
 # cap production deploy:stop deploy:start # !deploy:restart
 # cap production deploy:stop

 /home/victor/BlackBerry/BBTools/bin/blackberry-signer -gui # !BlackBerry signing GUI
 /home/victor/BlackBerry/BBTools/bin/blackberry-apkpackager -gui & # !BlackBerry repack .apk to .bar

 # lame -h -b 192 d1.wav d1.mp3 # !convert wav to mp3

 docker pull victorpolko/sinatra
 docker run -it victorpolko/sinatra:v2 /bin/bash
 docker build -t victorpolko/sinatra:v4 .

 # coffee -c 13-HTTP-JSON-API-server/*.coffee && learnyounode verify 13-HTTP-JSON-API-server/http-json-api-server.js

 cap production deploy
 cap staging deploy

 git st
ber s
