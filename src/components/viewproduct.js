import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../services/productservice";

function ViewProduct(){
    const {product,setProduct}=useState({})
    const {id}=useParams()
    useEffect(()=>{
        ProductService.getById(id)
        .then(response=>{
            setProduct(response.data)
        }).catch(e=>{
            console.log(e);
        
    })

    },[id])
    return(<>
    <div>
    <img src={'../images/'+`${product.id}`+'.jpg'} alt="image" height={'40px'} width={'40px'}></img><br></br>
        Name:{product.name}<br></br>
        Price:{product.price}<br></br>
        Quantity:{product.quantity}<br></br>

    </div>
    </>)


}
export default ViewProduct