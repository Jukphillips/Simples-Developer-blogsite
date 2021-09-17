const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {};

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            }
        },

    },
    {
    sequelize: sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
    }
)