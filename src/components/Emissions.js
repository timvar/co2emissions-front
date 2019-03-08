import React from 'react';

/* Shows total emissions per year or emissions per capita */
const Emissions = (props) => {
  const { emissions, populations, perCapitaChecked } = props;
  let emissionData = '';
  
  /* show data if not empty */
  if ( emissions.length && populations.length ) {

    /* total emission or emission per capita */
    emissionData = perCapitaChecked ? (
      emissions.map((emission, index) => {
        let populationData = populations.find(population => {
          return population.year === emission.year;
        })
        console.log('Year / CO2emission / Population', populationData.year + ' / ' + emission.co2emission + ' / ' + populationData.population);
        return <li key={index}><span className="year">{populationData.year}:</span><span className="emission">{Math.round(emission.co2emission / populationData.population * 1000000)/1000000}</span></li>
      })

    ) : (
      emissions.map((emission, index) => {
      console.log('Year / CO2emission', emission.year + ' / ' + emission.co2emission);
      return <li key={index}><span className="year">{emission.year}:</span><span className="emission">{emission.co2emission}</span></li>
    })
    );
  } else {
    emissionData = <li>Nothing to show</li>
    }
  
  return (
    <div className="row">
      <div className="col"></div>
      <div className="col">
        <ul className="nonbulleted">
          {emissionData} 
        </ul>
      </div>
      <div className="col"></div>     
    </div>
  );
};

export default Emissions;