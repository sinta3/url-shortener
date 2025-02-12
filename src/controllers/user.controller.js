const userService = require('@services/user.service');


async function register(req, res, next) {
    try {
        const registrationResult = await userService.registerUser(req,res);
        res.status(200).json(registrationResult);
    } catch (err) {
        next(err); 
    }
}

async function login(req, res, next) {
    try {
        const loginResult = await userService.loginUser(req,res);

        res.status(200).json(loginResult);
    } catch (err) {
        next(err); 
    }
}

module.exports = {
    register,
    login
};