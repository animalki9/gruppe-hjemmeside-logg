// MemberCard.jsx
import { Link } from 'react-router-dom'

const MemberCard = ({ member }) => (
  <Link to={`/profile/${member.slug.current}`} className="kort-link">
    <div className="personkort">
      <img src={member.image?.asset?.url} alt={member.name} />
      <h3>{member.name}</h3>
      <p>{member.email}</p>
    </div>
  </Link>
)