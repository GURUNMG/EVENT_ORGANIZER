import { Grid, Card, CardHeader, Stack, Menu, MenuItem, CardContent, CardMedia, Avatar, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useParams } from "react-router-dom";
import axios from "axios";
import DoneIcon from '@mui/icons-material/Done';
import { green, red } from '@mui/material/colors';
import { useNavigate,Routes,Route} from 'react-router-dom';
interface UserPost {
  caption: string;
  date: string;
  image: string;
  _id: string;
  userName: string;
  email: string;
}

interface UserOption {
  email: string;
  postId: string;
  action: string;
}

const PostDisplay = () => {
  const [allPosts, setAllPosts] = useState<UserPost[]>([]);
  const [userOptions, setUserOptions] = useState<UserOption[]>([]);
  const [handledPosts, setHandledPosts] = useState<string[]>([]);
  const [registeredPosts, setRegisteredPosts] = useState<string[]>([]);

  const { email } = useParams<{ email: string }>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isFbButtonEnabled, setIsFbButtonEnabled] = useState(false);
  
  const open1 = Boolean(null);  // Note: I've changed this line to avoid errors, you may need to replace it with your logic.

  useEffect(() => {
    // Load registered posts from local storage when the component mounts
    const storedRegisteredPosts = localStorage.getItem('registeredPosts');
    if (storedRegisteredPosts) {
      setRegisteredPosts(JSON.parse(storedRegisteredPosts));
    }

    axios.get('http://localhost:3001/event/app/v1/allpost')
      .then(response => {
        setAllPosts(response.data.reverse());
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });

    axios.get(`http://localhost:3001/event/app/v1/userchoice/${email}`)
      .then((response) => {
        setUserOptions(response.data.choices);
      })
      .catch((error) => {
        console.log("Error while fetching", error);
      })
  }, [email]);

  useEffect(() => {
    // Extract post IDs from userOptions where action is ACCEPT
    const acceptedPosts = userOptions.filter((option) => option.action === 'ACCEPT').map((option) => option.postId);
    setHandledPosts(acceptedPosts);
  }, [userOptions]);

  const saveRegisteredPostsToLocalStorage = (posts: string[]) => {
    localStorage.setItem('registeredPosts', JSON.stringify(posts));
  };

  const handleActionClick = (postId: string, action: 'ACCEPT') => {
    if (!handledPosts.includes(postId)) {
      // Find the post from allPosts based on postId
      const selectedPost = allPosts.find(post => post._id === postId);
  
      if (!selectedPost) {
        console.error(`Post with postId ${postId} not found.`);
        return;
      }
  
      setHandledPosts([...handledPosts, postId]);
      setRegisteredPosts([...registeredPosts, postId]);
      setIsFbButtonEnabled(true);
      // Save registered posts to local storage
      saveRegisteredPostsToLocalStorage([...registeredPosts, postId]);
  
      // Send Axios POST request to store data on the server
      axios.post('http://localhost:3001/event/app/v1/userchoice/registerd-users/store', {
        email,
        postId,
        date: selectedPost.date, // Use the date from the selected post
      })
        .then((response) => {
          console.log(`Data stored successfully for postId ${postId}`);
          console.log(selectedPost.date);
        })
        .catch((error) => {
          console.error('Error storing data:', error.message);
          console.log(selectedPost.date);
        });
  
      axios.post('http://localhost:3001/event/app/v1/userchoice/store', {
        email,
        postId,
        action,
      })
        .then((response) => {
          console.log(`Email ${email} ${action}ed post ${postId}`);
        })
        .catch((error) => {
          console.error('Error:', error.message);
        });
    }
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();  
  const handleFeedbackClick = (postId: string) => {
    // Redirect to the feedback page
    navigate(`/event/app/v1/feedback/store/${email}/${postId}`);
    // navigate('/feedback/app/v1/login')
  };

  return (
    <>
      {allPosts.map(post => (
        <Grid key={post._id}>
          <Grid container display="flex" justifyContent="center">
            <Card sx={{ maxWidth: 370, maxHeight: 500, mx: 'auto', my: 5 }}>
            <CardHeader
              avatar={<Avatar />}
              action={
                <Grid>
                  {email === post.email ? (
                    <IconButton onClick={handleClick}>
                      <MoreVertIcon />
                    </IconButton>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => handleFeedbackClick(post._id)}
                      disabled={!Boolean(userOptions.find(option => option?.postId === post._id))}
                    >
                      FB
                    </Button>
                  )}
                  <Menu
                    id="item"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem>Enable Feedback</MenuItem>
                  </Menu>
                </Grid>
              }
              title={post.userName}
              subheader={post.date.substring(0, 10)}
            />

              {post.image != null &&
                <CardMedia
                  component="img"
                  height="220"
                  src={require(`../media/${post.image}`)}
                  alt="abc"
                />
              }
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
                <Typography variant="caption" color="textSecondary" align="right">
                  {new Date(post.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default PostDisplay;
