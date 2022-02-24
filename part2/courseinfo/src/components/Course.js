import React from "react";

/* This is the Course Component module and this module has 
all the subcomponents of the course in.
This is part of the 2.5: separate module exercise */
const Header = ({ courses }) => {
  return (
    <h1>{courses.name}</h1>
  )
}

const Total = ({ course }) => {
  /*  The sumOfPartsE and total sum are Higher-order functions.
  sumOfPartsE list the number of exercises in the course object array using the map method.
  totalSum use the sumOfPartsE for calculate the summatory of all elements.
  This is part of the 2.3*: Course information step8 exercise.
  Added some changes on the text adding the <strong> tags in the exercise 2.4: Course information step9. */
  const sumOfPartsE = course.parts.map( (element) => element = element.exercises )
  const totalSum = sumOfPartsE.reduce( (acc, sum) => acc + sum)

  return (
    <strong><p>Total number of exercises {totalSum}</p></strong>
  )
}

const Part = ({ coursesP }) => {
  const parts = coursesP.parts
  return (
    <>
      {parts.map((parts, i) =>
        <p key={i}>
          {parts.name} {parts.exercises}
        </p>
      )}
    </>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      <Part coursesP={course} />
    </div>
  )
}

const Course = ({ course }) => {
  /* In the return are the components calls and it's structure as the 2.1: Course information mentions.
  This is part of the 2.1: Course information step6.
  The Total of exercises was added as the 2.2: Course information step7 exercises mentions. 
  Were added new calls of Header, Content and Total for display the second course.
  This is part of the 2.4: Course information step9 exercise*/
  return (
    <>
      <h1>Web development courses</h1>
      <Header courses={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

/*This is the export of the Course Module.
It's part of the 2.5: separate module exercise */
export default Course