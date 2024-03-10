/* eslint-disable react/prop-types */
const Course = ({ courses }) => {
  console.log(courses);
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header text={course.name} />
          <Content parts={course.parts} />
        </div>
      ))}
    </div>
  );
};

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <Total parts={parts} />
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  );
};

export default Course;
