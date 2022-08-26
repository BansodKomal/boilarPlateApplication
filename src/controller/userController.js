
const userModel = require("../model/userModel")
const jwt = require("jsonwebtoken")
const constant = require("../constant.js")

const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false

    return true

}
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}


const signUpUser = async function (req, res) {
    try {
        let data = req.body
        const { email, password, phone, address, createdBy, updatedBy, confirmPassword } = data

        if (!isValidRequestBody(data))
            return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.SIGNUP.VALIDBODY, data: null })
        if (!isValid(email))
            return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.SIGNUP.VALIDEMAIL, data: null })
        if (isValid(email))
            if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)))
                return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.SIGNUP.VALIDEMAIL, data: null })

        let alreadyExistEmail = await userModel.findOne({ email: email })
        if (alreadyExistEmail) {
            return res.status(constant.httpCodes.HTTP_ALREADY_EXISTS).send({ status: false, message: constant.messages.SIGNUP.EMAIL_ALREADY_EXISTS, data: null })
        }

        if (!isValid(password)) {
            return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.SIGNUP.PASSWORD, data: null })
        }
        if (!(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password))) {
            return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.SIGNUP.VALIDPASSWORD, data: null })
        }
        if (!isValid(confirmPassword)) {
            return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.SIGNUP.PASSWORD, data: null })
        }
        if (password != confirmPassword) {
            return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.LOGIN.MATCH, data: null })
        }
        if (!isValid(phone)) {
            return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.SIGNUP.VALIDPHONE, data: null })
        }

        if (isValid(phone)) {
            if (!(/^([+]\d{2})?\d{10}$/.test(phone)))
                return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.SIGNUP.VALIDPHONE, data: null })
        }


        const alreadyExsit = await userModel.findOne({ phone: phone })
        if (alreadyExsit) {
            return res.status(constant.httpCodes.HTTP_ALREADY_EXISTS).send({ status: false, message: constant.messages.SIGNUP.PHONE_ALREADY_USE, data: null })
        }


        let savedData = await userModel.create(data)
        return res.status(constant.httpCodes.NEWLYCREATED).send({ status: true, message: constant.messages.SIGNUP.SUCCESS, data: savedData })

    }
    catch (err) {
        res.status(constant.httpCodes.HTTP_SERVER_ERROR).send({ status: false, message: err.message })
    }
}

const loginUser = async function (req, res) {

    try {

        let body = req.body
        const { email, password, } = body

        if (Object.keys(body) != 0) {

            if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(email))) {
                return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.SIGNUP.VALIDEMAIL, data: null })
            }
            if (!(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password))) {
                return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.SIGNUP.VALIDPASSWORD, data: null })
            }

            let user = await userModel.findOne({ email: email, password: password });
            if (!user) {
                return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.LOGIN.FAILURE, data: null });
            }



            let token = jwt.sign(
                {
                    userId: user._id,
                    email: user._email


                }, process.env.scretKey

            );
            res.status(constant.httpCodes.HTTP_SUCCESS).setHeader("x-api-key", token);
            return res.status(constant.httpCodes.HTTP_SUCCESS).send({ status: true, message: constant.messages.LOGIN.SUCCESS, data: token });
        }

        else { return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.LOGIN.NOT_FOUND }) }

    }
    catch (err) {

        return res.status(constant.httpCodes.HTTP_SERVER_ERROR).send({ messages: err.message })
    }
}




module.exports.signUpUser = signUpUser;
module.exports.loginUser = loginUser



























