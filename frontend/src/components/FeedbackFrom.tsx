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
  TextField,
} from '@mui/material';

interface FeedbackEntry {
  email: string;
  informationGathered: number;
  expectation: number;
  timeManagement: number;
  overallRating: number;
  suggestion: string;
}

interface FormData {
  postId: string;
  feedbackEntries: FeedbackEntry;
}

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    postId: '',
    feedbackEntries: {
      email: '',
      informationGathered: 0,
      expectation: 0,
      timeManagement: 0,
      overallRating: 0,
      suggestion: '',
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send POST request to the server with feedback data
      await axios.post('/api/feedback', formData);
      console.log('Feedback data submitted successfully.');
      // Clear the form data if needed
      setFormData({
        postId: '',
        feedbackEntries: {
          email: '',
          informationGathered: 0,
          expectation: 0,
          timeManagement: 0,
          overallRating: 0,
          suggestion: '',
        },
      });
    } catch (error) {
      console.error('Error submitting feedback data:', error);
    }
  };

  const numericValues = [1, 2, 3, 4, 5];

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
            <TextField
              label="Suggestion"
              type="text"
              fullWidth
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
    </Grid>
  );
};

export default FeedbackForm;
