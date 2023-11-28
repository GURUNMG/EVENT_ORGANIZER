import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import axios from 'axios';
import {  useNavigate, useParams } from 'react-router-dom';
import About from './About';

interface ProfilePageProps {
  // Add any necessary props or authentication information here
}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [userChoices, setUserChoices] = useState<string[]>([]);

  // Placeholder user data
  const userName = 'John Doe';
  const userEmail = 'john.doe@example.com';

  // Placeholder event and feedback counts
  const eventsRegistered = 5;
  const feedbackSubmitted = 10;
  const { email } = useParams<{ email: string }>();

  useEffect(() => {
    // Make an Axios GET request when the component mounts
    axios.get(`http://localhost:3000/event/app/v1/userchoice/${email}`)
      .then(response => {
        setUserChoices(response.data);
      })
      .catch(error => {
        console.error('Error fetching user choices:', error);
      });
  }, []);

  const handlePasswordUpdate = () => {
    // Check if all fields are filled before attempting an update
    if (currentPassword.trim() === '' || newPassword.trim() === '' || confirmPassword.trim() === '') {
      console.log('Please fill in all fields.');
      return;
    }

    // Implement password update logic here
    // Make API call to update password
    if (passwordsMatch) {
      console.log('Updating password...');
    } else {
      console.log('Passwords do not match');
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setPasswordsMatch(value === newPassword);
  };

  const navigate = useNavigate();

  const navigateToHomePage = () => {
    navigate(`/event/app/v1/homepage/${email}`)
  };

  const navigateToRegisterPage = () => {
   navigate('/event/app/v1/')
  };

  return (
    <Grid container justifyContent="center" spacing={2} mt={isMobile ? 2 : 4}>

              {/* Go to Register Page button above User Profile card */}
      <Grid item xs={12} md={8} lg={6}>
        <Card style={{ backgroundColor: '#f0f0f0' }}>
          <CardContent>
            <Button
              variant="contained"
              color="secondary"
              onClick={navigateToRegisterPage}
              style={{ marginBottom: '8px' }}
            >
              LOGOUT
            </Button>
            <Typography variant="h5" gutterBottom>
              User Profile
            </Typography>
            <Typography variant="subtitle1">Username: {userName}</Typography>
            <Typography variant="subtitle1">Email: {userEmail}</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Go to Home Page button above Statistics card */}
      <Grid item xs={12} md={8} lg={6}>
        <Card style={{ backgroundColor: '#f0f0f0' }}>
          <CardContent>
            <Button
              variant="contained"
              color="primary"
              onClick={navigateToHomePage}
              style={{ marginBottom: '8px' }}
            >
               Home Page
            </Button>
            <Typography variant="h5" gutterBottom>
              Statistics
            </Typography>
            <Typography variant="subtitle1">
              Events Registered: {userChoices.length}
            </Typography>
            <Typography variant="subtitle1">
              Feedbacks Submitted: {feedbackSubmitted}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Update Password card */}
      <Grid item xs={12} md={8} lg={6}>
        <Card style={{ backgroundColor: '#f0f0f0' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Update Password
            </Typography>
            <TextField
              required
              label="Current Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <TextField
              label="New Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handlePasswordUpdate}
              disabled={!passwordsMatch}
            >
              Update Password
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <About></About>
    </Grid>
  );
};

export default ProfilePage;
