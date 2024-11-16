import { DbClient } from "../db";
import { Owner, OwnerToCreate } from "../entity/owner.type";

export class OwnerRepository {
  private readonly client;

  constructor(dbClient: DbClient) {
    this.client = dbClient;
  }

  async read(limit?: number, offset?: number) {
    const sql = `SELECT id, name, age FROM pet_owner LIMIT $1 OFFSET $2`;
    const rows = await this.client.query(sql, [limit, offset]) as Array<Owner>;
    return rows;
  }

  async create(owner: OwnerToCreate) {
    const { name, age } = owner;
    const sql = `
      INSERT INTO pet_owner (name, age) 
      VALUES ($1, $2) 
      RETURNING * 
    `;
    const rows = await this.client.query(sql, [name, age]) as Array<Owner>;
    return rows[0];
  }

}