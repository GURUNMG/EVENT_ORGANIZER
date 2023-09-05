import {Grid,Snackbar,Stack} from '@mui/material'
import React, {useRef, useState} from 'react';
import { TextField } from '@mui/material';
import {Button} from '@mui/material';
import axios from 'axios';
import { useNavigate,Routes,Route} from 'react-router-dom';
import logo from "../image/logo2.png"
import GoogleIcon from '@mui/icons-material/Google';
import Link from '@mui/material/Link';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={10} ref={ref} variant="filled" {...props} />;
});



export const AdminRegister=()=>{
    const [message, setMessage] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');
    const [responseMessage, setResponseMessage] = useState<String>();
    const handleClose = () => {
      setMessage(false);
    };

     const nameValue=useRef<HTMLInputElement>(null)
     const emailValue=useRef<HTMLInputElement>(null)
     const password=useRef<HTMLInputElement>(null)
     const cpassword=useRef<HTMLInputElement>(null)
     const navigate = useNavigate();   
    
   const type1=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const name =nameValue.current?.value || '';
    const email=emailValue.current?.value || '';
    const pass=password.current?.value || '';
    const cpass=cpassword.current?.value || '';
    const regex=new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$!@%^&*()]).{8,}')
    
    if(regex.test(pass)){
      if(pass===cpass){
        console.log("hehehe")
        axios.post("http://localhost:3001/event/app/v1/admin/register",{userName:name,email:email,password:pass})
        .then((response)=>{
            // alert("logged in successfully");
            if(response.status === 201){
              setMessage(true)
              setAlertSeverity("success")
              setResponseMessage(response.data.message)
              setTimeout(()=>{
              navigate('/event/app/v1/admin-login');
            },2000)  
            }     

          }).catch((error)=>{
            console.log(error)
            setMessage(true)
            setAlertSeverity("error")
            setResponseMessage(error.message)
          })        
        }
      else{
        alert("incorrect password")
      }
    }
    else{
      alert(`password must contain atleast 8 characters ${pass} ${cpass}`)
    }
  }
  const change=()=>{
     navigate('/event/app/v1/admin-login')
  }

  const changeBack = () =>{
    navigate('/event/app/v1')
  }
    return (
   
      <>
        <Grid container my={1} justifyContent="center">
          <img src={logo} alt="asa" width="10%" height="90%"></img>
          <span style={{color:"blue",fontSize:"22px"}}>REGISTER</span>
        </Grid>
       <Grid container  justifyContent="center">
          <form onSubmit={type1}>
            <Grid item my={1}><TextField required inputRef={nameValue} type="text" label="name"></TextField></Grid>
            <Grid item my={4}><TextField required  inputRef={emailValue} type="email" label="email"></TextField></Grid> 
            <Grid item my={4}><TextField required  inputRef={password} type="password" label="password"></TextField></Grid>
            <Grid item my={3}><TextField required  inputRef={cpassword} type="password" label="confirm password"></TextField></Grid>
            <Grid item>
              <Stack direction="row" spacing={4}>
                <Button variant="text" size="small">
                  <GoogleIcon></GoogleIcon>
                </Button><Button type="submit" variant="contained" size="medium">submit</Button>
              </Stack>
            </Grid>
            <Grid item my={2}>Already have an account?<Link  href="" onClick={change}>Login</Link></Grid>
            <Grid item my={2}>Register for User?<Link  href="" onClick={changeBack}>User Registration</Link></Grid>
          
          </form>
       </Grid>
       <Snackbar open={message} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
          {responseMessage}
        </Alert>
      </Snackbar>
     </>
)}

