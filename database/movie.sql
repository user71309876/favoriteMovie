DROP DATABASE IF EXISTS moviedb;

CREATE DATABASE IF NOT EXISTS moviedb 
  DEFAULT CHARACTER SET utf8mb4 
  DEFAULT COLLATE utf8mb4_general_ci;

USE moviedb;

CREATE TABLE movie (
  id INT NOT NULL AUTO_INCREMENT,
  url VARCHAR(255) NOT NULL,
  imgurl VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  rating INT,
  PRIMARY KEY(id),
  UNIQUE INDEX (url)
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8mb4 
  DEFAULT COLLATE utf8mb4_general_ci;

CREATE TABLE director (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  HighRating INT,
  PRIMARY KEY(id),
  UNIQUE INDEX (name)
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8mb4 
  DEFAULT COLLATE utf8mb4_general_ci;
  
CREATE TABLE genre (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY(id),
  UNIQUE INDEX (name)
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8mb4 
  DEFAULT COLLATE utf8mb4_general_ci;

CREATE TABLE listgenre (
  movieid INT NOT NULL,
  genreid INT NOT NULL,
  PRIMARY KEY(movieid, genreid),
  FOREIGN KEY(movieid) REFERENCES movie(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY(genreid) REFERENCES genre(id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  INDEX(genreid)
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8mb4 
  DEFAULT COLLATE utf8mb4_general_ci;
  
CREATE TABLE listdirector (
  movieid INT NOT NULL,
  directorid INT NOT NULL,
  PRIMARY KEY(movieid, directorid),
  FOREIGN KEY(movieid) REFERENCES movie(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY(directorid) REFERENCES director(id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  INDEX(directorid)
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8mb4 
  DEFAULT COLLATE utf8mb4_general_ci;

INSERT INTO movie (url, imgurl, title, rating) VALUES ("https://www.rottentomatoes.com/m/oldboy", 'https://img', "Oldboy", 5);
SELECT * FROM movie;
INSERT IGNORE INTO genre (name) VALUES ("Mystery");
INSERT IGNORE INTO director (name,HighRating) VALUES ("Park Chan-wook",100);
INSERT INTO listdirector VALUES (1, 1);
INSERT INTO listgenre VALUES (1, 1);

# Chap. 06 DML ######################

INSERT INTO song VALUES (null, "소주 한 잔", "임창정", 5, null);
INSERT INTO song VALUES (null, "사건의 지평선", "윤하", 3, null);
INSERT INTO song (title, singer, rating) VALUES ("사랑은 늘 도망가", "임영웅", 3);
INSERT INTO song (title, singer, rating) VALUES
  ("잘가요", "주호", 3),
  ("사랑인가봐", "멜로망스", 3),
  ("다시 만날 수 있을까", "임영웅", 3);
SELECT * FROM song;

# playlist ##########
INSERT INTO playlist VALUES (1, '프로그래밍할 때 듣기 좋은 음악');
INSERT INTO playlist (name) VALUES
  ("드라이빙 음악"),
  ("비오는 날 듣는 음악"),
  ("노래방 연습곡");
SELECT * FROM playlist;

# listsong ##########
SELECT * FROM playlist;
SELECT * FROM song;

# 프로그래밍할 때 듣기 좋은 음악에 소주 한 잔을 추가
INSERT INTO listsong VALUES (1, 1);
# 프로그래밍할 때 듣기 좋은 음악에 사랑은 늘 도망가와 잘가요 추가
INSERT INTO listsong VALUES 
  (1, 3),
  (1, 4);
# 노래방 연습곡에 소주 한 잔을 추가
INSERT INTO listsong VALUES (4, 1);
SELECT * FROM listsong;


# Chap. 07 Select ######################
INSERT INTO song (title, singer, rating) VALUES
  ("우리들의 블루스", "임영웅", 2),
  ("이제 나만 믿어요", "임영웅", 2),
  ("무지개", "임영웅", 2),
  ("아버지", "임영웅", 3),
  ("인생찬가", "임영웅", 3),
  ("내가 아니라도", "주호", 4),
  ("취중고백", "멜로망스", 2),
  ("Dynamite", "방탄소년단", 3),
  ("Butter", "방탄소년단", 3),
  ("가슴으로 운다", "김연지", 3),
  ("That That", "싸이", 2),
  ("새벽에 걸려온 너의 전화는", "한동근", 3),
  ("주저하는 연인들을 위해", "잔나비", 3),
  ("그중에 그대를 만나", "김호중", 3),
  ("멀어져간 사람아", "박상민", 5),
  ("사랑했지만", "김광석", 5),
  ("화장을 고치고", "왁스", 5),
  ("사고쳤어요", "다비치", 4),
  ("희야", "부활", 5),
  ("내가 저지른 사랑", "임창정", 3),
  ("한 장의 추억", "쿨", 4),
  ("세월이 가면", "최호섭", 4),
  ("해야", "마그마", 4),
  ("밤에 피는 장미", "어우러기", 3),
  ("사랑하기 때문에", "유재하", 4),
  ("내 마음에 비친 내 모습", "유재하", 5),
  ("그대와 영원히", "이문세", 5),
  ("가로수 그늘 아래 서면", "이문세", 4),
  ("애인있어요", "이은미", 4);

INSERT INTO listsong VALUES 
  (1, 12),
  (1, 13),
  (1, 14),
  (1, 15),
  (1, 16),
  (1, 17),
  (1, 18),
  (2, 1),
  (2, 21),
  (2, 22),
  (2, 23),
  (2, 24),
  (2, 25),
  (2, 26),
  (2, 27),
  (3, 6),
  (3, 7),
  (3, 8),
  (3, 9),
  (3, 10),
  (3, 11),
  (3, 12),
  (4, 15),
  (4, 16),
  (4, 17),
  (4, 18),
  (4, 19),
  (4, 20);

# Join
SELECT * FROM playlist;
SELECT * FROM listsong;
SELECT * FROM song;

SELECT name, title, singer FROM playlist 
  LEFT JOIN listsong ON playlist.id = listsong.listid
  LEFT JOIN song ON listsong.songid = song.id;