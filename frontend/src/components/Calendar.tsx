import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Define a custom theme for the card outline
const cardTheme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          width: '350px', // Set the width
          height: '350px', // Set the height
          border: '1px solid #ccc', // Customize the border color
          borderRadius: '8px', // Customize the border radius
        },
      },
    },
  },
});

export default function DateCalendarValue() {
  const [value, setValue] = useState<Dayjs | null>(dayjs());

  return (
    <ThemeProvider theme={cardTheme}>
      <Card>
        <CardContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateCalendar', 'DateCalendar']}>
              <DemoItem label="Controlled calendar">
                <DateCalendar
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                  defaultCalendarMonth={dayjs()}
                //   sx={{ width: '100%', height: '100%' }} // Ensure the calendar takes up the entire card
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
