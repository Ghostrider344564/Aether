import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Workflow } from "./entities/Workflow";
import { Execution } from "./entities/Execution";
import { Credential } from "./entities/Credential";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true, // Only for dev
  logging: false,
  entities: [User, Workflow, Execution, Credential],
  migrations: [],
  subscribers: [],
});
