import React from 'react'





const CountryDetail = ({ country }) => {
    console.log(country[0])
    var detail = country[0]
    console.log(detail)
    const languagesList = detail.languages
    
    var languages=languagesList.map((language,key)=>
        <li key={key}>{language.name}</li>
    )
    
   
  
        
    
    return (
        <div>

            <h1>{detail.name}</h1>

            <li>capital {detail.capital}</li>
            <li>population {detail.population}</li>
            <h2>Languages</h2>
            <ul>{languages}</ul>
            <img src={detail.flag} alt={detail.name} />


        </div>
    )
}
export default CountryDetail;

