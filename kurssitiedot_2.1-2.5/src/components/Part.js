import React from 'react'


const Part = (props) => {
    
    const  note  = props
    
    return (

        <li>{note.content}  {note.point}</li>

    )
}
export default Part;