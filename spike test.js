import http from 'k6/http';
import { sleep } from 'k6';

// Define the base URL of your application
const BASE_URL = 'https://your-application.com';

// Define the test scenario
export const options = {
  stages: [
    // Ramp-up stage: gradually increase the number of VUs over time
    { duration: '1m', target: 10 }, // 10 virtual users over 1 minute
    // Spike stage: increase to extremely high loads in a short time
    { duration: '1m', target: 200 }, // 200 VUs over 1 minute
    // Ramp-down stage: decrease the number of VUs back to baseline
    { duration: '1m', target: 10 }, // 10 VUs over 1 minute
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
