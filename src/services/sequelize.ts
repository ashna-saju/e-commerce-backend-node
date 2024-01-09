import sequelize from "../config/sequelize-config";
const sequelizeSync=async():Promise<void>=>{
sequelize
.sync({
    force: false
  })
  .then(() => {
    console.log('Tables synchronized successfully.');
  })
  .catch((error:unknown) => {
    console.error('Error synchronizing models:', error);
  });
}
export default sequelizeSync;
  