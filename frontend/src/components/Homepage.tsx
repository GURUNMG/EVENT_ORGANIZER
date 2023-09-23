import {Grid} from "@mui/material";
import {Button} from '@mui/material';
import logo from '../image/logo.jpg'
import HomeIcon from '@mui/icons-material/Home';
import Person2Icon from '@mui/icons-material/Person2';
import Userpost from './Userpost'
import Postdisplay from './Postdisplay'

const Homepage=()=>{
    return(
        <Grid>
          <Grid container justifyContent="space-between" sx={{borderBottom:'2px solid blue',backgroundColor:"lightBlue", padding:'15px 5px',position:'sticky',top:'0px',zIndex:'1'}}>
         
            <Grid item display="flex" justifyContent="center" alignItems="center">
              <img src={logo} alt="asa" width="20%"></img>
              <span style={{color:"black",marginLeft:"30px"}}>CHATEASE</span>
            </Grid>     
            <Grid item display="flex" justifyContent="center" alignItems="center">
              <Button variant="outlined" size="small" style={{color:"black"}} ><HomeIcon></HomeIcon></Button>
              <Button variant="outlined" size="small" style={{color:"black",marginLeft:"30px"}}><Person2Icon></Person2Icon></Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" sx={{marginTop:'30px'}}>
           <Grid item>
            <Userpost/>
            {/* <Postdisplay/> */}

          </Grid> 
          </Grid>
        </Grid>
    )
}

export default Homepage;