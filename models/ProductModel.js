import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Product = db.define('product',{
    name: {
        type: DataTypes.STRING
    },
    harga: {
        type: DataTypes.STRING
    },
    deskripsi: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING,
    },
    url: {
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});

export default Product;

(async()=>{
    await db.sync();
})();