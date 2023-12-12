const Header = ({name}) => {
    return (
      <div>
        <h1>{name}</h1>
      </div>
    )
  }
  
  const Content = ({course}) => {
    return (
      <div>
        {course.parts.map(part =>  <Part key={part.id} part={part}/> )}
      </div>
    )
  }
  
  const Total = ({course}) => {
    let initialValue = 0
    const sum = course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, initialValue)
    return (
      <div>
         <p>total of {sum} exercises</p>
      </div>
    )
  }
  
  const Part = ({part}) => {
    return (
      <div>
        <p>
          {part.name} {part.exercises}
        </p>
      </div>
    )
  }
  
  const Courses = ({courses}) => {
    return (
      courses.map(course => (
        <div key={course.id}>
      <Header name={course.name}/>
      <Content course={course} />
      <Total course={course} />
      </div>
      ))
    )
  }

  
export default Courses