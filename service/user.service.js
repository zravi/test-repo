const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { Users } = require('../models');
const { where } = require('sequelize');

const getExistingEmails = async (email) => {
    return Users.findOne({ where: { email } });
};

const createUserDetail = async (_userDetailBody) => {
    const userDetailBody = _userDetailBody;

    return Users.create(userDetailBody);
};

const getUserWithSecretFieldsById = async (id) => {
    try {
        const user = await Users.findOne({
            where: { id: id }
        });
        return user;
    } catch (error) {
        console.error('Error retrieving user with secret fields by id:', error);
        throw error;
    }
};

const getUserByEmail = async (email) => {
    const data = Users.findOne({
        where: { email: email }
    })
    if (data) {
        return data;
    } else {
        res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
    }
    return data;
};

const loginUserWithEmailAndPassword = async (email, password) => {
    try {
        const user = await getUserByEmail(email);
        if (user == null) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
        }

        const userWithSecretFields = await getUserWithSecretFieldsById(user.id);
        if (!user || !(await bcrypt.compare(password, userWithSecretFields.password))) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
        }

        return user;
    } catch (error) {
        console.error('Error in loginUserWithEmailAndPassword:', error);
        throw error;
    }
};

const createUser = async (_userBody) => {
    try {
        const userBody = _userBody;
        if (await getExistingEmails(userBody.email)) {
            return (httpStatus.BAD_REQUEST, "already exist");
        }
        userBody.email = userBody.email.toLowerCase();
        userBody.password = await bcrypt.hash(userBody.password, 8);
        const createdUser = await Users.create(userBody);

        return createdUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};
const getUserWithSecretFields = async (email, password) => {
    try {
        const user = await authService.loginUserWithEmailAndPassword(email, password);
        const tokens = await tokenService.generateAuthTokens(user);
        //res.send({ user, tokens });
    } catch (err) {
        console.log(err);
    }
};




module.exports = {
    createUser,
    getUserWithSecretFields,
    getExistingEmails,
    createUserDetail,
    loginUserWithEmailAndPassword

};
