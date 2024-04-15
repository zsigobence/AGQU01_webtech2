
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 3001;
const { EquipmentCollection, UserCollection } = require("./db");
app.use(cors());
app.use(bodyParser.json());


app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    
    const user = await UserCollection.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Hibás felhasználónév vagy jelszó' });
    }

    if (user.password != password) {
      return res.status(401).json({ success: false, message: 'Hibás felhasználónév vagy jelszó' });
    }

    res.json({ success: true, message: 'Sikeres bejelentkezés' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Valami hiba történt a szerver oldalán' });
  }
});



app.post('/register', async (req, res) => {
  
  try {
    const { username, password, password2 } = req.body;

    if (password !== password2) {
      return res.status(400).json({ message: 'A megadott jelszavak nem egyeznek!' });
    }

    const user = await UserCollection.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'A felhasználónév már foglalt!' });
    }

    const newUser = new UserCollection({ username, password });
    await newUser.save();
    res.status(201).json({ message: 'Sikeres regisztráció!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Valami hiba történt a szerver oldalán.' });
  }
});



app.post('/equipments', (req, res) => {
  const data = {
    name: req.body.name,
    equipment: req.body.equipment,
    quantity: req.body.quantity
  }
  EquipmentCollection.insertMany([data])
    .then(() => {
      res.json({ success: true, message: 'Sikeres adatok beszúrása' });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: 'Hiba az adatok beszúrása során', error: err });
    });
});

app.get('/equipments', (req, res) => {
  EquipmentCollection.find({})
    .then((data) => {
      res.json({ success: true, data: data });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: 'Hiba a lekérdezés során', error: err });
    });
});


app.post('/delete', async (req, res) => {
  const { userid } = req.body;
  try {
    const result = await EquipmentCollection.deleteOne({ _id: userid });
    if (result.deletedCount === 1) {
      res.json({ success: true, message: 'Termék sikeresen törölve.' });
    } else {
      res.status(404).json({ success: false, message: 'A termék nem található.' });}
  } catch (error) {
    console.error('Hiba történt a törlés során:', error);
    res.status(500).json({ error: 'Hiba történt a törlés során.' });
  }
});

app.listen(port, () => {
  console.log(`A szerver fut a http://localhost:${port} címen`);
});


