import React from 'react'
import Course from './Course'


const Courses = ({ courses }) => {
    console.log(courses)


    const rows = () => courses.map((course, i) =>
        <Course key={i} course={course} />
    )



    return (
        <ul >{rows()}</ul>
    )

}
export default Courses;