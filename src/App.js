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