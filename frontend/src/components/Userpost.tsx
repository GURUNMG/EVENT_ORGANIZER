import {Grid,DialogActions,Avatar} from "@mui/material";
import { useState,useEffect} from "react";
import { TextField } from '@mui/material';
import {Button} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useParams } from "react-router-dom";
import axios from "axios";

const Userpost=()=>{
    const[image,setImage]=useState<File|null>(null);
    const [check,setCheck]=useState(true);
    const [display,setDisplay]=useState(false);
    const [open, setOpen] =useState(false);
    const [textval,setTextval]=useState<string>('');  
    const { email} = useParams<{ email: string}>();
    const [count,setCount]=useState(0);
    
    const ImageUpload=(e:React.ChangeEvent<HTMLInputElement>)=>{
      if (e.target.files && e.target.files[0]) {
        setImage(e.target.files[0]);
        setCount(count+1);
    }//? will not throw an error instead it returns undefined
     setCheck(false);
    
    }
    const [currentTime, setCurrentTime] = useState(new Date());
    
    useEffect(() => {
            setCurrentTime(new Date());
    }, []);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    

    const textchange=(event:React.ChangeEvent<HTMLInputElement>)=>{
       setTextval(event.target.value);
       
    }

    const handleSubmit =  (e: React.FormEvent) => {
      setOpen(false);
      setDisplay(true);
      setCount(0);
      const formData = new FormData();
      formData.append('caption',textval);
      formData.append('date',  currentTime.toISOString());
      formData.append('image', image || ''); // Handle if image is null blob stores b
      formData.append('email',email || '')


      axios.post("http://localhost:3001/event/app/v1/eventpost",formData,{headers: {
        'Content-Type': 'multipart/form-data'
      }}).then((response)=>{
        console.log(response);
        setImage(null);
        setCheck(true);

  }).catch((e)=>{
     console.log(e)
  })
      
      // console.log(formData)
      
      //     console.log("post")
      //          axios.post('http://localhost:8080/chatease/userpost', {caption:textval,date:currentTime,image:image,email}, {
      //         headers: { 'Content-Type': 'multipart/form-data' },
      //     }).then((response)=>{
      //       console.log(response)
      //     })
}
    return(
        <Grid>
            <Grid container  sx={{border:'1px solid black', borderRadius:'10px',width:'300px',height:'90px'}}>
              <Grid item display="flex" justifyContent="center" alignItems="center" sx={{marginLeft:"20px"}}>
              <Avatar>
                  {email?.charAt(0).toUpperCase()}
                </Avatar>
               <Button  variant="outlined" onClick={handleClickOpen} style={{marginLeft:'10px',width:"200px",color:"black",backgroundColor:"white"}}>
                 <span style={{marginRight:"70px"}}>Start Post</span>
                </Button>
                <form onSubmit={handleSubmit}>
                <Dialog
                  onClose={handleClose}
                  open={open}
                >
                <DialogTitle>
                  <Grid container justifyContent="space-between">
                     <span style={{color:"blue"}}>Create Post</span>
                     <Button variant="text" onClick={handleClose}>X</Button>
                  </Grid>
                </DialogTitle>
                
                <DialogContent dividers>
                  <Grid container flexDirection="column">
                    <Grid item display='flex' justifyContent="center" alignItems="center">{image&& <img src={URL.createObjectURL(image)}  height="200%" width="45%" alt="hai"></img>}</Grid>
                    <Grid item my={2} display='flex' justifyContent="center" alignItems="center" style={{position:"relative"}}>
                    <Button variant="contained">+</Button>
                    
                    <input
                    type="file"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      opacity:0,
                      width: "80%",
                      height: "90%",
                      
                    }}
                    accept="image"
                    onChange={ImageUpload}
                    required
                    />
                    </Grid>
                  </Grid>
                <Grid item display="flex" justifyContent="center" alignItems="center">
                  <TextField variant="standard" required placeholder="comment" style={{marginLeft:'20px'}} multiline onChange={textchange}></TextField>
                </Grid>
              </DialogContent>
              <DialogActions>
                {textval!=='' && <Button type="submit" onClick={handleSubmit}>
                  Post
                </Button>}
              </DialogActions>
              </Dialog>
              </form>
              </Grid>
           </Grid>
          </Grid>
    )
}
export default Userpost;