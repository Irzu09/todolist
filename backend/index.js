import express from "express";
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "money_match_db"
});

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    const sqlGet = "SELECT * FROM todolist;"
    db.query(sqlGet, (err, result) => {
        if (err) res.send(err.toString());
        else res.send(result);
    });
});

app.post("/", (req, res) => {
    const subject = req.body.newSubject;

    const sqlInsert = `INSERT INTO todolist (subject) VALUES ("${subject}");`
    const sqlGet = "SELECT * FROM todolist;"

    db.query(sqlInsert, (err, result) => {
        if (err) res.send(err.toString());
        else {
            db.query(sqlGet, (error, resultGet) => {
                if (error) res.send(error.toString());
                else res.send(resultGet);
            })
        }
    });
});

app.put("/", (req, res) => {
    const id = req.body.id;
    const subject = req.body.subject;

    const sqlUpdate = `UPDATE todolist SET subject="${subject}" WHERE id=${id}`;
    const sqlGet = "SELECT * FROM todolist;"

    db.query(sqlUpdate, (err, result) => {
        if (err) res.send(err.toString());
        else {
            db.query(sqlGet, (error, resultGet) => {
                if (error) res.send(error.toString());
                else res.send(resultGet);
            })
        }
    });
});

app.delete("/", (req, res) => {
    const id = req.body.id;
    const sqldelete = `DELETE FROM todolist WHERE id IN ${id}`;
    const sqlGet = "SELECT * FROM todolist;"

    db.query(sqldelete, (err, result) => {
        if (err) res.send(err.toString());
        else {
            db.query(sqlGet, (error, resultGet) => {
                if (error) res.send(error.toString());
                else res.send(resultGet);
            })
        }
    });
});

app.delete("/deleteAll", (req, res) => {
    const sqldelete = `TRUNCATE TABLE todolist;`;
    const sqlGet = "SELECT * FROM todolist;"

    db.query(sqldelete, (err, result) => {
        if (err) res.send(err.toString());
        else {
            db.query(sqlGet, (error, resultGet) => {
                if (error) res.send(error.toString());
                else res.send(resultGet);
            })
        }
    });
});

app.listen(3008, () => {
    console.log("running port on 3008");
})