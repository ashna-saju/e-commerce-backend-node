import { Sequelize } from 'sequelize';
const sequelize = new Sequelize({
  database: "e_commerce",
  host: "127.0.0.1",
  username: "root",
  password: "9924@Stronggirl",
  dialect: "mysql",
});
 
export default sequelize;