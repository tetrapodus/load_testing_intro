import http from 'k6/http';
import { sleep } from 'k6';

// Define the base URL of your application
const BASE_URL = 'https://your-application.com';

// Define the test scenario
export const options = {
  stages: [
    // Ramp-up stage: gradually increase the number of VUs over time
    { duration: '2m', target: 50 }, // 50 virtual users over 2 minutes
    { duration: '5m', target: 100 }, // 100 VUs over 5 minutes
    { duration: '2m', target: 200 }, // 200 VUs over 2 minutes
    // Peak load stage: maintain maximum VUs for a duration
    { duration: '10m', target: 200 }, // 200 VUs for 10 minutes
    // Ramp-down stage: gradually decrease the number of VUs over time
    { duration: '3m', target: 0 }, // Scale down to 0 VUs over 3 minutes
  ],
};

// Define the test function
export default function () {
  // Simulate user interactions by making HTTP requests
  const response = http.get(`${BASE_URL}/homepage`);
  // Check if the response is successful
  if (response.status !== 200) {
    console.error(`Failed to load homepage: ${response.status}`);
  }
  // Add more requests for other key functionalities as needed

  // Sleep for a short duration between requests
  sleep(1);
}
