import { DataSource } from "typeorm";
import { IServerConfig } from "./config";
import * as config from "../../server_config.json";
import { Roles } from "../components/roles/roles_entity";
import { Users } from "../components/users/users_entity";
import { Projects } from "../components/projects/projects_entity";
import { Tasks } from "../components/tasks/tasks_entity";
import { Comments } from "../components/comments/comments_entity";

export class DatabaseUtil {
  public server_config: IServerConfig = config;
  private dataSource!: DataSource;

  private constructor() {}

  public static async create(): Promise<DatabaseUtil> {
    const util = new DatabaseUtil();
    const db_config = util.server_config.db_config;
    util.dataSource = new DataSource({
      type: "postgres",
      host: db_config.host,
      port: db_config.port,
      username: db_config.username,
      password: db_config.password,
      database: db_config.dbname,
      synchronize: true,
      logging: false,
      entities: [Roles, Users, Projects, Tasks, Comments],
    });
    await util.dataSource.initialize();
    console.log("Connected to the database");
    return util;
  }

  public getDataSource(): DataSource {
    return this.dataSource;
  }

  public async closeDatabase(): Promise<void> {
    if (this.dataSource?.isInitialized) {
      await this.dataSource.destroy();
      console.log("Database connection closed");
    }
  }
}
