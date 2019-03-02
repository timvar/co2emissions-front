import React, { Component } from 'react'
import CSVReader from "react-csv-reader";
import co2EmissionsHeader from '../config/Co2EmissionsHeader';
import axios from 'axios';


export default class Update extends Component {

  constructor(props) {
    super(props);
    this.state = { emissionDataArray: [] }
  }

  
  handleForce = data => {
    const url = 'https://co2emissions-api.herokuapp.com/emissions/'
    
    data.forEach(elementArray => {
      elementArray.forEach((item, index) => {
        console.log('index: ', index);
        console.log('header: ', co2EmissionsHeader[index]);
        console.log('item: ', item);
        
        if (item && (index >= 4)) {
          const emissionData = {
            year: co2EmissionsHeader[index],
            co2emission: item
          }

          this.setState({ 
            emissionDataArray: [...this.state.emissionDataArray, emissionData] 
          });
        }
      })

      let countryCode = elementArray[1];
      let apiEndPoint = url + countryCode;

      axios.post( apiEndPoint, this.state.emissionDataArray )
          .then( () => console.log('success'))
          .catch(err => console.log('error: ', err));

      console.log(this.state.emissionDataArray);
        this.setState({ 
          emissionDataArray: [] 
        });

    });
  };

  render() {
    
    return (
      <div className="container">
        <div>
          <h5>Choose CSV file to download</h5>
        </div>
        <CSVReader
          cssClass="react-csv-input"
          label=""
          onFileLoaded={this.handleForce}
        />
      </div>
    )
  }
}



  

