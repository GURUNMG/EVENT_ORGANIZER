import { Grid, Card, CardHeader, Stack, Menu, MenuItem, CardContent, CardMedia, Avatar, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useParams } from "react-router-dom";
import axios from "axios";
import DoneIcon from '@mui/icons-material/Done';
import { green, red } from '@mui/material/colors';

interface UserPost {
  caption: string;
  date: string;
  image: string;
  _id: string;
  userName: string;
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
      setHandledPosts([...handledPosts, postId]);
      setRegisteredPosts([...registeredPosts, postId]);

      // Save registered posts to local storage
      saveRegisteredPostsToLocalStorage([...registeredPosts, postId]);

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
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="item"
                      open={open1}
                      anchorEl={null}
                      onClose={() => { }}>
                      <MenuItem>EditPost</MenuItem>
                      <MenuItem>DeletePost</MenuItem>
                    </Menu>
                  </Grid>}
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
