import React from 'react'



const Person = (props) => {
    const person=props.person
   
    
    return (
        <li key={person.id}>{person.name} {person.number} <button  onClick={() => props.handleDelete(person.id)}>delete!</button></li>
        
    )
}
export default Person;