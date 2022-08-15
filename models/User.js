const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {};

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: 4
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: 4,
                msg: 'Password Must Contain 4 Characters.'
            }
        }
    }
}, {
    sequelize: require('../config/connection'),
    modelName: 'user',
    hooks: {
        async beforeCreate(user) {
            const encrypted_password = await bcrypt.hash(user.password, 10);
            user.password = encrypted_password;
        }
    }
});

User.prototype.validatePassword = async function (password, encrypted_password) {
    return await bcrypt.compare(password, encrypted_password)
};

module.exports = User;