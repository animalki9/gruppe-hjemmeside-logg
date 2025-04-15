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
// KILDER:
// React-komponenter og props: https://react.dev/learn/your-first-component
// React Router – Link-komponent: https://reactrouter.com/en/main/components/link
// Optional chaining (?.) i JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining