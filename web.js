const express = require('express');
const mysql = require('mysql');
const app = express();
app.listen(4000);

let PAGE_SIZE = 5; //一页有几条留言

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123',
	database: 'hehe'
});

app.get('/', (req, res) => {
	res.write('welcome Index');
	res.end();
});

//添加留言
app.get('/addMsg', (req, res) => {
	let name = req.query.name;
	let age = req.query.age;

	//判断
	if (name && age) {
		let sql = `INSERT INTO users VALUES(0,'${name}',${age})`;
		db.query(sql, (err, data) => {
			console.log(data);
			if (err) {
				res.send({
					err: 1,
					msg: "数据库方面有问题"
				});
				res.end();
			} else {
				res.send({
					err: 0,
					msg: '添加留言成功',
					ID: data.insertId
				});
				res.end();
			}
		})
	}
});
//获取某一页留言
app.get('/getPageData', (req, res) => {
	let n = req.query.page; //当前第几页
	let sql = `SELECT * FROM users ORDER BY ID DESC LIMIT ${(n-1)*PAGE_SIZE},${PAGE_SIZE}`;
	db.query(sql, (err, data) => {
		if (err) {
			res.send({
				err: 1,
				msg: "数据库方面有问题"
			});
			res.end();
		} else {
			res.send(data);
			res.end();
		}
	})
});
//获取页码
app.get('/getPageCount', (req, res) => {
	let sql = `SELECT count(*) AS count FROM users`;

	db.query(sql, (err, data) => {
		if (err) {
			res.send({
				err: 1,
				msg: "数据库方面有问题"
			});
			res.end();
		} else {
			let n = Math.ceil(data[0].count / PAGE_SIZE);
			res.send({
				err: 0,
				count: n
			});
			res.end();
		}
	})
});
//删除数据
app.get('/delMsg', (req, res) => {
	let ID = req.query.id;

	let sql = `DELETE FROM users WHERE ID=${ID}`;

	db.query(sql, (err, data) => {
		if (err) {
			res.send({
				err: 1,
				msg: "数据库方面有问题"
			});
			res.end();
		} else {
			res.send({
				err: 0,
				msg: '删除留言成功'
			});
			res.end();
		}
	})
});

app.use(express.static('web'));