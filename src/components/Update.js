import React, { Component } from 'react'
import CSVReader from "react-csv-reader";
import co2EmissionsHeader from '../config/Co2EmissionsHeader';
import axios from 'axios';

/* Data update form CSV files */
/* CSVReader component used   */
export default class Update extends Component {

  /* CSVReader data handler */
  handleEmissionUpdate = emissionData => {
    const emissionUrl = 'https://co2emissions-api.herokuapp.com/emissions/';
    
    emissionData.forEach(emissionArray => {
      let emissionDataArray = [];
      emissionArray.forEach((emissionItem, index) => {
        
        /* emission data starts in 5th position of CSV array */
        if (emissionItem && (index >= 4)) {
          const newEmissionData = {
            year: co2EmissionsHeader[index],
            co2emission: emissionItem
          }
        emissionDataArray.push(newEmissionData);
        }
      })

      let countryCode = emissionArray[1];
      
      axios.post( emissionUrl + countryCode, emissionDataArray )
          .then( () => console.log('success'))
          .catch(err => console.log('error: ', err));
    });
  }

  /* CSVReader data handler */
  handlePopulationUpdate = populationData => {
    const populationUrl = 'https://co2emissions-api.herokuapp.com/populations/';
    

    populationData.forEach(populationArray => {
      let populationDataArray = [];
      populationArray.forEach((populationItem, index) => {
        
        /* population data starts in 5th position of CSV array */
        if (populationItem && (index >= 4)) {
          const newPopulationData = {
            year: co2EmissionsHeader[index],
            population: populationItem
          }
        populationDataArray.push(newPopulationData);
        }
      })

      let countryCode = populationArray[1];
      console.log(populationDataArray);
      axios.post( populationUrl + countryCode, populationDataArray )
          .then( () => {
            console.log('success');
          })
          .catch(err => console.log('error: ', err));
    });
  }
  
  render() {
    
    return (
      <div className="container">
        <div className="emission-csv-download">
          <h5>Choose Emission CSV file to download</h5>
        </div>
        <CSVReader
          cssClass="react-csv-input"
          label=""
          onFileLoaded={this.handleEmissionUpdate}
        />
        <div className="population-csv-download">
          <h5>Choose Population CSV file to download</h5>
        </div>
        <CSVReader
          cssClass="react-csv-input"
          label=""
          onFileLoaded={this.handlePopulationUpdate}
        />
      </div>
    )
  }
}



  

