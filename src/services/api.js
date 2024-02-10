// api.js

const BASE_URL = 'https://cityflyers.onrender.com/api'; // Your API base URL

// Function to fetch airports based on the search query
export const fetchAirports = async (searchQuery) => {
  try {
    const response = await fetch(`${BASE_URL}/airports/airportList?query=${searchQuery}`);
    if (response.ok) {
      const airportData = await response.json();
      return airportData;
    } else {
      throw new Error('Failed to fetch airport data');
    }
  } catch (error) {
    throw new Error(`Error fetching airport data: ${error.message}`);
  }
};

// Add more API functions as needed
export default fetchAirports