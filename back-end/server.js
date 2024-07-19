import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 5000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Travel-Away",
  password: "Rij_Abhi@2004",
  port: 5432,
});

app.use(bodyParser.json());
app.use(cors());

if (db.connect()) console.log(`Database Connection Successfull`);

// db.query(`INSERT INTO capitals (item_id, description, quantity, packed)
// VALUES (1, 'Test Item', 10, false);
// `);

app.post("/api/newentry", (req, res) => {
  const { id, description, quantity, packed } = req.body;
  res.send("item Recieved");
  try {
    db.query(
      `INSERT INTO capitals (item_id, description, quantity, packed) VALUES ($1, $2, $3, $4)`,
      [id, description, quantity, packed]
    );
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`App is running on port : ${port}`);
});
