import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import sanityClient from '../sanityClient'

const Header = ({ members }) => {
  const [groupName, setGroupName] = useState('Team X')

  useEffect(() => {
    sanityClient.fetch(`*[_type == "group"][0]{ groupName }`).then(data => {
      if (data?.groupName) setGroupName(data.groupName)
    })
  }, [])

  return (
    <header className="header">
      <div className="header__title">{groupName}</div>
      <nav className="header__nav">
        <Link to="/">Hjem</Link>
        {members.length > 0 && <div className="nav-divider" />}
        {members.map((m) => (
          <Link key={m._id} to={`/profile/${m.slug.current}`}>{m.name.split(' ')[0]}</Link>
        ))}
      </nav>
    </header>
  )
}

export default Header