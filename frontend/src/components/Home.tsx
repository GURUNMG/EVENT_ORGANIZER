import { Grid, Button } from "@mui/material";
import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import Person2Icon from "@mui/icons-material/Person2";
import Userpost from "./Userpost";
import Postdisplay from "./Postdisplay";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
const Home = () => {
  const [isHoveredHome, setIsHoveredHome] = useState<boolean>(false);
  const [IsHoveredProfile, setIsHoveredProfile] = useState<boolean>(false);
  const handleMouseEnter = () => {
    setIsHoveredHome(true);
  };
  const handleMouseLeave = () => {
    setIsHoveredHome(false);
  };
  const handleMouseEnterProfile = () => {
    setIsHoveredProfile(true);
  };
  const handleMouseLeaveProfile = () => {
    setIsHoveredProfile(false);
  };
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    border: "2px solid black",
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  return (
    <div
      style={{
        backgroundColor: "#F0F0F0",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Grid
        container
        alignItems="center"
        sx={{
          backgroundColor: "white",
          padding: "8px 3px",
          position: "sticky",
          top: "0px",
          zIndex: "1",
        }}
      >
        <Grid
          item
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ marginLeft: "4%" }}
        >
          <img
            src={require(`../image/chatease.png`)}
            height="55"
            width="55"
            alt="asa"
            style={{ marginLeft: "2%", fontSize: "20px" }}
          ></img>
        </Grid>
        <Grid
          item
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ marginLeft: "1%" }}
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Grid>
        <Grid
          item
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ marginLeft: "auto" }}
        >
          <Button
            variant="outlined"
            size="large"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              color: isHoveredHome ? "black" : "gray",
              border: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "transparent",
              boxShadow: "none",
              flex: "0 0 auto",
            }}
          >
            <HomeIcon
              style={{ fontSize: "35px", marginBottom: "5%" }}
            ></HomeIcon>
            <span style={{ textTransform: "none" }}>Home</span>
          </Button>
          <Button
            variant="outlined"
            size="large"
            onMouseEnter={handleMouseEnterProfile}
            onMouseLeave={handleMouseLeaveProfile}
            style={{
              color: IsHoveredProfile ? "black" : "gray",
              border: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "transparent",
              boxShadow: "none",
              flex: "0 0 auto", //flex grow,flex shrink,flex basics
            }}
          >
            <Person2Icon
              style={{ fontSize: "35px", marginBottom: "5%" }}
            ></Person2Icon>
            <span style={{ textTransform: "none" }}>Profile</span>
          </Button>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" sx={{ marginTop: "30px" }}>
        <Grid item>
          {/* <Userpost /> */}
          <Postdisplay />
        </Grid>
      </Grid>
    </div>
  );
};
export default Home;