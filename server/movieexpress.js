import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import getHtml from './movieinfo.js';

import dbconf from './conf/auth.js';

const app = express();
const port = 3010;

// const db = mysql.createConnection(dbconf);
var db;

function handleDisconnect() {
	db= mysql.createConnection(dbconf);
	db.connect(function (err) {
		if (err) {
			console.log('error when connecting to db:', err);
			setTimeout(handleDisconnect, 2000);
		}
	});

	db.on('error', function (err) {
		console.log('db error', err);
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
			return handleDisconnect();
		} else {
			throw err;
		}
	});
}

handleDisconnect();

// db.connect();

app.use(cors());
app.use(bodyParser.json());

app.get('/inject/:url', (req, res) => {
	async function got(url) {
		console.log('Connecting https://www.rottentomatoes.com/m/' + url + '...');
		const info = await getHtml(url);
		if (info == -1) {
			res.json({
				status: 415,
				message: 'Error: Data is wrong',
			});
			return;
		}
		const sqlmovie = 'insert ignore into movie (url, imgurl, title, rating) values (?)';
		const sqldirector = 'insert ignore into director (name,HighScore) values (?)';
		const movie = [info.url, info.imgUrl, info.title, info.fleshRating];
		const director = [info.director, info.dHighRating];
		db.query(sqlmovie, [movie], (err, rows) => {
			if (err) throw err;
			db.query(sqldirector, [director], (err, rows) => {
				if (err) throw err;
				const movieIdSql = 'select id from movie where url = ?';
				var movieid;
				db.query(movieIdSql, [info.url], (err, rows) => {
					if (err) throw err;
					var movieid = rows[0].id;
					const directorIdSql = 'select id from director where name = ?';
					var directorid;
					db.query(directorIdSql, [info.director], (err, rows) => {
						if (err) throw err;
						directorid = rows[0].id;
						const director = [movieid, directorid];
						const listDirectorSql = 'insert ignore into listdirector values (?)';
						db.query(listDirectorSql, [director], (err, rows) => {
							if (err) throw err;
							res.json({
								status: 200,
								message: 'Success: Add new data',
							});
						});
					});
				});
			});
		});
	}
	got(req.params.url);
});

app.get('/', (req, res) => {
	res.json({ result: 'success' });
});

app.get('/del/:url', (req, res) => {
	const sql = 'delete from movie where url=?';
	const sql1 = 'delete from director where id not in (select directorid from listdirector);';
	db.query(sql, [req.params.url], (err, rows) => {
		if (err) throw err;
		db.query(sql1, (err, rows) => {
			if (err) throw err;
			res.json({
				status: 200,
				message: 'Success: Add new data',
			});
		});
	});
});

app.get('/movie', (req, res) => {
	const sql ='SELECT imgurl,url, title, name,HighScore,rating FROM director\
  LEFT JOIN listdirector ON director.id = listdirector.directorid\
  LEFT JOIN movie ON listdirector.movieid = movie.id where title is not null\
  order by title';

	db.query(sql, (err, rows) => {
		if (err) {
			res.json({ result: 'error' });
			return console.log(err);
		}
		res.json(rows);
	});
});

app.get('/director', (req, res) => {
	const sql = 'SELECT name FROM director order by name';

	db.query(sql, (err, rows) => {
		if (err) {
			res.json({ result: 'error' });
			return console.log(err);
		}
		res.json(rows);
	});
});

app.get('/director/:name', (req, res) => {
	// const sql = 'SELECT name FROM director where name=? order by name';
		const sql ='SELECT imgurl,url, title, name,HighScore,rating FROM director\
  LEFT JOIN listdirector ON director.id = listdirector.directorid\
  LEFT JOIN movie ON listdirector.movieid = movie.id where title is not null\
  where name=? order by title';

	db.query(sql, [req.params.name], (err, rows) => {
		if (err) {
			res.json({ result: 'error' });
			return console.log(err);
		}
		res.json(rows);
	});
});

app.listen(port, () => {
	console.log(`서버 실행됨 (port ${port})`);
});