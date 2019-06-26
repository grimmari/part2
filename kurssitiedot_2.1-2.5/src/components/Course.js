import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ course }) => {
console.log(course)



    return (
        <>
            <Header header={course.name} />
            <Content content={course} />
            <Total parts={course}/>
            
            
            
        </>
    )
}
export default Course;
//<Total parts={course.parts.exercises} />