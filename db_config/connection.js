const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    dialect:'mysql',
    logging:false
}
)
sequelize.sync().then((result)=>
     {
    console.log("Connected successfully");
     }).
catch(e =>
{
    throw e;
})

module.exports = sequelize;