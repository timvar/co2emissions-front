import React, { Component } from 'react';
import Select from 'react-select';
import countries from '../config/Countries';
import axios from 'axios';
import Emissions from './Emissions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

/* Select country to show emission data. Optional 'per capita' checkbox to show emissions per capita */
class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      emissionData: [],
      populationData: [],
      perCapitaChecked: false
    };
  }
  
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });

    const emissionUrl = 'https://co2emissions-api.herokuapp.com/emissions/';
    const populationUrl = 'https://co2emissions-api.herokuapp.com/populations/';
    
    /* countryCode e.g. FIN, SWE, NOR,... */
    const countryCode = selectedOption.value;
    
    axios.get(emissionUrl + countryCode)
    .then( response => {
      console.log('emission data GET success');
      this.setState({ emissionData: response.data });
    })
    .catch( err => console.log('emission GET error: ', err));

    axios.get(populationUrl + countryCode)
    .then( response => {
      console.log('population data GET success');
      this.setState({ populationData: response.data });
    })
    .catch( err => console.log('population GET error: ', err));
  }

  handleChecked = () => {
    this.setState({perCapitaChecked: !this.state.perCapitaChecked});
  }
  
  render() {
    const { auth } = this.props
    
    /* If user not logged in, go back to Home page */
    if (!auth.uid) return <Redirect to='/' />
    
    return (
      <div className="container">
        <Select
          value={this.selectedOption}
          onChange={this.handleChange}
          options={countries}
        />
        <div className="form-group form-check">
          <input type="checkbox" className="per-capita-checkbox" id="per-capita-checkbox"  onChange={ this.handleChecked } />
          <label className="per-capita-check-label" htmlFor="per-capita-checkbox">Per Capita</label>
        </div>
        <Emissions
          perCapitaChecked={this.state.perCapitaChecked}
          emissions={this.state.emissionData}
          populations={this.state.populationData}
        />
      </div>
    )
  }
}

/* Map Redux state to props */
const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth,
  }
}

export default connect(mapStateToProps)(Show);

