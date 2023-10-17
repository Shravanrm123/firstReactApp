import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "../services/productservice";

function ProductForm(){
    let navigate=useNavigate();
    const {id}=useParams();
    const initialValues={productname:'',quantity:'',price:''}
    const[formValues,setFormValues]=useState(initialValues)
    const[formErrors,setFormErrors]=useState({})
    const[isSubmitted,setIsSubmitted]=useState(false)
    const handleChange=(event)=>{console.log(event.target);
    const{name,value}=event.target;
    setFormValues({...formValues,[name]:value})
}
const handleSubmit=(e)=>{e.preventDefault();
console.log(formValues)
setFormErrors(validateForm(formValues))
// console.log(formErrors.email)
setIsSubmitted(true)
if(Object.keys(formErrors).length==0 && isSubmitted)
saveOrUpdateProduct(formValues)

}
const saveOrUpdateProduct=(data)=>{
    console.log("data.id"+data.id)
    if(data.id==0){
    ProductService.create(data)
    .then(response=>{
        console.log(response.status)
        navigate("/products")

    })
    .catch(e=>{
        console.log(e.message);
    })
// navigate("/products")
}
else{
    ProductService.update(data).then(response=>{
        console.log(response.data)
        alert('Product details updated successfully...')
        navigate("/products")
    }).catch(e=>{
        console.log(e.message)
    })
}
}
const validateForm=(formValues)=>{
    const errors={}
    if(!formValues.productname)
    errors.productname='Product name is required'
    if(!formValues.quantity)
    errors.quantity='Quantity is required'
    if(!formValues.price)
    errors.price='Price is required'

    return errors;
}
useEffect(()=>{
    console.log('product id is'+id);
    if(id!==0)
    
    {
        ProductService.getById(id)
        .then(response=>{
            console.log(response.data);
            setFormValues(response.data)
        })
        .catch(e=>{
            console.log(e)
        });
    }
    else setFormValues(initialValues)
},[id])

const formTitle=()=>{
    console.log(id)
    if(id)
    {
        return 'Update the product'
    }
    return 'Add a new product'
}
const btnTxt=()=>{
    if(id)
    return 'Update'
    else
    return 'Add'
}
return(
    <div>
        <pre>{JSON.stringify(formValues)}</pre>
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="productname">Product Name</label>
                <input type="text" name="productname"
                placeholder="Enter the product name"
                onChange={handleChange}
                value={formValues.productname}
                ></input>
                <b style={{color:'red'}}>{formErrors.productname}</b>
            </div>
            <div>
            <label htmlFor="quantity">Quantity</label>
                <input type="number" name="quantity"
                placeholder="Enter the quantity"
                onChange={handleChange}
                value={formValues.quantity}
                ></input>
    <b style={{color:'red'}}>{formErrors.quantity}</b>
            </div>
            <div>
            <label htmlFor="price">Price</label>
                <input type="text" name="price"
                placeholder="Enter the price"
                onChange={handleChange}
                value={formValues.price}
                ></input>
    <b style={{color:'red'}}>{formErrors.price}</b>
            </div>
            <button>Submit</button>
        </form>
    </div>
);
}
export default ProductForm;