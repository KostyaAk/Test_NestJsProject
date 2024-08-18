import { DataSource } from "typeorm"
import { Article } from "./article/article.entity"

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT),
    username: 'postgres',
    password: 'postgres',
    database: process.env.PG_DB,
    entities: [Article],
    synchronize: false,
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export default AppDataSource;