import React from 'react';
import ReactDOM from 'react-dom';
import Course from "./components/Course";

/* This is the import of the Course component of the component folder as a module.
   This is part of the 2.5: separate module exercise */

/* Here is the call of the Course Component that renders the course information
  This is part of the 2.1: Course information step6*/

/* The courses array was added in the 2.4: Course information step9 exercise.
  The array has a new course information object.
  This is part of the 2.4: Course information step9 exercise. */

  const App = () => {
    const courses = [
      {
        name: 'Half Stack application development',
        id: 1,
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
          },
          {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
          },
          {
            name: 'State of a component',
            exercises: 14,
            id: 3
          },
          {
            name: 'Redux',
            exercises: 11,
            id: 4
          }
        ]
      }, 
      {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]
  
    return (
      <div>
        {/* Was added other call to the Course Component. 
        Both calls of the components receive the courses array 
        as props with the number of the place of the object that contain the  information of the course.
        This is part of the 2.4: Course information step9 exercise*/}
        <Course course={courses[0]}/>
        <Course course={courses[1]}/>
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))