import {Grid,DialogActions,Card,CardHeader,Stack,Menu,MenuItem,CardContent,CardMedia,Avatar} from "@mui/material";
import { useState,useEffect} from "react";
import { TextField } from '@mui/material';
import {Button} from '@mui/material';
import IconButton from "@mui/material/IconButton";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import logo from '../image/logo.jpg'
import HomeIcon from '@mui/icons-material/Home';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Person2Icon from '@mui/icons-material/Person2';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useParams } from "react-router-dom";
import axios from "axios";
interface userpost{
  caption:string,
  date:string,
  image:string,
  id:string,
  userName:string
}


const Postdisplay=()=>{
    const[image,setImage]=useState<File|null>(null);
    const[postId,setPostId]=useState<String>('')
    const [value,setValue]=useState<null|HTMLElement>(null);
    const [count,Setcount]=useState(0)
    const [open, setOpen] =useState(false);
    const [count2,setCount2]=useState(false)
    const[allPost,setAllPost]=useState<userpost[]>();
    const [value1,setValue1]=useState<null|HTMLElement>(null);
    const { email} = useParams<{ email: string}>();    
    const open1=Boolean(value1);
    
    useEffect(() => {
      axios.get('http://localhost:3001/event/app/v1/allpost')
          .then(response => {
              setAllPost(response.data.reverse());
              
          })
          .catch(error => {
              console.error('Error fetching posts:', error);
          });
  }, [open]);
    const change=()=>{
      // axios.post("http://localhost:8080/chatease/like",{})
      Setcount(count+1)
    }

    const text1=()=>{
      setCount2(!count2)
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setValue(event.currentTarget);
    };
    
    return(  
          <>
          <h2>hello gurubharan</h2>
          {allPost?.map(post=>(
            <Grid key={post.id}>
            <Grid container display="flex" justifyContent="center">
            <Card sx={{maxWidth:370, maxHeight:500, mx:'auto',my:5}}>
            <CardHeader      
              avatar={
                <Avatar>
                 {/* {post?.userName.charAt(0).toUpperCase()} */}
                  
                </Avatar>
              }
            action={
              <Grid>
              <IconButton onClick={handleClick}>
                <MoreVertIcon> </MoreVertIcon>
              </IconButton>
              <Menu
                id="item"
                open={open1}
                anchorEl={value1}//it is used to position the menu relative to the specific element
                onClose={()=>setValue(null)}>
              {/* <MenuItem>AddImage <input type="file" accept="image/png"/></MenuItem> */}
                <MenuItem>EditPost</MenuItem>
                <MenuItem>DeletePost</MenuItem>
              </Menu>
            </Grid>}
              title={post.userName}
              subheader={post.date.substring(0,10)}
            />
            {post.image != null &&
             <CardMedia
             component="img"
             height="220"
            //  src={require('../../../backend/app/uploads/1694261870328-366212752-logo2.png')}
            //  src={require(`../media/${post.image}`)}
             alt="abc"
             />
             }
           
            <CardContent>     
                <Stack direction="row"><span>{post.caption}</span></Stack>
                <Stack direction="row" my={4} spacing={9}><Button variant="text" size="small" onClick={change}> <ThumbUpOutlinedIcon></ThumbUpOutlinedIcon> {count}</Button><Button variant="text" size="small" onClick={text1}> {count2 && <TextField variant="outlined" fullWidth/>}<CommentOutlinedIcon></CommentOutlinedIcon></Button> <Button variant="text" size="small"><ShareOutlinedIcon></ShareOutlinedIcon></Button></Stack>
            </CardContent>
          </Card>
          </Grid>
          </Grid>
          ))}
          </>
             
    )
}
export default Postdisplay;