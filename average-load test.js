import http from 'k6/http';
import { sleep } from 'k6';

// Define the base URL of your application
const BASE_URL = 'https://your-application.com';

// Define the test scenario
export const options = {
  stages: [
    // Ramp-up stage: gradually increase the number of VUs over time
    { duration: '1m', target: 50 }, // 50 virtual users over 1 minute
    { duration: '5m', target: 50 }, // Stay at 50 VUs for 5 minutes
    // Ramp-down stage: gradually decrease the number of VUs over time
    { duration: '1m', target: 0 }, // Scale down to 0 VUs over 1 minute
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
