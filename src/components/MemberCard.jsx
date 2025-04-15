import { Link } from 'react-router-dom'

// Viser ett enkelt medlemskort med bilde, navn og e-post
const MemberCard = ({ member }) => (
  // Klikk på kortet sender brukeren til medlemmet sin profilside
  <Link to={`/profile/${member.slug.current}`} className="kort-link">
    <div className="personkort">
      {/* Profilbilde */}
      <img src={member.image?.asset?.url} alt={member.name} />
      
      {/* Navn */}
      <h3>{member.name}</h3>
      
      {/* E-postadresse */}
      <p>{member.email}</p>
    </div>
  </Link>
)

export default MemberCard
// Kilder:
// React-komponenter og props: https://react.dev/learn/your-first-component
// React Router – Link-komponent: https://reactrouter.com/en/main/components/link