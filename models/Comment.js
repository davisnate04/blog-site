const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {};

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "user",
            key: "id",
        },
        allowNull: false,
    },
},
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: false,
        modelName: "comment",
    },
);

module.exports = { Comment };