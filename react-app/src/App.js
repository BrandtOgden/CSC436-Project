import React, { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from Flask API
    fetch('http://localhost:5000/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);  // Set the fetched data to state
        setLoading(false);  // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);  // Set loading to false in case of error
      });
  }, []);

  return (
    <div>
      <h1>Data from MySQL</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((row, index) => (
            <li key={index}>
              {/* Display data from each row */}
              {JSON.stringify(row)} 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;