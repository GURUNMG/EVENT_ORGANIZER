import {
    Grid,
    DialogActions,
    Avatar,
    MenuItem,
    Menu,
    TextField,
    Button,
    Popover,
    List,
    ListItem,
    ListItemIcon,
  } from "@mui/material";
  import { useState, useEffect } from "react";
  import { useParams } from "react-router-dom";
  import { styled } from "@mui/material/styles";
  import Dialog from "@mui/material/Dialog";
  import DialogContent from "@mui/material/DialogContent";
  import DialogTitle from "@mui/material/DialogTitle";
  import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
  import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
  import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
  import IconButton from "@mui/material/IconButton";
  import CloseIcon from "@mui/icons-material/Close";
  import Tooltip from "@mui/material/Tooltip";
  import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
  import ThumbUpIcon from "@mui/icons-material/ThumbUp";
  import FavoriteIcon from "@mui/icons-material/Favorite";
  import MoodIcon from "@mui/icons-material/Mood";
  import fileupload from "../image/logo.jpg";
  import happy from "../image/happy.png";
  import heart from "../image/heart.png";
  
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
      borderTop: "none",
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));
  
  const BootstrapDialogPost = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));
  
  const Home1 = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [isdisplay, setIsDisplay] = useState<boolean>(false);
    const [openPost, setOpenPost] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [smile, setSmile] = useState<boolean>(false);
    const [heart, setHeart] = useState<boolean>(false);
    const [check, setCheck] = useState<boolean>(true);
    const [image, setImage] = useState<File | null>(null);
    const [multipost, setMultiPost] = useState<File | null>(null);
    const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
    const [anchorElPopOver, setAnchorElPopOver] = useState(null);
    const [textval, setTextval] = useState<string>("");
    const { email } = useParams<{ email: string }>();
    const [count, setCount] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState(new Date());
    const openMenu = Boolean(anchorElMenu);
    const openPopOver = Boolean(anchorElPopOver);
  
    const ImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setImage(e.target.files[0]);
        setCount(count + 1);
      } //? will not throw an error instead it returns undefined
      setCheck(false);
    };
    useEffect(() => {
      setCurrentTime(new Date());
    }, []);
    const handlePost = () => {
      setMultiPost(null);
    };
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClickOpenPost = () => {
      setOpenPost(true);
      setIsDisplay(true);
    };
    const handleClickPopOver = (event: any) => {
      setAnchorElPopOver(event.currentTarget);
    };
    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorElMenu(event.currentTarget);
    };
    const handleClose = () => {
      setOpen(false);
      setMultiPost(null);
      setTextval("");
    };
    const handleClosePost = () => {
      setOpenPost(false);
    };
    const handleClosePopOver = () => {
      setAnchorElPopOver(null);
    };
    const handleCloseMenu = () => {
      setAnchorElMenu(null);
    };
    const textchange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTextval(event.target.value);
    };
  
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
  
    return (
      <>
        <Grid
          container
          sx={{
            border: "1px solid lightgrey",
            borderRadius: "1vw",
            width: "40vw",
            height: "70%",
            backgroundColor: "white",
            position: "relative",
          }}
        >
          <Grid container display="flex">
            <Grid
              item
              my={3}
              sx={{ marginLeft: "2vw" }}
              display="flex"
              flex="0 0 auto"
            >
              <Avatar style={{ marginTop: "1vh" }}>
                {email?.charAt(0).toUpperCase()}
              </Avatar>
            </Grid>
  
            <Grid item my={3} mx={1}>
              <Button
                style={{
                  border: "1px solid lightgrey",
                  borderRadius: "8vh",
                  backgroundColor: isHovered ? "#E8E8E8" : "white",
                  height: "40%",
                  width: "75%",
                  position: "absolute",
                  minWidth: "inherit",
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClickOpen}
              >
                <span
                  style={{
                    color: open ? "black" : "gray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    textTransform: "none",
                    textAlign: "left",
                  }}
                >
                  Start a Post
                </span>
              </Button>
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
                PaperProps={{
                  style: {
                    height: "100vh", // Set the height to 100% of the viewport height
                    margin: 0, // Remove any margins
                    padding: 0, // Remove any padding
                  },
                }}
              >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                  <Grid container display="flex">
                    <Grid item>
                      <Avatar style={{ marginTop: "1vh" }}>
                        {email?.charAt(0).toUpperCase()}
                      </Avatar>
                    </Grid>
                    <Grid item my={1} mx={1}>
                      <span>Your name</span>
                    </Grid>
                  </Grid>
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                  <Grid container>
                    <TextField
                      fullWidth
                      multiline
                      placeholder="What do you want to talk about?"
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                      }}
                      onChange={textchange}
                      //we can either use sx or style
                    ></TextField>
                    <Grid container my={2}>
                      <Grid container position="relative">
                        {multipost && (
                          <>
                            <img
                              src={URL.createObjectURL(multipost)}
                              height="70%"
                              width="70%"
                              alt="ans"
                              style={{ paddingLeft: "10px" }}
                            />
                            <IconButton
                              onClick={handlePost}
                              sx={{
                                position: "absolute",
                                left: 350,
                                color: (theme) => theme.palette.grey[500],
                              }}
                            >
                              <CloseIcon />
                            </IconButton>
                          </>
                        )}
                      </Grid>
                      <Grid container position="relative">
                        <Grid item>
                          {!multipost && (
                            <Tooltip title="Add media" placement="top">
                              <IconButton
                                onClick={handleClickOpenPost}
                                sx={{
                                  position: "absolute",
                                  left: 25,
                                  color: (theme) => theme.palette.grey[500],
                                }}
                              >
                                <PermMediaOutlinedIcon
                                  style={{ color: "grey" }}
                                />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Grid>
                        <Grid item>
                          <IconButton
                            aria-describedby={open ? "popover" : undefined}
                            onClick={handleClickPopOver}
                            sx={{
                              position: "absolute",
                              left: !multipost ? 75 : 30,
                              color: (theme) => theme.palette.grey[500],
                            }}
                          >
                            <MoodIcon />
                          </IconButton>
                          <Popover
                            id="popover"
                            open={openPopOver}
                            anchorEl={anchorElPopOver}
                            onClose={handleClosePopOver}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                          >
                            <List
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <ListItem>
                                <ListItemIcon>
                                  <Button
                                    style={{ color: "grey" }}
                                    onClick={() => setSmile(true)}
                                  >
                                    <SentimentSatisfiedAltIcon />
                                  </Button>
                                  <Button
                                    style={{ color: "grey" }}
                                    onClick={() => setHeart(true)}
                                  >
                                    <ThumbUpIcon />
                                  </Button>
                                  <Button style={{ color: "grey" }}>
                                    <FavoriteIcon />
                                  </Button>
                                </ListItemIcon>
                              </ListItem>
                            </List>
                          </Popover>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </DialogContent>
  
                <DialogActions>
                  <Grid item>
                    {textval !== "" || multipost ? (
                      <Button
                        autoFocus
                        onClick={handleClose}
                        style={{
                          textTransform: "none",
                          border: "1px solid lightgrey",
                          borderRadius: "8vh",
                          backgroundColor: "blue",
                          color: "white",
                          width: "80px",
                          maxWidth: "20rem",
                        }}
                      >
                        Post
                      </Button>
                    ) : (
                      <Button
                        autoFocus
                        disabled
                        style={{
                          textTransform: "none",
                          border: "1px solid lightgrey",
                          borderRadius: "8vh",
                          backgroundColor: "#E8E8E8",
                          color: "gray",
                          width: "80px",
                          maxWidth: "20rem",
                        }}
                      >
                        Post
                      </Button>
                    )}
                  </Grid>
                </DialogActions>
              </BootstrapDialog>
            </Grid>
          </Grid>
  
          <Grid container sx={{ marginBottom: "10px", flexWrap: "initial" }}>
            <Grid item mx={11}>
              <Button
                style={{
                  color: "grey",
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                <PermMediaOutlinedIcon color="primary" />
                <span style={{ marginLeft: "5px" }}>Media</span>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {isdisplay && (
          <BootstrapDialogPost
            onClose={handleClosePost}
            open={openPost}
            fullWidth
            PaperProps={{
              style: {
                height: "100vh", // Set the height to 100% of the viewport height
                margin: 0, // Remove any margins
                padding: 0, // Remove any padding
              },
            }}
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              <Grid container display="flex">
                <Grid item my={1} mx={1}>
                  <span>Post</span>
                </Grid>
              </Grid>
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClosePost}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers sx={{ backgroundColor: "#ecffe5" }}>
              <Grid container display="flex" justifyContent="center">
                {image ? (
                  <>
                    <img
                      src={URL.createObjectURL(image)}
                      height="70%"
                      width="70%"
                      alt="hai"
                    ></img>
                  </>
                ) : (
                  <>
                    <img src={fileupload} height="70%" width="70%" alt="ans" />
                    <Grid
                      item
                      my={9}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      style={{ position: "relative" }}
                    >
                      <Button
                        style={{
                          borderRadius: "8vh",
                          color: "white",
                          backgroundColor: "blue",
                        }}
                        variant="outlined"
                      >
                        Upload from computer
                      </Button>
  
                      <input
                        type="file"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          opacity: 0,
                          width: "80%",
                          height: "90%",
                        }}
                        accept="image"
                        onChange={ImageUpload}
                        required
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Grid item>
                <Button
                  autoFocus
                  style={{
                    textTransform: "none",
                    border: "1px solid lightgrey",
                    borderRadius: "8vh",
                    backgroundColor: "blue",
                    color: "white",
                    width: "80px",
                    maxWidth: "20rem",
                  }}
                  onClick={() => {
                    setIsDisplay(false);
                    setImage(null);
                  }}
                >
                  Back
                </Button>
              </Grid>
              <Grid>
                {image ? (
                  <Button
                    autoFocus
                    onClick={() => {
                      setOpenPost(false);
                      setImage(null);
                      setMultiPost(image);
                    }}
                    style={{
                      textTransform: "none",
                      border: "1px solid lightgrey",
                      borderRadius: "8vh",
                      backgroundColor: "blue",
                      color: "white",
                      width: "80px",
                      maxWidth: "20rem",
                    }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    autoFocus
                    disabled
                    style={{
                      textTransform: "none",
                      border: "1px solid lightgrey",
                      borderRadius: "8vh",
                      backgroundColor: "#E8E8E8",
                      color: "gray",
                      width: "80px",
                      maxWidth: "20rem",
                    }}
                  >
                    Next
                  </Button>
                )}
              </Grid>
            </DialogActions>
          </BootstrapDialogPost>
        )}
        <Grid container sx={{ my: 1, alignItems: "center", mx: 1 }}>
          <hr style={{ flex: "1", backgroundColor: "light grey" }} />
          <span style={{ marginLeft: "1vw" }}>Sort by:</span>
          <Button
            variant="contained"
            style={{ backgroundColor: "transparent", boxShadow: "none" }}
            onClick={handleClickMenu}
          >
            <span
              style={{
                color: "black",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Top
            </span>
            <ArrowDropDownIcon
              style={{ color: "black", fontWeight: "bold" }}
            ></ArrowDropDownIcon>
          </Button>
          <Menu anchorEl={anchorElMenu} open={openMenu} onClose={handleCloseMenu}>
            <MenuItem onClick={handleClose}>Your Post</MenuItem>
          </Menu>
        </Grid>
      </>
    );
  };
  export default Home1;
  