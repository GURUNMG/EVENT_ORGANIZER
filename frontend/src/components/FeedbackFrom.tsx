import React, { useState } from 'react';
import axios from 'axios';
import {
  Grid,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Checkbox,
  Typography,
  Button,
  Snackbar,
  Alert,
  TextField,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

interface FeedbackEntry {
  email: string | undefined;
  informationGathered: number;
  expectation: number;
  timeManagement: number;
  overallRating: number;
  suggestion: string; // Placeholder for an additional field
}

interface FormData {
  feedbackEntries: FeedbackEntry;
}

const FeedbackForm: React.FC = () => {
  const { postId, email } = useParams<{ postId: string; email: string }>();
  const [formData, setFormData] = useState<FormData>({
    feedbackEntries: {
      email: email,
      informationGathered: 0,
      expectation: 0,
      timeManagement: 0,
      overallRating: 0,
      suggestion: '', // Initialize the additional field
    },
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      formData.feedbackEntries.informationGathered === 0 ||
      formData.feedbackEntries.expectation === 0 ||
      formData.feedbackEntries.timeManagement === 0 ||
      formData.feedbackEntries.overallRating === 0
    ) {
      // Show an error message (you can customize this part)
      setSnackbarSeverity('error');
      setSnackbarMessage('Please select a value for each category.');
      setOpenSnackbar(true);
      return;
    }

    try {
      // Send POST request to the server with feedback data
      await axios.post(`http://localhost:3001/event/app/v1/feedback/store/${email}/${postId}`, formData);
      console.log('Feedback data submitted successfully.');
      console.log(formData);
      // Clear the form data if needed
      setFormData({
        feedbackEntries: {
          email: email,
          informationGathered: 0,
          expectation: 0,
          timeManagement: 0,
          overallRating: 0,
          suggestion: '', // Reset the additional field
        },
      });

      // Show success message
      setSnackbarSeverity('success');
      setSnackbarMessage('Feedback saved successfully');
      setOpenSnackbar(true);

      // Redirect to the desired page after a delay (adjust the time as needed)
      setTimeout(() => {
        navigate(`/event/app/v1/homepage/${email}`);
      }, 2000);
    } catch (error) {
      console.error('Error submitting feedback data:', error);

      // Show error message
      setSnackbarSeverity('error');
      setSnackbarMessage('Error submitting feedback');
      setOpenSnackbar(true);
    }
  };

  const numericValues = [1, 2, 3, 4, 5];

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Card style={{ background: '#f0f0f0' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Feedback Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <div>
              <FormControl component="fieldset">
                <FormLabel component="legend">Information Gathered</FormLabel>
                <div style={{ display: 'flex' }}>
                  {numericValues.map((value) => (
                    <FormControlLabel
                      key={value}
                      control={
                        <Checkbox
                          checked={formData.feedbackEntries.informationGathered === value}
                          onChange={() =>
                            setFormData({
                              ...formData,
                              feedbackEntries: {
                                ...formData.feedbackEntries,
                                informationGathered: value,
                              },
                            })
                          }
                        />
                      }
                      label={value.toString()}
                    />
                  ))}
                </div>
              </FormControl>
            </div>
            {/* Repeat similar structure for other numeric fields */}
            <div>
              <FormControl component="fieldset">
                <FormLabel component="legend">Expectation</FormLabel>
                <div style={{ display: 'flex' }}>
                  {numericValues.map((value) => (
                    <FormControlLabel
                      key={value}
                      control={
                        <Checkbox
                          checked={formData.feedbackEntries.expectation === value}
                          onChange={() =>
                            setFormData({
                              ...formData,
                              feedbackEntries: {
                                ...formData.feedbackEntries,
                                expectation: value,
                              },
                            })
                          }
                        />
                      }
                      label={value.toString()}
                    />
                  ))}
                </div>
              </FormControl>
            </div>
            {/* Repeat similar structure for other numeric fields */}
            <div>
              <FormControl component="fieldset">
                <FormLabel component="legend">Time Management</FormLabel>
                <div style={{ display: 'flex' }}>
                  {numericValues.map((value) => (
                    <FormControlLabel
                      key={value}
                      control={
                        <Checkbox
                          checked={formData.feedbackEntries.timeManagement === value}
                          onChange={() =>
                            setFormData({
                              ...formData,
                              feedbackEntries: {
                                ...formData.feedbackEntries,
                                timeManagement: value,
                              },
                            })
                          }
                        />
                      }
                      label={value.toString()}
                    />
                  ))}
                </div>
              </FormControl>
            </div>
            {/* Repeat similar structure for other numeric fields */}
            <div>
              <FormControl component="fieldset">
                <FormLabel component="legend">Overall Rating</FormLabel>
                <div style={{ display: 'flex' }}>
                  {numericValues.map((value) => (
                    <FormControlLabel
                      key={value}
                      control={
                        <Checkbox
                          checked={formData.feedbackEntries.overallRating === value}
                          onChange={() =>
                            setFormData({
                              ...formData,
                              feedbackEntries: {
                                ...formData.feedbackEntries,
                                overallRating: value,
                              },
                            })
                          }
                        />
                      }
                      label={value.toString()}
                    />
                  ))}
                </div>
              </FormControl>
            </div>
            {/* Additional text field (you can add more fields as needed) */}
            <TextField
              label="Suggestions"
              type="text"
              fullWidth
              required
              multiline
              rows={4}
              value={formData.feedbackEntries.suggestion}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  feedbackEntries: { ...formData.feedbackEntries, suggestion: e.target.value },
                })
              }
              style={{ marginTop: '16px' }}
            />
            <Button type="submit" variant="contained" fullWidth style={{ marginTop: '16px' }}>
              Submit Feedback
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Snackbar for displaying messages */}
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default FeedbackForm;
