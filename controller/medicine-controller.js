const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,      // must be "mysql"
  user: process.env.DB_USER,      // root
  password: process.env.DB_PASS,  // acpt
  database: process.env.DB_NAME,  // my_db
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const saveMedicine = (req, res) => {
  const { name, description } = req.body;

  pool.query(
    "INSERT INTO medicine (name, description) VALUES (?, ?)",
    [name, description],
    (err, result) => {
      if (err) return res.status(500).json({ message: "DB Error", error: err.message });
      return res.json(result);
    }
  );
};

const getAllMedicines = (req, res) => {
  pool.query("SELECT * FROM medicine", (err, rows) => {
    if (err) return res.status(500).json({ message: "DB Error", error: err.message });
    return res.json(rows);
  });
};

module.exports = { saveMedicine, getAllMedicines };
