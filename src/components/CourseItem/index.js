import {Link} from 'react-router-dom'

const CourseItem = props => {
  const {each} = props
  const {id, logoUrl, name} = each
  return (
    <Link className="para" to={`/courses/${id}`}>
      <li key={id} className="list-items">
        <img src={logoUrl} alt={name} />
        <p className="p">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
