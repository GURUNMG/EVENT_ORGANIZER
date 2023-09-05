import { Snackbar, TextField} from '@mui/material';
import {Button} from '@mui/material';
import {Grid,Stack} from '@mui/material'
import React, {useRef, useState} from 'react';
import { useNavigate} from 'react-router-dom';
import logo from '../image/logo2.png'
import chat from '../image/chat.jpg'
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import "./styles.css"
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={10} ref={ref} variant="filled" {...props} />;
});
 const AdminLogin=()=>{
  const [message, setMessage] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');
  const [responseMessage, setResponseMessage] = useState<String>();
  const handleClose = () => {
    setMessage(false);
  };

    const emailValue=useRef<HTMLInputElement>(null)
    const passwordValue=useRef<HTMLInputElement>(null)
    const navigate = useNavigate();
   
    const type1=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
       
        const email=emailValue.current?.value || '';
        const pass=passwordValue.current?.value || '';
        axios.post("http://localhost:3001/event/app/v1/admin/login",{email:email,password:pass}).then((response)=>{
        if(response.status===200){
          setMessage(true)
          setAlertSeverity("success")
          setResponseMessage(response.data.message)
          setTimeout(()=>{
            navigate(`/event/app/v1/admin-homepage/${encodeURIComponent(email)}`);
          }, 2000)
        }}
        ).catch((error)=>{
          console.log(e);
          if(error.status === 401){
            setMessage(true)
            setAlertSeverity("info")
            setResponseMessage(error.message)
          }
          else if(error.status === 404){
            setMessage(true)
            setAlertSeverity("error")
            setResponseMessage(error.message)
          }
        })
        }   
    const resetPassword = () =>{
      navigate("/chatease/reset");
    }
    const change=()=>{
        navigate('/event/app/v1/admin-login')
    }
  return(
    <Grid container my={1}>
        <Grid container> 
        <Grid item sx={{height:650,width:650}} className='background-image-container'>
       </Grid>
          <Grid container sx={{width:400,height:490,my:9,mx:'auto'}}>
            <Grid container my={'auto'} justifyContent="center">
              <img src={logo} alt="asa" width="10%" height="40%"></img>
              <span style={{color:"blue",fontSize:"22px"}}>LOGIN</span>
            </Grid>
            <Grid container my={1} justifyContent="center">
              <form onSubmit={type1}>
                  <Grid item my={2}><TextField required  inputRef={emailValue} type="email" label="email"></TextField></Grid> 
                  <Grid item my={5}><TextField required  inputRef={passwordValue} type="password" label="password"></TextField></Grid>
                  <Grid item my={4} mx={1}>
                      <Stack spacing={2} direction="row">
                        <Link  href="" onClick={resetPassword}>Forgot password?</Link>
                        <Button type="submit" variant="contained" size="small">LOGIN</Button>
                      </Stack>
                    <Grid item my={2}>Already have an account?<Link  href="" onClick={change}>Login</Link></Grid>

                  </Grid>

              </form>
            </Grid>
          </Grid> 
        </Grid>
        <Snackbar open={message} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
          {responseMessage}
        </Alert>
      </Snackbar>
    </Grid>
  )}
export default AdminLogin;

