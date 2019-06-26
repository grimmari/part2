import React from 'react'
import Part from './Part'



const Content = ( props) => {
   //console.log(props)
   //console.log(props.content)
 const rows=()=>props.content.parts.map(part=>
        <Part
        key={part.id}
        content={part.name}
        point={part.exercises}/>
      
        )

  
    return (
        <ul >{rows()}</ul>
    )
}
export default Content;