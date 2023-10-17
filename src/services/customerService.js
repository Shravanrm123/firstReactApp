import http from '../http-common'
let email;
let password;
function getEmailPassword()
{
    email=localStorage.getItem("email")
    password=localStorage.getItem("password")
}


const register=(data)=>{
    getEmailPassword();
    
    return http.post("/public/register",data,{auth:{username:email,password:password}})
}
const login=(data)=>{
    return http.post("/public/login",data)
}

const logout=()=>{
    return http.get("/logoutsuccess")
}
const CustomerService={
    
    register,
    login,logout
    
}
export default CustomerService;

