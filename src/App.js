import React, { useEffect, useState } from 'react';
import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData, prettyPrintStat  } from './utils';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";



function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide')

  const [countryInfo, setCountryInfo] = useState({});

  const [tableData, setTableData] = useState([]);

  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796  });
  const [mapZoom, setMapZoom] = useState(3);

  const [mapCountries, setMapCountries] = useState([]);

  const [casesType, setCasesType] = useState("cases");



  // https://disease.sh/v3/covid-19/countries

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch ('https://disease.sh/v3/covid-19/countries')
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2
        }))

        const sortedData = sortData(data);
        setTableData(sortedData);
        console.log('Data is', data)

        setMapCountries(data);

        setCountries(countries);
      })
    } 
    getCountriesData();
  }, [])

  const onCountryChange = async (e) => {

    const countryCode = e.target.value;
    

    const url = countryCode === "worldwide" ? ' https://disease.sh/v3/covid-19/all' : ` https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      })
    
  }

  console.log('country info', countryInfo);

  return (
    <div className="app">
      
      <div className='app__left'>
        {/* Header- Title + select input dropdown */}

      <div className='app__header'>

      <h1>COVID-19 TRACKER</h1>

      <FormControl className='app__dropdown'>
       <Select
        variant='outlined'
        value={country}
        onChange={onCountryChange}>
          <MenuItem value='worldwide'>Worldwide</MenuItem>
           {/* Loop through all countries in list */}
           {countries.map((country) => (
             <MenuItem value={country.value}>
               {country.name}
              </MenuItem>
           ))}
        </Select>
        </FormControl>

      </div>

      <div className='app__stats'>
        {/* InfoBox title='coronavirus Casses */}
        <InfoBox 
        isRed
        onClick={e => setCasesType('cases')}
        title='Coronavirus Casses'
        active={casesType === "cases"}
        casses={prettyPrintStat (countryInfo.todayCases)}
        total={prettyPrintStat (countryInfo.cases)}/>
        {/* InfoBox title='coronavirus Recovered */}
        <InfoBox
        onClick={e => setCasesType('recovered')}
          title='Recovered' 
          active={casesType === "recovered"}
          casses={prettyPrintStat (countryInfo.todayRecovered)}
          total={prettyPrintStat (countryInfo.recovered)}/>

          {/* InfoBox title='coronavirus Deads */}
          <InfoBox
          isRed
          onClick={e => setCasesType('deaths')}
          title='Deaths'
          active={casesType === "deaths"}
          casses={prettyPrintStat (countryInfo.todayDeaths)}
          total={prettyPrintStat (countryInfo.deaths)} />
        </div>

            {/* Map */}

            <Map
            casesType = {casesType}
            center = {mapCenter} 
            zoom = {mapZoom}
            countries={mapCountries}
            />

      </div>

      <Card className='app__right'>
        <CardContent>
         
          <h3>Live Casses by Country</h3>
          {/* Table */}
            <Table countries={tableData} />
           <h3 className='app__graphTitle'>Worldwide new casses {casesType}</h3>
          {/* Graph */}
            <LineGraph 
            className='app__graph'
               casesType={casesType}/>
        
     
        </CardContent>
         </Card>
    </div>
  );
}

export default App;
