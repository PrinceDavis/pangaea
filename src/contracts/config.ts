export interface ServerI {
  port: number;
  type: string;
  env: string;
}

export interface DBI {
  mongodbUrl: string;
  redisUrl: string;
}

export interface ConfigI {
  server: ServerI;
  db: DBI;
}
