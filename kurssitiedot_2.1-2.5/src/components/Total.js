import React from 'react'

const Total = props => {
   console.log(props)
    const array1=props.parts.parts;
    
    

    var total= array1.reduce((sum,order)=>sum+order.exercises,0)
    
    
    
  
    return <p>yhteensä {total} tehtävää </p>
  }
  

export default Total