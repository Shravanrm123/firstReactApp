import {useState,useEffect} from "react"
import ProductService from "../services/productservice"
import { Link } from "react-router-dom"
import {BsFillPencilFill,BsFillTrash3Fill} from 'react-icons/bs'


function ProductList(){
    const[products,setProducts]=useState([])
    let[authorities,setAuthorities]=useState('')
    useEffect(()=>{
        ProductService.getAllProducts()
        .then(response=>{
            setProducts(response.data)
        }).catch(e=>{
            console.log(e);
        
    })
},[])
function getAllProducts(){
    let jwtToken=localStorage.getItem('token')
    ProductService.getAllProducts(jwtToken)
    .then(response=>{
        setProducts(response.data)
    }).catch(e=>{
        console.log(e)
    })
}
//products=products.filter(
//    (p)=>p.name.toLowerCase().includes(searchTerm.toLowerCase()))
//const handleChange=(e)=>{
//    setSearchTerm(e.target.value)
//    console.log(searchTerm)
//}
const deleteProduct=(id)=>{
    if(window.confirm('Do you want to delete this product')){
    ProductService.deleteProduct(id).then(response=>{
        console.log(response.status);
        alert('Product deleted successfully')
        //alert('Del')
        getAllProducts()
    }).catch(e=>{
        console.log(e)
    })
}
}
    return(
    <>
    <table style={{border:'1px black solid'}} >
        <thead>
            <tr>
                <th>Images   </th>
                <th>Name     </th>
                <th>Price    </th>
                <th>Quantity  </th>
                
            </tr>
        </thead>
        <tbody>
            {products.map(function(p){
                return(
                    <tr key={p.id}  >
                        <td><img src={'../images/'+`${p.id}`+'.jpg'} height={'40px'} width={'40px'}></img></td>
                        <td><Link to={`/viewproduct/${p.id}`}>{p.name}</Link></td>
                        <td>{p.productname}</td>
                        <td>{p.price}</td>
                        <td>{p.quantity}</td>
                        {authorities==="Admin"?(
                       
                        <td>
                            <Link to={`/edit/${p.id}`} className="btn btn-primary"><BsFillPencilFill></BsFillPencilFill>Update</Link>
                        </td>
                        ):(
                            ""
                        )}
                        {authorities==="Admin"?(
                        <td>
                            <button className="btn btn-danger" onClick={()=>{deleteProduct(p.id)}}><BsFillTrash3Fill></BsFillTrash3Fill>Remove</button>
                            </td>
                        ):(
                            " "
                        )}</tr>
                        
                )
            })}
        </tbody>
    </table>
    </>

    );
}
export default ProductList;
