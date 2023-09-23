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
           {/* <Profile/> */}
          </Grid>
    )
}
export default Userpost;



// import {Grid,DialogActions,Avatar} from "@mui/material";
// import { useState,useEffect} from "react";
// import { TextField } from '@mui/material';
// import {Button} from '@mui/material';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const Userpost=()=>{
//     const[image,setImage]=useState<File|null>(null);
//     const [check,setCheck]=useState(true);
//     const [display,setDisplay]=useState(false);
//     const [open, setOpen] =useState(false);
//     const [textval,setTextval]=useState<string>('');  
//     const { email} = useParams<{ email: string}>();
//     const [count,setCount]=useState(0);
    
//     const ImageUpload=(e:React.ChangeEvent<HTMLInputElement>)=>{
//       if (e.target.files && e.target.files[0]) {
//         setImage(e.target.files[0]);
//         setCount(count+1);
//     }//? will not throw an error instead it returns undefined
//      setCheck(false);
    
//     }
//     const [currentTime, setCurrentTime] = useState(new Date());
    
//     useEffect(() => {
//             setCurrentTime(new Date());
//     }, []);

//     const handleClickOpen = () => {
//       setOpen(true);
//     };
//     const handleClose = () => {
//       setOpen(false);
//     };
    

//     const textchange=(event:React.ChangeEvent<HTMLInputElement>)=>{
//        setTextval(event.target.value);
       
//     }

//     const handleSubmit =  (e: React.FormEvent) => {
//       setOpen(false);
//       setDisplay(true);
//       setCount(0);
//       const formData = new FormData();
//       formData.append('caption',textval);
//       formData.append('date',  currentTime.toISOString());
//       formData.append('image', image || ''); // Handle if image is null blob stores b
//       formData.append('email',email || '')


//       axios.post("http://localhost:3001/event/app/v1/eventpost",formData,{headers: {
//         'Content-Type': 'multipart/form-data'
//       }}).then((response)=>{
//         console.log(response);
//         setImage(null);
//         setCheck(true);

//   }).catch((e)=>{
//      console.log(e)
//   })
      
//       // console.log(formData)
      
//       //     console.log("post")
//       //          axios.post('http://localhost:8080/chatease/userpost', {caption:textval,date:currentTime,image:image,email}, {
//       //         headers: { 'Content-Type': 'multipart/form-data' },
//       //     }).then((response)=>{
//       //       console.log(response)
//       //     })
// }
//     return(
//         <Grid>
//             <Grid container  sx={{border:'1px solid black', borderRadius:'10px',width:'300px',height:'90px'}}>
//               <Grid item display="flex" justifyContent="center" alignItems="center" sx={{marginLeft:"20px"}}>
//               <Avatar>
//                   {email?.charAt(0).toUpperCase()}
//                 </Avatar>
//                <Button  variant="outlined" onClick={handleClickOpen} style={{marginLeft:'10px',width:"200px",color:"black",backgroundColor:"white"}}>
//                  <span style={{marginRight:"70px"}}>Start Post</span>
//                 </Button>
//                 <form onSubmit={handleSubmit}>
//                 <Dialog
//                   onClose={handleClose}
//                   open={open}
//                 >
//                 <DialogTitle>
//                   <Grid container justifyContent="space-between">
//                      <span style={{color:"blue"}}>Create Post</span>
//                      <Button variant="text" onClick={handleClose}>X</Button>
//                   </Grid>
//                 </DialogTitle>
                
//                 <DialogContent dividers>
//                   <Grid container flexDirection="column">
//                     <Grid item display='flex' justifyContent="center" alignItems="center">{image&& <img src={URL.createObjectURL(image)}  height="200%" width="45%" alt="hai"></img>}</Grid>
//                     <Grid item my={2} display='flex' justifyContent="center" alignItems="center" style={{position:"relative"}}>
//                     <Button variant="contained">+</Button>
                    
//                     <input
//                     type="file"
//                     style={{
//                       position: "absolute",
//                       top: 0,
//                       left: 0,
//                       opacity:0,
//                       width: "80%",
//                       height: "90%",
                      
