import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Chart, { CategoryScale } from 'chart.js/auto';

Chart.register(CategoryScale);

interface FeedbackEntry {
  email: string;
  informationGathered: number;
  expectation: number;
  timeManagement: number;
  overallRating: number;
}

interface FeedbackData {
  postId: string;
  feedbackEntries: FeedbackEntry[];
}

const OverallFeedbackChart: React.FC = () => {
  const [feedbackData, setFeedbackData] = useState<FeedbackEntry[]>([]);
  const { postId } = useParams<{ postId: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<FeedbackData>(`http://localhost:3001/event/app/v1/allfeedback/get/${postId}`);
        setFeedbackData(response.data.feedbackEntries);
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    };

    fetchData();
  }, [postId]);

  // Calculate averages for each feedback category
  const averageInformationGathered = feedbackData.reduce((sum, entry) => sum + entry.informationGathered, 0) / feedbackData.length;
  const averageExpectation = feedbackData.reduce((sum, entry) => sum + entry.expectation, 0) / feedbackData.length;
  const averageTimeManagement = feedbackData.reduce((sum, entry) => sum + entry.timeManagement, 0) / feedbackData.length;
  const averageOverallRating = feedbackData.reduce((sum, entry) => sum + entry.overallRating, 0) / feedbackData.length;

  const chartData = {
    labels: ['Average Feedback'],
    datasets: [
      {
        label: 'Information Gathered',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [averageInformationGathered],
      },
      {
        label: 'Expectation',
        backgroundColor: 'rgba(255,99,132,0.4)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.6)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [averageExpectation],
      },
      {
        label: 'Time Management',
        backgroundColor: 'rgba(255,206,86,0.4)',
        borderColor: 'rgba(255,206,86,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,206,86,0.6)',
        hoverBorderColor: 'rgba(255,206,86,1)',
        data: [averageTimeManagement],
      },
      {
        label: 'Overall Rating',
        backgroundColor: 'rgba(54,162,235,0.4)',
        borderColor: 'rgba(54,162,235,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54,162,235,0.6)',
        hoverBorderColor: 'rgba(54,162,235,1)',
        data: [averageOverallRating],
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: true,
    scales: {
      y: {
        ticks: {
          stepSize: 1, // Set the step size to 1 unit
        },
      },
    },
  };
  return (
    <div>
      <Bar
        data={chartData}
        width={100}
        height={50}
        options={chartOptions}
      />
    </div>
  );
};

export default OverallFeedbackChart;
