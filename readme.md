# Express + TypeScript + PostgreSQL (NeonDB) Setup Guide

## 📌 Project Initialization

এই commands গুলো run করলে একটি basic `Express + TypeScript` project setup হয়ে যাবে।

```bash
npm init --y
npx tsc --init

# Express install
npm i express

# Type definitions
npm i --save-dev @types/express

# TypeScript runtime
npm i --save-dev typescript tsx

# PostgreSQL package
npm i pg

# Environment variables
npm i dotenv
```

---

# 📁 Recommended Project Structure

```bash
project-name/
│
├── src/
│   ├── server.ts
│   ├── db/
│   │   └── db.ts
│   ├── routes/
│   │   └── student.route.ts
│   ├── controllers/
│   │   └── student.controller.ts
│   └── types/
│       └── student.type.ts
│
├── package.json
├── tsconfig.json
├── .env
└── README.md
```

---

# ⚙️ TypeScript Configuration

## `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  }
}
```

---

# 🚀 Express Server Setup

## `src/server.ts`

```ts
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server Running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

# ▶️ Run Server

## `package.json`

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

Run development server:

```bash
npm run dev
```

---

# 🛢️ PostgreSQL (NeonDB Cloud Database)

## 📌 NeonDB কি?

Neon হলো একটি cloud-based PostgreSQL database provider।

Features:

* Serverless PostgreSQL
* Cloud hosted
* Fast scaling
* Free tier available
* Branching support
* Secure connection

Official Website:

[NeonDB Official Website](https://neon.tech?utm_source=chatgpt.com)

---

# 🔗 Connect PostgreSQL Database

## `src/db/db.ts`

```ts
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});
```

---

# 🔐 `.env`

```env
DATABASE_URL=postgresql://username:password@host/database
PORT=5000
```

---

# 📦 PostgreSQL Data Types

PostgreSQL এ বিভিন্ন ধরনের data type থাকে।

---

# 🔢 Numeric Data Types

| Data Type        | Description            |
| ---------------- | ---------------------- |
| SMALLINT         | Small integer          |
| INTEGER          | Normal integer         |
| BIGINT           | Large integer          |
| SERIAL           | Auto increment integer |
| DECIMAL          | Fixed precision number |
| NUMERIC          | Exact numeric value    |
| REAL             | Floating point number  |
| DOUBLE PRECISION | Large floating number  |

Example:

```sql
age INTEGER
salary NUMERIC(10,2)
id SERIAL
```

---

# 🔤 Character Data Types

| Data Type  | Description            |
| ---------- | ---------------------- |
| CHAR(n)    | Fixed length string    |
| VARCHAR(n) | Variable length string |
| TEXT       | Unlimited text         |

Example:

```sql
name VARCHAR(50)
description TEXT
```

---

# 📅 Date & Time Data Types

| Data Type   | Description             |
| ----------- | ----------------------- |
| DATE        | Store date              |
| TIME        | Store time              |
| TIMESTAMP   | Date + time             |
| TIMESTAMPTZ | Timestamp with timezone |

Example:

```sql
dob DATE
created_at TIMESTAMP
```

---

# ✅ Boolean Data Type

| Data Type | Description  |
| --------- | ------------ |
| BOOLEAN   | True / False |

Example:

```sql
is_enrolled BOOLEAN
```

Values:

```sql
TRUE
FALSE
```

---

# 🆔 UUID Data Type

UUID হলো unique identifier।

Example:

```sql
id UUID
```

Generate UUID:

```sql
gen_random_uuid()
```

---

# 🧠 JSON Data Types

| Data Type | Description           |
| --------- | --------------------- |
| JSON      | Store JSON            |
| JSONB     | Binary optimized JSON |

Example:

```sql
data JSONB
```

---

# 📂 Binary Data Type

| Data Type | Description |
| --------- | ----------- |
| BYTEA     | Binary data |

Example:

```sql
file BYTEA
```

---

# 📚 Array Data Type

PostgreSQL array support করে।

Example:

```sql
marks INTEGER[]
skills TEXT[]
```

---

# 📄 XML Data Type

XML data store করার জন্য ব্যবহার হয়।

Example:

```sql
data XML
```

---

# 🎓 Student Table Example

## Create Table

```sql
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    student_id INTEGER UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    dob DATE,
    is_enrolled BOOLEAN DEFAULT TRUE
);
```

---

# 📥 Insert Data

```sql
INSERT INTO students (
    student_id,
    name,
    dob,
    is_enrolled
)
VALUES (
    1001,
    'Niloy',
    '2004-01-10',
    TRUE
);
```

---

# 📤 Get Data

```sql
SELECT * FROM students;
```

---

# ✏️ Update Data

```sql
UPDATE students
SET name = 'Rahim'
WHERE student_id = 1001;
```

---

# ❌ Delete Data

```sql
DELETE FROM students
WHERE student_id = 1001;
```

---

# 🔎 Important SQL Keywords

| Keyword     | Description     |
| ----------- | --------------- |
| SELECT      | Read data       |
| INSERT      | Add data        |
| UPDATE      | Modify data     |
| DELETE      | Remove data     |
| WHERE       | Condition       |
| ORDER BY    | Sort data       |
| LIMIT       | Limit results   |
| PRIMARY KEY | Unique main key |
| FOREIGN KEY | Relation key    |
| UNIQUE      | Unique value    |
| NOT NULL    | Cannot be empty |
| DEFAULT     | Default value   |

---

# 🧩 Example Query

```sql
SELECT name, student_id
FROM students
WHERE is_enrolled = TRUE
ORDER BY name ASC
LIMIT 10;
```

---

# 📌 PostgreSQL vs MySQL

| Feature         | PostgreSQL       | MySQL               |
| --------------- | ---------------- | ------------------- |
| JSON Support    | Better           | Basic               |
| Performance     | Advanced queries | Fast simple queries |
| ACID Compliance | Strong           | Moderate            |
| Extensible      | High             | Medium              |
| Array Support   | Yes              | No                  |

