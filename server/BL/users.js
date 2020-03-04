const mongoose = require('mongoose');
const UserModel = require('../models/db/user');
const userAdapters = require('../models/client/user');

module.exports = {
    getUsers: () =>
        UserModel.find()
            .exec()
            .then((users) => {
                if (!users) {
                    return null;
                }
                const responseUsers = users.map((user) => userAdapters.createUserModel(user));
                return responseUsers;
            }),

    getUserById: (id) =>
        UserModel.findOne({ _id: new mongoose.Types.ObjectId(id) })
            .exec()
            .then((user) => {
                if (!user) {
                    return null;
                }
                const responseUser = userAdapters.createUserModel(user);
                return responseUser;
            }),

    saveUser: (params) => {
        const newUser = new UserModel(); // eslint-disable-line new-cap
        newUser.firstName = params.firstName;
        newUser.lastName = params.lastName;
        newUser.email = params.email;
        newUser.password = params.password;
        newUser.gender = params.gender.toLowerCase();

        return newUser.save()
            .then((newUserModel) => userAdapters.createUserModel(newUserModel))
            .catch((err) => ({ err }));
    },

    deleteUser: (id) =>
        UserModel.find({ _id: id }).deleteOne()
};