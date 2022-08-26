module.exports =
{
  httpCodes: {
    "NEWLYCREATED": 201,
    "SUCCESS": true,
    "ERROR": false,
    "HTTP_SUCCESS": 200, // Success
    "HTTP_ACCEPTED": 202, // Accepted but not processed successfully
    "HTTP_BAD_REQUEST": 400, // Bad Request URI or Field missing or not valid
    "HTTP_FORBIDDEN": 403, // Unauthorized access or no premission
    "HTTP_NOT_FOUND": 404, // Not Found
    "HTTP_ALREADY_EXISTS": 409, // User already exist
    "HTTP_ALREADY_CANCELLED": 412, // Appointment alreayd cancelled
    "HTTP_SERVER_ERROR": 500, // Server Error
    "HTTP_OTP_REDIRECT": 405, // Redirect to OTP verification,
    "HTTP_NOT_EXISTS": 401, // Not exist
    "HTTP_PROFILE_REDIRECT": 408,
    "LOGOUT_USER": 413,
    "PENDING": 0,
    "ACTIVE": 1,
    "BLOCKED": 2,
    "DEACTIVE": 3,
    "USER_STATUS": {
      "ACTIVE": 1,
      "DEACTIVE": 0
    },

  },
  messages:
  {
    "LOGIN": {
      "SUCCESS": "Logged in successfully",
      "FAILURE": "Invalid Email/Username or Password",
      "NOT_VERIFIED": "Please verify your account",
      "BLOCKED": "Your account is not active yet. Please contact Admin for activation.",
      "NOT_FOUND": "Invalid username or password",
      "MATCH":"password dosnt match , enter same password"
    },
    "SIGNUP": {
      "ALREADY_EXISTS": "Try something different, this email and password already exists",
      "EMAIL_ALREADY_EXISTS": "Try something different, this email already exists",
      "SUCCESS": "your account is successfully created",
      "PHONE_ALREADY_USE": "try something different phone number already in use",
      "EMAIL": "email is not empty, please enter email",
      "PASSWORD": "password is not empty, please enter password",
      "VALIDEMAIL": "please enter valid email",
      "VALIDBODY":"enter   some data",
      "VALIDPASSWORD": "please enter valid password,password should contain upperCase letter, lowercase letter,  charecter,and number ",
      "VALIDPHONE": "please enter valid phone number, enter 10 digit number"
    },
    "BLOG": {
      "SUCCESS": "blog is created successfully",
      "SORT": "blog is sorted by title",
      "GETID": "blog is present by id OR title",
      "UPDATE": "blog successfully update",
      "DELETE": "blog is delete",
      "PARAM":"this id is deleted or inccorect, please enter valid Id , ",
      "VALIDID":"please check your id , its not a valid id",
      "ABCENTID":"id not present is db or it delete",
      "ALLBLOG":"get all blog",
      "ALREADY":"blog is already deleted"
    },

    "AUTHENTICATE": {
      "AUTHORIZE": "user is authorise able to access data",
      "AUTHENTICATE": "user is authenticate successfully",
      "FAILER": "user not authorise",
      "TOKEN": "Missing authentication token in request",
      "INVALID": "token userId and blogUserID is not same , please enter valid userid",
      "invaild":"userId and token userId not same"
    },
    "USER":{
      "VALID":"please enter userId in paramas"
    }

  }


}