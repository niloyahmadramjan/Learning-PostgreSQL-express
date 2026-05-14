import express, {
  type Application,
  type Response,
  type Request,
} from "express";
const app: Application = express();

import { Pool } from "pg";
import config from "./config";
const port = config.port || 5000;
app.use(express.json());

const pool = new Pool({
  connectionString: config.dburl,
});

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(50),
      email VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(50) NOT NULL,
       age INT,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      
      )
      `);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};
initDB();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "This is express server",
    author: "Next Level",
  });
});
app.post("/api/users", async (req: Request, res: Response) => {
  try {
    const { name, email, password, age } = req.body;
    const result = await pool.query(
      `
    INSERT INTO users( name, email, password, age) VALUES($1,$2,$3,$4) RETURNING *
  `,
      [name, email, password, age],
    );
    res.status(201).json({
      status: "successfull",
      message: "User created!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      errro: error,
    });
  }
});
app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const user = await pool.query(`
      SELECT * FROM Users
      `);
    res.status(200).json({
      status: true,
      messasge: "user data retrived successfully",
      data: user.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      error,
    });
  }
});
app.get("/api/users/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await pool.query(
      `
     SELECT * FROM users WHERE id=$1 
     `,
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        status: false,
        message: "user not found",
        data: result.rows,
      });
    }
    res.status(200).json({
      status: true,
      message: "user found",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      error,
    });
  }
});
app.put("/api/users/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, age, is_active, email, password } = req.body;
  try {
    const result = await pool.query(
      `
     UPDATE users SET
      name = COALESCE($1, name),
      age=COALESCE($2, age),
      email = COALESCE($3, email) ,
      password= COALESCE($4,password),
      is_active = COALESCE($5, is_active )

     WHERE id=$6 RETURNING *
     `,
      [name, age, email, password, is_active, id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        status: false,
        message: "user not found",
        data: result.rows,
      });
    }
    console.log(result);
    res.status(200).json({
      status: true,
      message: "user updated",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      error,
    });
  }
});

app.delete("/api/users/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await pool.query(
      `
     DELETE FROM users 
     WHERE id=$1 RETURNING *
     `,
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        status: false,
        message: "user not found",
        data: result.rows,
      });
    }
    console.log(result);
    res.status(200).json({
      status: true,
      message: "user deleted",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      error,
    });
  }
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
