import http from '../http-common'
let email;
let password;
function getEmailPassword()
{
    email=localStorage.getItem("email")
    password=localStorage.getItem("password")
}
const create=(data)=>{
    getEmailPassword();
    return http.post("/products/addproduct",data,{auth:{username:email,password:password}})
}
const getAllProducts=()=>{
    alert('Inside getallproducts')
    getEmailPassword();
    return http.get("/products/allproducts");
}
const getById=(id)=>{
    getEmailPassword();
    return http.put("/products"+id,
    {
        auth:{username:email,password:password}
    })
}
const update=(data)=>{
    getEmailPassword();
    
    return http.put("/products/update",data,
    {
        auth:{username:email,password:password}
    })
}
const deleteProduct=(id)=>{
    return http.delete("/products/",+id,{
        auth:{username:email,password:password}
    })
}

const ProductService={
    create,
    getAllProducts,getById,
    update,deleteProduct

}
export default ProductService;