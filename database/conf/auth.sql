# 권한 설정
grant all privileges on  *.* to 'root'@'%' identified by '1105';
delete from mysql.user where host="localhost" and user="root";

# root와 manager 패스워드 다르게 설정할 것
CREATE USER 'manager'@'%' identified by '1205';
grant all privileges on  moviedb.* to 'manager'@'%';

flush privileges;
select host,user,plugin,authentication_string from mysql.user;