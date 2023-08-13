const Header = ({ name }) => <h1>{name}</h1>

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Content = ({ parts }) => {
  const exercises = parts.map(part => part.exercises)
  const total = exercises.reduce((acc, curr) => acc + curr)
  
  return (
    <div>
      {parts.map(part =>
        <div key={part.id}>
          <Part
            name={part.name}
            exercises={part.exercises}
          />
        </div>
      )}
      <p><strong>total of {total} exercises</strong></p>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
        <Header name={course.name} />
        <Content parts={course.parts}/>
    </div>
  )
}

export default Course