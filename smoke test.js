import http from 'k6/http';
import { sleep } from 'k6';

// Define the base URL of your application
const BASE_URL = 'https://your-application.com';

// Define the test scenarios
const scenarios = {
  smokeTest: {
    executor: 'constant-arrival-rate',
    rate: 5, // Number of VUs per second
    duration: '1m', // Duration of the test
    preAllocatedVUs: 5, // Number of VUs to pre-allocate
    exec: 'smokeTestScenario',
  },
};

// Define the smoke test scenario
export function smokeTestScenario() {
  // Make HTTP requests to simulate user interactions
  const response = http.get(`${BASE_URL}/login`);
  // Check if the response is successful
  if (response.status !== 200) {
    console.error(`Failed to load login page: ${response.status}`);
  }
  // Add more requests for other key functionalities as needed

  // Sleep for a short duration between requests
  sleep(1);
}

// Export the test scenarios
export default scenarios;
