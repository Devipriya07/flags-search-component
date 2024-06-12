// import axios from "axios";
import { useState, useEffect } from "react";
import { Box, AppBar, Toolbar } from "@mui/material"

const App = () => {
    const[countries, setCountries] = useState([])
    const[ searchCountry, setSearchCountry ] = useState("");

    const URL = "https://xcountries-backend.azurewebsites.net/all";
    

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
  
    useEffect(()=>{
        fetch(URL)
            .then((res) => res.json())
            .then((data) => setCountries(data))
            .catch((error) => console.error("Error in fetching data", error))
    },[])

    const filterCountries = countries.filter((country) => country.name.toLowerCase().includes(searchCountry.toLowerCase()))

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{background: "white", alignItems: "center" }}>
                    <Toolbar>
                        <input
                            type="text"
                            placeholder="Search for countries"
                            value={searchCountry}
                            onChange={(e) => setSearchCountry(e.target.value)}
                            inputprops={{ 'aria-label': 'search' }}
                            style={{ width: "60vw", padding: "10px", fontSize: "16px" }}
                        />
                    </Toolbar>
                </AppBar>
            </Box>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap:".8em",
                marginTop:"2em",

            }}>
                { filterCountries.length > 0 ? (
                    filterCountries.map((country ,index) => (
                        <div
                            key={index}
                            className="countryCard"
                            style={{
                              display:"flex",
                              flexDirection:"column",
                              justifyContent:"center",
                              alignItems:"center",
                              border: "1px solid black",
                              borderRadius: "8px",
                              height:"30vh",
                              width:"11em",
                              textAlign:"center"
                            }}
                        >
                            <img src={country.flag} alt={`Flag of ${country.name}`} key={index} style={{ width: "120px", height: "11vh",marginTop:"3%" }} />
                            <h2 style={{fontSize:"1.2em"}}>{country.name}</h2>
                        </div>  
                    ))  
                ) : (
                    <p>No countries found...</p>
                )    
                }
            </div>
        </>
   
    )
}
export default App;

//need to check missing testcase logic for why "ind" input gives 4 o/p instead of 3  
// import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// import './App.css';
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';

// function Countries() {
//   const [countries, setCountries] = useState([]);
//   const [loading, setLoading] = useState(true);
// const[searchQuery,setSearchQuery] =useState('');

//   // const fetchFlags = async () => {
//   //   const apiurl = "https://xcountries-backend.azurewebsites.net/all";
//   //   try {
//   //     let response = await axios.get(apiurl);
//   //     setCountries(response.data);
//   //   } catch (error) {
//   //     console.log("Error fetching data: ", error);
//   //     setLoading(false);
//   //   }
//   // };
//   // useEffect(() => {
//   //   fetchFlags();
//   // }, []);

//   const apiurl = "https://xcountries-backend.azurewebsites.net/all";
//   useEffect(() => {
//   fetch(apiurl).then((res) => res.json())
//   .then((data) => {setCountries(data); 
//                   setLoading(false); 
//                   })
//   .catch((error) => console.error("Error fetching data: ", error));
// }, []);

//   const filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(searchQuery.toLowerCase()));
//   const countriesToDisplay = searchQuery.trim() === "" ? countries : filteredCountries;
//   console.log("Filtered Countries:", countriesToDisplay);  //Log the filtered countries.
//   console.log(countriesToDisplay.length); //Log the length.
  
//   return (
//     <div className="App">
//       <div style={{backgroundColor: "rgb(245,245,245)", boxShadow:"2px 2px 5px"}}>
//       <input style={{display:"flex",
//         flexDirection:"row",
//         justifyContent:"center",
//         alignContent:"center",
//         margin:" 2em auto",
//         padding:"1 em",
//         width:"50vw",
//         height:"4vh"
//       }} type='text' placeholder='Search for countries...' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
//       </div>

//       { (loading && countriesToDisplay.length === 0 )  ? 
//       (<Box sx={{ display: 'flex',
//         flexDirection:'column',
//         justifyContent:"center",
//         alignItems:"center",
//         height:"90vh",
//         width:"100vw"
//        }}>
//       <CircularProgress/> <div>Loading...</div>
//       </Box>)  :  (countriesToDisplay.length > 0)  ? 
//       (<div className="flags-container countryCard"
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           alignItems: "center",
//           gap: "1em"
//         }} >
//         {countriesToDisplay.map((country, index) => (
          
//       <div className="country-flag-card countryCard" style={{
//                                                          border: "1px solid black", 
//                                                          borderRadius: "15px",
//                                                          height: "24vh",
//                                                          width:"9em" }}>
//           <img src={country.flag} alt={country.name} key={index} loading="lazy" style={{ width: "8vw", height: "14vh", marginTop: "3%" }}/>
//           <p>{country.name}</p>
//           </div>

//         ))}
//       </div>)  :  (<div style={{textAlign:"center"}}> <p>No countries found...</p>  </div>)}   
//     </div>
//   );
// };
// export default Countries;