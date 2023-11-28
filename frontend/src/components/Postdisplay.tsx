import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  Stack,
  Menu,
  MenuItem,
  CardContent,
  CardMedia,
  Avatar,
  Button,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DoneIcon from '@mui/icons-material/Done';
import { green } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Calendar from './Calendar';

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

const PostDisplay: React.FC = () => {
  const [allPosts, setAllPosts] = useState<UserPost[]>([]);
  const [userOptions, setUserOptions] = useState<UserOption[]>([]);
  const [handledPosts, setHandledPosts] = useState<string[]>([]);
  const [registeredPosts, setRegisteredPosts] = useState<string[]>([]);

  const { email } = useParams<{ email: string }>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isFbButtonEnabled, setIsFbButtonEnabled] = useState(false);

  const open1 = Boolean(null);

  useEffect(() => {
    const storedRegisteredPosts = localStorage.getItem('registeredPosts');
    if (storedRegisteredPosts) {
      setRegisteredPosts(JSON.parse(storedRegisteredPosts));
    }

    axios
      .get('http://localhost:3001/event/app/v1/allpost')
      .then((response) => {
        setAllPosts(response.data.reverse());
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });

    axios
      .get(`http://localhost:3001/event/app/v1/userchoice/${email}`)
      .then((response) => {
        setUserOptions(response.data.choices);
      })
      .catch((error) => {
        console.log('Error while fetching', error);
      });
  }, [email]);

  useEffect(() => {
    const acceptedPosts = userOptions
      .filter((option) => option.action === 'ACCEPT')
      .map((option) => option.postId);
    setHandledPosts(acceptedPosts);
  }, [userOptions]);

  const saveRegisteredPostsToLocalStorage = (posts: string[]) => {
    localStorage.setItem('registeredPosts', JSON.stringify(posts));
  };

  const handleActionClick = (postId: string, action: 'ACCEPT') => {
    if (!handledPosts.includes(postId)) {
      const selectedPost = allPosts.find((post) => post._id === postId);

      if (!selectedPost) {
        console.error(`Post with postId ${postId} not found.`);
        return;
      }

      setHandledPosts([...handledPosts, postId]);
      setRegisteredPosts([...registeredPosts, postId]);
      setIsFbButtonEnabled(true);
      saveRegisteredPostsToLocalStorage([...registeredPosts, postId]);

      axios
        .post('http://localhost:3001/event/app/v1/userchoice/registerd-users/store', {
          email,
          postId,
          date: selectedPost.date,
        })
        .then((response) => {
          console.log(`Data stored successfully for postId ${postId}`);
          console.log(selectedPost.date);
        })
        .catch((error) => {
          console.error('Error storing data:', error.message);
          console.log(selectedPost.date);
        });

      axios
        .post('http://localhost:3001/event/app/v1/userchoice/store', {
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
    axios.post(`http://localhost:3001/event/app/v1/sendemail/${email}`).then((response)=>{
      console.log("email sent");
    }).catch((erro)=>{
      console.log("error");
    })
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleFeedbackClick = (postId: string) => {
    navigate(`/event/app/v1/feedback/store/${email}/${postId}`);
  };

  const isLaptopSize = useMediaQuery('(min-width: 960px)');

  const isPreviousDate = (dateString: string): boolean => {
    const postDate = new Date(dateString);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1); // Subtracts one day
    return postDate < currentDate;
  };

  const handleFeedbackChartClick = (postId: string) => {
    navigate(`/event/app/v1/feedbackchart/${postId}`);
  };

  const handleAverageFeedbackClick = (postId: string) => {
    navigate(`/event/app/v1/overallchart/${postId}`);
  };

  return (
    <>
      <Grid container>
        <Grid xs={12} md={8}>
          {allPosts.map((post) => (
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
                            disabled={
                              !Boolean(userOptions.find((option) => option?.postId === post._id)) ||
                              isPreviousDate(post.date)
                            }
                          >
                            FB
                          </Button>
                        )}
                        <Menu id="item" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                          <MenuItem>Enable Feedback</MenuItem>
                          <MenuItem onClick={() => handleFeedbackChartClick(post._id)}>Feedback chart</MenuItem>
                          <MenuItem onClick={() => handleAverageFeedbackClick(post._id)}>Average Feedback</MenuItem>
                        </Menu>
                      </Grid>
                    }
                    title={post.userName}
                    subheader={post.date.substring(0, 10)}
                  />

                  {post.image != null && (
                    <CardMedia component="img" height="220" src={require(`../media/${post.image}`)} alt="abc" />
                  )}
                  <CardContent>
                    <Stack direction="row">
                      <span>{post.caption}</span>
                    </Stack>
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
        </Grid>
        {isLaptopSize && (
          <Grid
            item
            xs={12}
            md={4}
            sx={{ position: 'fixed', top: '50%', right: '0', marginRight: '5%', transform: 'translateY(-50%)' }}
          >
            <Calendar />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default PostDisplay;
