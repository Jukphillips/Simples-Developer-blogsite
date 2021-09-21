const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection')
const bcrypt = require('bcrypt');

class User extends Model {
    checkpassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password)
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
        type: DataTypes.STRING,
        unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 32]
            }
        }
    }, 
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                newUserData.username = newUserData.username.toLowerCase();
            },
            beforeUpdate: async (updatedUserData) => {
                if(updatedUserData.password){
                    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10)

                }

                newUserData.username = newUserData.username.toLowerCase();
                return updatedUserData

            }
        },

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",

    },

)

module.exports = User;