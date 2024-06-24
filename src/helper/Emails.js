// VALIDATE PASSWORD
export const validateEmailHelper = (email)=>{
    if (!email) {
        return {
            'isSuccess':false,
            'isEmail':false,
            'message':'Please enter your email address'
        };
    }
    if (email.length) {
    var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(email)) {
        return {
            'isSuccess':false,
            'isEmail':true,
            'message':'Please provide valid email address'
        };
    }
    }
    return {
        'isSuccess':true,
        'isEmail':true,
        'message':'Email address is valid'
    }
}