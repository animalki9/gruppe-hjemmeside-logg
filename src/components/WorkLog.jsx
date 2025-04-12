import { Link } from 'react-router-dom'

export default function WorkLog({ members = [] }) {
  return (
    <div>
      <h2>Gruppemedlemmer</h2>
      <div className="kort-container">
        {members.map((p) => (
          <Link key={p._id} to={`/profile/${p.slug.current}`} className="kort-link">
            <div className="personkort">
              <img src={p.image?.asset?.url} alt={p.name} />
              <h3>{p.name}</h3>
              <p>{p.email}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
