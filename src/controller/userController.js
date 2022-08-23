const UserModel = require("../model/userModel")
const jwt = require("jsonwebtoken")
const constant= require("../constant.js")

const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
   // if (typeof value === 'number' && value.toString().trim.length === 0) return false
    return true

}
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}


const signUpUser = async function (req, res) {
    try {
        let data = req.body
        const { email, password, phone, address, createdBy, updatedBy } = data

        if (!isValidRequestBody(data))
            return res.status(400).send({ status: false, msg: "Please Enter some data" })


        if (!isValid(email))
            return res.status(400).send({ status: false, msg: "email is required" })
        if (isValid(email))
            if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)))
                return res.status(400).send({ status: false, msg: " Plz Provide valid email" })

                alreadyExistAccount = await UserModel.findOne({ email: email, password:password })
                if (alreadyExistAccount){
                    return res.constant.httpCodes.HTTP_ALREADY_EXISTS.send({status:false, msg:constant.messages.SIGNUP.ALREADY_EXISTS})
                }
        let alreadyExistEmail = await UserModel.findOne({ email: email })
        if (alreadyExistEmail) {
            return res.status(409).send({ status: false, msg: "email already exit" })
        }

        if (!isValid(password)) {
            return res.status(400).send({ status: false, msg: "Password is Required" })
        }
        if (!(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password))) {
            return res.status(400).send({ status: false, msg: "please provide valid password with one uppercase letter ,one lowercase, one character and one number " })
        }
        if(!isValid(phone)){
            return res.status(400).send({ status: false, msg: "phone is required" })
           }
            
        if (isValid(phone))
           
        { 
           
            if (!(/^([+]\d{2})?\d{10}$/.test(phone)))
                return res.status(400).send({ status: false, msg: "Please Enter  a Valid Phone Number" })
    }

    
  const alreadyExsit = await UserModel.findOne({ phone: phone })
        if (alreadyExsit) {
            return res.status(409).send({ status: false, msg: "phone already exit" })
        }
        if (!isValid(address)) {
            return res.status(400).send({ status: false, msg: "address is required" })
        }
 
   
        let savedData = await UserModel.create(data)
        res.status(201).send({ status: true, msg: "successfully created", data: savedData })

    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

const loginUser = async function (req, res) {

    try {

        let body = req.body

        if (Object.keys(body) != 0) {
            let userName = req.body.email;
            let passwords = req.body.password;
            if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(userName))) { return res.status(400).send({ status: false, msg: "Please provide a valid email" }) }
            if (!(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(passwords))) {
                return res.status(400).send({ status: false, msg: "please provide valid password with one uppercase letter ,one lowercase, one character and one number " })
            }

           

            let user = await UserModel.findOne({ email: userName, password: passwords });
if (isValid(user)){
    user["confirmPassword"] = passwords
}
            if (!user) {
            return res.status(400).send({status: false, msg: "username or the password is not corerct" });
            }
            //let user["confirmPassword"] = passwords
        //    if(!isValid(confirmPassword)){
        //     return res.status(400).send({status: false, msg: "username or the password is not corerct" })
        //    }
               

                // if(!isValid(user["confirm"])){
                //     return res.status(400).send({status: false, msg: "jnjjk" });
                // }

            let token = jwt.sign(
                {
                    userId: user._id,
                    email: user._email,
                    iat:Math.floor(Date.now()/1000),
                    ex:Math.floor(Date.now()/1000)+60*60*60

                }, "komal"

            );
            res.status(200).setHeader("x-api-token", token);
            return res.status(201).send({ status: "LoggedIn",msg:"token successfully genrate" , TOKEN: token });
        }

        else { return res.status(400).send({ ERROR: "Bad Request" }) }

    }
    catch (err) {

        return res.status(500).send({ msg: err.message })
    }
}




module.exports.signUpUser = signUpUser;
module.exports.loginUser=loginUser