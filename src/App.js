import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import './App.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CountryCard = ({ name, flagImg, flagAltTxt }) => {
  return (
    <div className="country-flag-card countryCard" 
          style={{
            border: "1px solid black", 
            borderRadius: "15px",
            height: "24vh",
            width:"9em"
          }}>
      <img src={flagImg} alt={flagAltTxt} loading="lazy" style={{ width: "8vw", height: "14vh", marginTop: "3%" }}/>
      <p>{name}</p>
    </div>
  );
};

function Countries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
const[searchQuery,setSearchQuery] =useState('');

  // const fetchFlags = async () => {
  //   const apiurl = "https://xcountries-backend.azurewebsites.net/all";
  //   try {
  //     let response = await axios.get(apiurl);
  //     setCountries(response.data);
  //   } catch (error) {
  //     console.log("Error fetching data: ", error);
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchFlags();
  // }, []);

  const apiurl = "https://xcountries-backend.azurewebsites.net/all";
  useEffect(() => {
  fetch(apiurl).then((res) => res.json())
  .then((data) => {setCountries(data); 
                  setLoading(false); 
                  })
  .catch((error) => console.error("Error fetching data: ", error));
}, []);

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const countriesToDisplay = searchQuery.trim() === "" ? countries : filteredCountries;
  console.log("Filtered Countries:", countriesToDisplay);  //Log the filtered countries.
  console.log(countriesToDisplay.length); //Log the length.
  
  return (
    <div className="App">
      <div style={{backgroundColor: "rgb(245,245,245)", boxShadow:"2px 2px 5px"}}>
      <input style={{display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignContent:"center",
        margin:" 2em auto",
        padding:"1 em",
        width:"50vw",
        height:"4vh"
      }} type='text' placeholder='Search for countries...' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
      </div>

      { (loading && countriesToDisplay.length === 0 )  ? 
      (<Box sx={{ display: 'flex',
        flexDirection:'column',
        justifyContent:"center",
        alignItems:"center",
        height:"90vh",
        width:"100vw"
       }}>
      <CircularProgress/> <div>Loading...</div>
      </Box>)  :  (countriesToDisplay.length > 0)  ? 
      (<div className="flags-container countryCard"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "1em"
        }} >
        {countriesToDisplay.map((country, index) => (
          <CountryCard 
            key={index} 
            name={country.name} 
            flagAltTxt={country.name} 
            flagImg={country.flag} 
          />
        ))}
      </div>)  :  (<div style={{textAlign:"center"}}> <p>No countries found...</p>  </div>)}   
    </div>
  );
};
export default Countries;