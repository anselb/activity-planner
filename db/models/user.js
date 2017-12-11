'use strict';
var bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.STRING
        }
    });


    User.associate = function (models) {
        // associations can be defined here
        User.hasMany(models.Itinerary)
    };

    User.prototype.generateHash = function (password) {
        var hashedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        return hashedPass;
    };

    User.prototype.validatePassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    return User;
};
