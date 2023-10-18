import { Request, Response } from "express";
import ConfigRoutes from "./ConfigRoutes";
import { pool } from "../database/databse";

class Register extends ConfigRoutes {
  constructor() {
    super();

    this.router.post("/register", this.registerUser.bind(this));
  }

  private async registerUser(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    try {
      const client = await pool.connect();
      const query =
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3, $4) RETURNING *";
      const { rows } = await client.query(query, [name, email, password]);
      client.release();
      res.json(rows[0]);
    } catch (error) {
      console.error("Error registering user into the database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new Register().router;
