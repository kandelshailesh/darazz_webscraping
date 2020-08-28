const sequelize = require('../db_config/connection');
const Sequelize =require('sequelize');

const Item = sequelize.define('item',
{
    name:
    {
        type:Sequelize.TEXT,
        allowNull:false,
        field:'item_name'
    },
    price:
    {
        type:Sequelize.STRING,
        allowNull:false
    },
    image_src:
    {
        type:Sequelize.TEXT,
        allowNull:false
    }
},
    {
        freezeTableName:true
    });

module.exports = Item;