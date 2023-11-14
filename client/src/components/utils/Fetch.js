const BASE_URL = `https://api.themoviedb.org/3`
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzkwNDI4OGViOThiNDIwMThiZTdhNGQ1ODdlOTNiMCIsInN1YiI6IjY1MWVmODNiM2QzNTU3MDBmZjYxZmJhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mWHz8jD5yZgI5V83L3l_gsh-xiXdYVpTYePFFZBZayk'
    }
  };


  export const fetchFromAPI = async (url) => {
    try {
      const response = await fetch(`${BASE_URL}/${url}`, options);
      const data = await response.json(); 
      return data;
    } catch (err) {
      console.error('error:' + err); 
    }
  };
  