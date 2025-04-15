import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import sanityClient from '../sanityClient'

// Header-komponenten viser gruppenavn og meny
const Header = ({ members }) => {
  const [groupName, setGroupName] = useState('Team X') // Standard navn hvis Sanity ikke svarer

  // Henter gruppenavn fra Sanity
  useEffect(() => {
    sanityClient.fetch(`*[_type == "group"][0]{ groupName }`).then(data => {
      if (data?.groupName) setGroupName(data.groupName)
    })
  }, [])

  return (
    <header className="header">
      {/* Viser gruppenavn */}
      <div className="header__title">{groupName}</div>

      {/* Navigasjon */}
      <nav className="header__nav">
        <Link to="/">Hjem</Link> {/* Lenke til forsiden */}

        {/* Viser navnedeling hvis det finnes medlemmer */}
        {members.length > 0 && <div className="nav-divider" />}

        {/* Fornavn som lenker til profilene */}
        {members.map((m) => (
          <Link key={m._id} to={`/profile/${m.slug.current}`}>
            {m.name.split(' ')[0]} {/* Viser kun fornavn */}
          </Link>
        ))}
      </nav>
    </header>
  )
}

export default Header
// Kilder:
// React useEffect og useState: https://react.dev/reference/react/useEffect
// Sanity JavaScript-klient: https://www.sanity.io/docs/js-client
// React Router: https://reactrouter.com/en/main/components/link

