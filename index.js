const express = require('express')
const app = express()
const port = 3000
const connection = require('./conf')
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
    res.send('Bienvenue sur cars')
})
app.get('/api/cars', (req, res) => {
    connection.query('SELECT * from cars', (err, results) => {
       if (err) {
       res.status(500).send('Erreur lors de la récupération des cars')
       } else {
           res.json(results)
        }
    })
})
app.get('/api/cars/marque', (req, res) => {
    connection.query('SELECT marque from cars', (err, results) => {
       if (err) {
       res.status(500).send('Erreur lors de la récupération des marques des cars')
       } else {
           res.json(results)
        }
    })
})
app.get('/api/cars/marque/fiat', (req, res) => {
    connection.query('SELECT * from cars WHERE marque LIKE "fiat"', (err, results) => {
       if (err) {
       res.status(500).send('Erreur lors de la récupération de la marque fiat')
       } else {
           res.json(results)
        }
    })
})
app.get('/api/cars/marque/r', (req, res) => {
    connection.query('SELECT * from cars WHERE marque LIKE "r%"', (err, results) => {
       if (err) {
       res.status(500).send('Erreur lors de la récupération de la marque commençant par r')
       } else {
           res.json(results)
        }
    })
})
app.get('/api/cars/dates', (req, res) => {
    connection.query('SELECT * from cars WHERE date_construction > "2018-03-21"', (err, results) => {
       if (err) {
       res.status(500).send('Erreur lors de la récupération de la date')
       } else {
           res.json(results)
        }
    })
})
 app.get('/api/cars/id/:ordre', (req, res) => {
     const ordre = req.params.ordre;
     connection.query(`SELECT * FROM cars WHERE id ORDER BY id ${ordre}`, (err, results) => {
         if (err) {
             res.status(500).send('Erreur lors de la récupération des marques des marques')
             } else {
               res.json(results);
       }
   });
});
app.post('/api/car', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO cars SET ?', formData, (err, results) => {
    if (err) {
        res.status(500).send("Erreur lors de la sauvegarde d'une car");
        } else {
          res.sendStatus(200);
          }
    });
});
app.put('/api/cars/:id', (req, res) => {
   const idCars = req.params.id;
   const formData = req.body;
       connection.query('UPDATE cars SET ? WHERE id = ?', [formData, idCars], err => {
         if (err) {
            res.status(500).send("Erreur lors de la modification d'une car");
            } else {
               res.sendStatus(200);
        }
    });
});
app.put('/api/cars/etat/:id', (req, res) => {
    const etatCars = req.params.id;
        connection.query('UPDATE cars SET etat = !etat WHERE id = ?', [etatCars], err => {
          if (err) {
             res.status(500).send("Erreur lors de la modification du boolean");
             } else {
                res.sendStatus(200);
         }
     });
 });
 app.delete('/api/cars/:id', (req, res) => {
    const idCar = req.params.id;
    connection.query('DELETE FROM cars WHERE id = ?', [idCar], err => {
      if (err) {
        res.status(500).send("Erreur lors de la suppression d une car");
      } else {
        res.sendStatus(200);
      }
    });
  });
  app.delete('/api/car/etat', (req, res) => {
    connection.query('DELETE FROM cars WHERE etat = "0"', err => {
      if (err) {
        res.status(500).send("Erreur lors de la suppression d une car");
      } else {
        res.sendStatus(200);
      }
    });
  });

app.listen(port, (err) => {
    console.log(`server is listening on ${port}`)
})