import { CoursePart } from '../types'

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  )
}

const Part = ({ part }: { part: CoursePart }) => {
  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  const typeCheck = (part: CoursePart) => {
    switch (part.kind) {
      case 'basic':
        return (
          <>
            <br />
            {part.description}
          </>
        )
      case 'group':
        return (
          <>
            <br />
            group projects: {part.groupProjectCount}
          </>
        )
      case 'background':
        return (
          <>
            <br />
            {part.description}
            <br />
            {part.backgroundMaterial}
          </>
        )
      case 'special':
        return (
          <>
            <br />
            {part.description}
            <br />
            required skills: {part.requirements.join(', ')}
          </>
        )
      default:
        return assertNever(part)
    }
  }

  return (
    <p>
      <b>
        {part.name} {part.exerciseCount}
      </b>
      {typeCheck(part)}
    </p>
  )
}

export default Content
