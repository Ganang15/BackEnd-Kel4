import { Sequelize } from "sequelize";
const db = new Sequelize('project_db','root','',{
    host: "localhost",
    dialect : "mysql"
});

export default db;
