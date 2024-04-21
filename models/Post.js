const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');

class Post extends Model {};

Post.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    post: {
        type: DataTypes.STRING(1000),
        allowNull: false,
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
        modelName: "post",
    },
);

module.exports = { Post };