//                     }}
//                     accept="image/*"
//                     onChange={ImageUpload}
//                     required
//                     />
//                     </Grid>
//                   </Grid>
//                 <Grid item display="flex" justifyContent="center" alignItems="center">
//                   <TextField variant="standard" required placeholder="comment" style={{marginLeft:'20px'}} multiline onChange={textchange}></TextField>
//                 </Grid>
//               </DialogContent>
//               <DialogActions>
//                 {textval!=='' && <Button type="submit" onClick={handleSubmit}>
//                   Post
//                 </Button>}
//               </DialogActions>
//               </Dialog>
//               </form>
//               </Grid>
//            </Grid>
//           </Grid>
//     )
// }
// export default Userpost;



// import {
//   Grid,
//   DialogActions,
//   Avatar,
//   MenuItem,
//   Menu,
//   Box,
// } from "@mui/material";
// import { useState, useEffect } from "react";
// import { TextField } from "@mui/material";
// import { Button } from "@mui/material";
// import Dialog from "@mui/material/Dialog";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Typography from "@mui/material";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
// import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
// const Userpost = () => {
//   const [image, setImage] = useState<File | null>(null);
//   const [check, setCheck] = useState(true);
//   const [display, setDisplay] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [textval, setTextval] = useState<string>("");
//   const { email } = useParams<{ email: string }>();
//   const [count, setCount] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [anchorEl1, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const open1 = Boolean(anchorEl1);
//   const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose1 = () => {
//     setAnchorEl(null);
//   };
//   const ImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setImage(e.target.files[0]);
//       setCount(count + 1);
//     } //? will not throw an error instead it returns undefined
//     setCheck(false);
//   };
//   useEffect(() => {
//     setCurrentTime(new Date());
//   }, []);
//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const textchange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setTextval(event.target.value);
//   };
//   const handleMouseEnter = () => {
//     setIsHovered(true);
//   };
//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };
//   const handleSubmit = (e: React.FormEvent) => {
//     setOpen(false);
//     setDisplay(true);
//     setCount(0);
//     const formData = new FormData();
//     formData.append("caption", textval);
//     formData.append("date", currentTime.toISOString());
//     formData.append("image", image || ""); // Handle if image is null blob stores b
//     formData.append("email", email || "");
//     axios
//       .post("http://localhost:8080/chatease/userpost", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((response) => {
//         console.log(response);
//         setImage(null);
//         setCheck(true);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//     // console.log(formData)
//     //     console.log("post")
//     //          axios.post('http://localhost:8080/chatease/userpost', {caption:textval,date:currentTime,image:image,email}, {
//     //         headers: { 'Content-Type': 'multipart/form-data' },
//     //     }).then((response)=>{
//     //       console.log(response)
//     //     })
//   };
//   return (
//     <>
//       <Grid
//         container
//         sx={{
//           border: "1px solid lightgrey",
//           borderRadius: "1vw",
//           width: "40vw",
//           height: "70%",
//           backgroundColor: "white",
//         }}
//       >
//       <Grid container display="flex" >
//         <Grid
//             item my={3}
//             sx={{ marginLeft: "2vw"}}
//             display="flex"
//             flex="0 0 auto"
//           >
//             <Avatar style={{ marginTop: "1vh"}}>
//               {email?.charAt(0).toUpperCase()}
//             </Avatar>
//           </Grid>
//       <Grid item my={3} mx={2} >
//        <Button
//       style={{
//         border: "1px solid lightgrey",
//         borderRadius: "8vh",
//         backgroundColor: isHovered ? "#E8E8E8" : "white",
//         height:'100%',
//         //width: '400%', // Adjust the width as needed // Adjust the maxWidth as needed
//        // width: '400px', // Fixed width to control it
//        // width: "100%", // Use 100% width to make sure it stays within the container
//         width: "400px", // Set a maximum width for the button
//         maxWidth:'25rem',
//       }}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//         <span
//           style={{
//             color: "grey",
//             fontWeight: "bold",
//             fontSize: "12px",
//             textTransform:'none',
//           }}
//         >
//           Start a Post
//         </span>
//     </Button>
//     </Grid>
//     </Grid>
//     <Grid container sx={{marginBottom:'10px'}}>
//       <Grid item  mx={9}>
//       <Button
//                 style={{
//                   color: "grey",
//                   textTransform: "none",
//                   fontWeight: "bold",
//                   fontSize: "15px",
//                 }}
//               >
//                 <PermMediaOutlinedIcon color="primary" />
//                 <span style={{marginLeft:'5px'}}>Media</span>
//               </Button>
//       </Grid>
//       <Grid item sx={{}}>
//       <Button style={{color: "grey",textTransform: "none",fontWeight: "bold",fontSize: "15px"}}>
//                <ArticleRoundedIcon color="primary"/>
//                 <span style={{marginLeft:'5px'}}>Write a article</span></Button>
//       </Grid>
//     </Grid>
//           <form onSubmit={handleSubmit}>
//             <Dialog
//               onClose={handleClose}
//               open={open}
//               PaperProps={{
//                 style: {
//                   height: "70%",
//                   width: "40%",
//                 },
//               }}
//             >
//               <DialogTitle>
//                 <Grid container justifyContent="space-between">
//                   <span style={{ color: "blue" }}>Create Post</span>
//                   <Button variant="text" onClick={handleClose}>
//                     X
//                   </Button>
//                 </Grid>
//               </DialogTitle>
//               <DialogContent dividers>
//                 <Grid container flexDirection="column">
//                   <Grid
//                     item
//                     display="flex"
//                     justifyContent="center"
//                     alignItems="center"
//                   >
//                     {image && (
//                       <img
//                         src={URL.createObjectURL(image)}
//                         height="20wh"
//                         width="45vw"
//                         alt="hai"
//                       ></img>
//                     )}
//                   </Grid>
//                   <Grid
//                     item
//                     my={9}
//                     display="flex"
//                     justifyContent="center"
//                     alignItems="center"
//                     style={{ position: "relative" }}
//                   >
//                     <Button variant="contained">+</Button>
//                     <input
//                       type="file"
//                       style={{
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         opacity: 0,
//                         width: "80%",
//                         height: "90%",
//                       }}
//                       accept="image"
//                       onChange={ImageUpload}
//                       required
//                     />
//                   </Grid>
//                 </Grid>
//                 <Grid
//                   item
//                   display="flex"
//                   justifyContent="center"
//                   alignItems="center"
//                 >
//                   <TextField
//                     variant="standard"
//                     required
//                     placeholder="comment"
//                     style={{ marginLeft: "20px" }}
//                     multiline
//                     onChange={textchange}
//                   ></TextField>
//                 </Grid>
//               </DialogContent>
//               <DialogActions>
//                 {count === 1 && textval !== "" ? (
//                   <Button type="submit" onClick={handleSubmit}>
//                     Post
//                   </Button>
//                 ) : (
//                   <Button type="submit" disabled>
//                     Post
//                   </Button>
//                 )}
//               </DialogActions>
//             </Dialog>
//           </form>
//         </Grid>
//       <Grid container sx={{ my: 1, alignItems: "center",mx:1}}>
//         <hr style={{ flex: "1", backgroundColor: "light grey" }} />
//         <span style={{ marginLeft: "1vw" }}>Sort by:</span>
//         <Button
//           variant="contained"
//           style={{ backgroundColor: "transparent", boxShadow: "none" }}
//           onClick={handleClick1}
//         >
//           <span
//             style={{
//               color: "black",
//               fontWeight: "bold",
//               textTransform: "none",
//             }}
//           >
//             Top
//           </span>
//           <ArrowDropDownIcon
//             style={{ color: "black", fontWeight: "bold" }}
//           ></ArrowDropDownIcon>
//         </Button>
//         <Menu anchorEl={anchorEl1} open={open1} onClose={handleClose1}>
//           <MenuItem onClick={handleClose}>Data Descending</MenuItem>
//           <MenuItem onClick={handleClose}>Data Ascending</MenuItem>
//           <MenuItem onClick={handleClose}>Your Post</MenuItem>
//         </Menu>
//       </Grid>
//     </>
//   );
// };
// export default Userpost;