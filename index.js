const bodyParser = require('body-parser')
const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/quiz.db')
const cors = require('cors');



var app = express();
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(cors());
const jsonParser = express.json()

const port = 4000;

app.listen(`${port}` , () =>{
    console.log("Server is listening on port" + `${port}`);
});


app.get('/question' , (req , res) => {
    db.all(`SELECT * FROM question`, (err, rows) => {
       res.json(rows)
    })
})


app.get('/question/title' , (req , res) => {
    db.all(`SELECT * FROM qtion_answer`, (err, rows) => {
       res.json(rows)
    })
})



app.get('/quiz/:id', (req, res) => {
    const quizId = req.params.id;
    
    db.all(`SELECT * FROM question WHERE category_id = ?`, quizId, (err, row) => {
    if (err) {
    console.log(err);
    res.status(500).send();
    return;
    }
    res.send(row);
    });
    });

    app.get('/quiz/answer/:id', (req, res) => {
        const quizId = req.params.id;
        
        db.all(`SELECT * FROM answer WHERE questions_id = ?`, quizId, (err, row) => {
        if (err) {
        console.log(err);
        res.status(500).send();
        return;
        }
        res.send(row);
        });
        });
    

    app.get('/quiz/:iуеd' , (req , res) => {
        const {id} = req.params

        const request = `SELECT * FROM  answers WHERE ID=${id} ` 
            
            
            console.log(request)
            db.run(request, (result ,err) => {
                if(err) {
                    res.json(err)
                }
                res.json(result)
            })
    })

    app.post('/attributes' , (req , res) => {
        const data = req.body
        const request = `INSERT INTO ATTRIBUTES VALUES (
            null, 
            '${data.name}',
            '${data.email}')`
            
            
            
            
            console.log(request)
            db.run(request, (err , result) => {
                if (err) {
                   return res.json(err)
                } 
                
                    res.json({
                        data
                    })
                
            })
    })

    app.get('/question/title' , (req , res) => {
           res.json(rows)
        })
    

        app.get('/quiz/category/:id', (req, res) => {
            const quizId = req.params.id;
            
            db.all(`SELECT * FROM subject WHERE id = ?`, quizId, (err, row) => {
            if (err) {
            console.log(err);
            res.status(500).send();
            return;
            }
            res.send(row);
            });
            });


            let bd = new sqlite3.Database('./db/users.db', (err) => {
                if (err) {
                  console.error(err.message);
                }
                console.log('Подключено к основной базе данных.');
            });
            
            // анализатор запросов жсон
            app.use(express.json());
            
            // регистр
            app.post('/register', (req, res) => {
              const { username, email, password } = req.body;
              console.log(req.body)
              const sql = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`;
            
              // запрос к бд по регу
            bd.run(sql, (err) => {
                if (err) {
                  console.log(err.message);
                  res.status(500).send('Почта или никнейм уже используются.');
                } else {
                  res.send('Пользователь успешно зарегистрирован.');
                }
              });
            });
            
            // логин
            app.post('/login', (req, res) => {
              const { email, password } = req.body;
              const sql = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
            
              // запрос к бд по логину
              bd.get(sql, (err, row) => {
                if (err) {
                  console.log(err.message);
                  res.status(500).send('Ошибка входа.');
                } else if (row === undefined) {
                  res.status(401).send('Неверная почта или пароль.'); //
                } else {
                  res.send(`Пользователь ${row.username} авторизован.`);
                }
              });
            });
            
 