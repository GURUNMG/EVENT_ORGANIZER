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
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { green, red } from '@mui/material/colors';
interface userpost{
  caption:string,
  date:string,
  image:string,
  _id:string,
  userName:string
}

interface useroption{
  email:string,
  postId:string,
  action:string
}

const Postdisplay=()=>{
    const[image,setImage]=useState<File|null>(null);
    const[postId,setPostId]=useState<String>('')
    const [value,setValue]=useState<null|HTMLElement>(null);
    const [count,Setcount]=useState(0)
    const [open, setOpen] =useState(false);
    const [count2,setCount2]=useState(false)
    const[allPost,setAllPost]=useState<userpost[]>();
    const[userOption, setUserOption]=useState<useroption[]>([]);
    const [value1,setValue1]=useState<null|HTMLElement>(null);
    const { email} = useParams<{ email: string}>(); 
    const [handledPosts, setHandledPosts] = useState<string[]>([]);   
    const [registeredPosts, setRegisteredPosts] = useState<string[]>([]);
    const open1=Boolean(value1);

    const acceptButtonStyle = {
      backgroundColor: green[500], // Use green color from MUI's color palette
      color: 'white', // Set text color to white
    };
  
    const rejectButtonStyle = {
      backgroundColor: red[500], // Use red color from MUI's color palette
      color: 'white', // Set text color to white
    };
    
    useEffect(() => {
      axios.get('http://localhost:3001/event/app/v1/allpost')
          .then(response => {
              setAllPost(response.data.reverse());
              
          })
          .catch(error => {
              console.error('Error fetching posts:', error);
      });

      axios.get(`http://localhost:3001/event/app/v1/userchoice/${email}`)
        .then((response)=>{
          setUserOption(response.data.choices);
        })
        .catch((error)=>{
          console.log("error while fetching",error);
      })
  }, [email]);
  useEffect(() => {
    // Extract post IDs from userOptions where action is ACCEPT
    const acceptedPosts = userOption.filter((option) => option.action === 'ACCEPT').map((option) => option.postId);
    setHandledPosts(acceptedPosts);
  }, [userOption]);
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

    const handleActionClick = (postId: string, action: 'ACCEPT') => {
      if (!handledPosts.includes(postId)) {
        // Update the local state to track the handled post
      console.log("HELLO.................................................................")
        setHandledPosts([...handledPosts, postId]);
        setRegisteredPosts([...registeredPosts, postId]);
        // Send a request to your backend to store the user ID and action in the database
        axios.post('http://localhost:3001/event/app/v1/userchoice/store', {
          email,
          postId,
          action,
        })
        .then((response) => {
          console.log(`Email ${email} ${action}ed post ${postId}`);
        })
        .catch((error) => {
          if (error.response) {
            // The request was made, but the server responded with an error
            console.error('Server Error:', error.response.data);
          } else if (error.request) {
            // The request was made, but no response was received
            console.error('No Response from Server:', error.request);
          } else {
            // Something else went wrong
            console.error('Error:', error.message);
          }
        });
      }
    };
    
    return(  
          <>
          <h2>hello gurubharan</h2>
          {allPost?.map(post=>(
            <Grid key={post._id}>
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
            //  src={`backend/app/${post.image}`}
            //  src={require('../../../backend/app/uploads/1694261870328-366212752-logo2.png')}
             src={require(`../media/${post.image}`)}
             alt="abc"
             />
             }
            <h2>{post.image}</h2>
            <CardContent>     
                <Stack direction="row"><span>{post.caption}</span></Stack>
                <Stack direction="row" my={4} mx={0}>
                {registeredPosts.includes(post._id) ? (
                <Button variant="contained" style={{ backgroundColor: green[500], color: 'white', width: '100%' }} disabled>
                  REGISTERED
                </Button>
              ) : (
                !handledPosts.includes(post._id) && (
                  <Button
                    variant="contained"
                    style={{ backgroundColor: green[500], color: 'white', width: '100%' }}
                    startIcon={<DoneIcon />}
                    onClick={() => handleActionClick(post._id, 'ACCEPT')}
                  >
                    ACCEPT
                  </Button>
                )
              )}
                </Stack>
            </CardContent>
          </Card>
          </Grid>
          </Grid>
          ))}
          </>
             
    )
}
export default Postdisplay;