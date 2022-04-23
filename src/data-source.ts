import "reflect-metadata"
import { DataSource } from "typeorm"
import { Draw } from "./entity/draw"
import { Text } from "./entity/text"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "us-cdbr-east-04.cleardb.com",
    port: 3306,
    username: "bcbab4d833f9e4",
    password: "30ef9798",
    database: "heroku_7e6d584f3e7d51a",
    synchronize: true,
    logging: false,
    entities: [Draw, Text],
    migrations: [],
    subscribers: [],
})
