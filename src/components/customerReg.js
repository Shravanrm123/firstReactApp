import { useState } from "react";
import CustomerService from "../services/customerService";
import { useNavigate } from "react-router-dom";

function CustomerReg(){
    const initialValues={email:'',password:''}
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
        saveUser(formValues)
        }


       const saveUser=(data)=>{
        CustomerService.register(data).then((Response)=>{
            alert("User added successfully");
        }).catch((e)=>{
            console.log(e);
        })
    }

        
        const validateForm=(formValues)=>{
            const errors={}
            if(!formValues.firstname)
            errors.email='Firstname is required'
            if(!formValues.lastname)
            errors.email='Lastname is required'

            if(!formValues.email)
            errors.email='Email is required'
            if(!formValues.password)
            errors.password='Password is required'
            if(!formValues.role)
            errors.email='Role is required'

            return errors;
        }
        
        

    return(
        <div>
             <pre>{JSON.stringify(formValues)}</pre>
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="email">Email</label>
                <input type="text" name="email"
                placeholder="Enter the email"
                onChange={handleChange}
                value={formValues.email}
                ></input>
                <b style={{color:'red'}}>{formErrors.email}</b>
            </div>
            <div>
            <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName"
                placeholder="Enter the first name"
                onChange={handleChange}
                value={formValues.firstname}
                ></input>
                <b style={{color:'red'}}>{formErrors.firstname}</b>
            </div>
            <div>
            <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName"
                placeholder="Enter the last name"
                onChange={handleChange}
                value={formValues.lastname}
                ></input>
                <b style={{color:'red'}}>{formErrors.lastname}</b>
            </div>
            <div>
            <label htmlFor="password">Password</label>
                <input type="password" name="password"
                placeholder="Enter the password"
                onChange={handleChange}
                value={formValues.password}
                ></input>
    <b style={{color:'red'}}>{formErrors.password}</b>
            </div>
            <div>
            <label htmlFor="role">Role</label>
                <input type="text" name="role"
                placeholder="Enter the role"
                onChange={handleChange}
                value={formValues.role}
                ></input>
    <b style={{color:'red'}}>{formErrors.role}</b>
            </div>

                        <button>Submit</button>
        </form>
    </div>
        
    )
}



export default CustomerReg;