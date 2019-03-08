import React, { Component } from 'react'
import CSVReader from "react-csv-reader";
import co2EmissionsHeader from '../config/Co2EmissionsHeader';
import axios from 'axios';

/* Data update form CSV files */
/* CSVReader component used   */
export default class Update extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      emissionDataArray: [],
      populationDataArray: [] 
    }
  }
  
  /* CSVReader data handler */
  handleEmissionUpdate = emissionData => {
    const emissionUrl = 'https://co2emissions-api.herokuapp.com/emissions/';
    
    emissionData.forEach(emissionArray => {
      emissionArray.forEach((emission, index) => {
        
        /* emission data starts in 5th position of CSV array */
        if (emission && (index >= 4)) {
          const newEmissionData = {
            year: co2EmissionsHeader[index],
            co2emission: emission
          }

          this.setState({ 
            emissionDataArray: [...this.state.emissionDataArray, newEmissionData] 
          });
        }
      })

      let countryCode = emissionArray[1];
      
      axios.post( emissionUrl + countryCode, this.state.emissionDataArray )
          .then( () => console.log('success'))
          .catch(err => console.log('error: ', err));

      this.setState({ 
        emissionDataArray: [] 
      });
    });
  }

  /* CSVReader data handler */
  handlePopulationUpdate = populationData => {
    const populationUrl = 'https://co2emissions-api.herokuapp.com/populations/';
    
    populationData.forEach(populationArray => {
      populationArray.forEach((population, index) => {
        
        /* population data starts in 5th position of CSV array */
        if (population && (index >= 4)) {
          const newPopulationData = {
            year: co2EmissionsHeader[index],
            population: population
          }

          this.setState({ 
            populationDataArray: [...this.state.populationDataArray, newPopulationData] 
          });
        }
      })

      let countryCode = populationArray[1];
      
      axios.post( populationUrl + countryCode, this.state.populationDataArray )
          .then( () => console.log('success'))
          .catch(err => console.log('error: ', err));

      this.setState({ 
        populationDataArray: [] 
      });
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



  

