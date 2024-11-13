import {Pool} from 'pg';

export type DbClient = {
  query: <RowType>(query: string, params?: any[]) => Promise<RowType[] | RowType>;
}

type PgClientOptions = {
  dbConnectionString: string
}
export function createPgClient({dbConnectionString}: PgClientOptions): DbClient {
  const pool = new Pool({ connectionString: dbConnectionString });
  return {
    async query(sql: string, params?: any[]) {
      const result = await pool.query(sql, params);
      return result.rows;
    }

  }
}