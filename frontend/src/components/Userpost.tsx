import React, { useState, useEffect } from "react";
import { Grid, Avatar, Button, TextField, Dialog, DialogContent, DialogTitle, DialogActions } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const Userpost: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [check, setCheck] = useState(true);
  const [display, setDisplay] = useState(false);
  const [open, setOpen] = useState(false);
  const [textval, setTextval] = useState<string>('');
  const { email } = useParams<{ email: string }>();
  const [count, setCount] = useState(0);

  const ImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setCount(count + 1);
    }
    setCheck(false);
  };

  const [currentTime, setCurrentTime] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(12, 0, 0, 0);
    return tomorrow.toISOString().slice(0, -8);
  });

  useEffect(() => {
    setCurrentTime(() => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(12, 0, 0, 0);
      return tomorrow.toISOString().slice(0, -8);
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const textchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextval(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    setDisplay(true);
    setCount(0);

    const formData = new FormData();
    formData.append('caption', textval);
    formData.append('date', currentTime);
    formData.append('image', image || '');
    formData.append('email', email || '');

    try {
      const response = await axios.post("http://localhost:3001/event/app/v1/eventpost", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response);
      setImage(null);
      setCheck(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid>
      <Grid container sx={{ border: '1px solid black', borderRadius: '10px', width: '300px', height: '90px' }}>
        <Grid item display="flex" justifyContent="center" alignItems="center" sx={{ marginLeft: "20px" }}>
          <Avatar>
            {email?.charAt(0).toUpperCase()}
          </Avatar>
          <Button variant="outlined" onClick={handleClickOpen} style={{ marginLeft: '10px', width: "200px", color: "black", backgroundColor: "white" }}>
            <span style={{ marginRight: "70px" }}>Start Post</span>
          </Button>
          <form onSubmit={handleSubmit}>
            <Dialog onClose={handleClose} open={open}>
              <DialogTitle>
                <Grid container justifyContent="space-between">
                  <span style={{ color: "blue" }}>Create Post</span>
                  <Button variant="text" onClick={handleClose}>X</Button>
                </Grid>
              </DialogTitle>
              <DialogContent dividers>
                <Grid container flexDirection="column">
                  <Grid item display='flex' justifyContent="center" alignItems="center">
                    {image && <img src={URL.createObjectURL(image)} height="200%" width="45%" alt="hai"></img>}
                  </Grid>
                  <Grid item my={2} display='flex' justifyContent="center" alignItems="center" style={{ position: "relative" }}>
                    <Button variant="contained">+</Button>
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
                      accept="image/*"
                      onChange={ImageUpload}
                      required
                    />
                  </Grid>
                </Grid>
                <Grid item display="flex" justifyContent="center" alignItems="center">
                  <TextField
                    label="Select Date and Time"
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300,
                    }}
                    value={currentTime}
                    onChange={(e) => setCurrentTime(e.target.value)}
                  />
                </Grid>
                <Grid item display="flex" justifyContent="center" alignItems="center">
                  <TextField variant="standard" required placeholder="comment" style={{ marginLeft: '20px' }} multiline onChange={textchange}></TextField>
                </Grid>
              </DialogContent>
              <DialogActions>
                {textval !== '' && <Button type="submit" onClick={handleSubmit}>
                  Post
                </Button>}
              </DialogActions>
            </Dialog>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Userpost;
