import { useEffect, useState } from 'react'
import sanityClient from '../sanityClient'
import { Link } from 'react-router-dom'

// Komponent for forsiden
export default function Forside() {
  const [members, setMembers] = useState([]) // Lager en tom liste for medlemmer
  const [logs, setLogs] = useState([])       // Lager en tom liste for arbeidslogger

  // Henter data fra Sanity når siden lastes inn
  useEffect(() => {
    // Henter alle medlemmer
    sanityClient
      .fetch(`*[_type == "member"]{
        _id,
        name,
        email,
        image{asset->{url}},
        slug
      }`)
      .then(setMembers) // Oppdaterer state med medlemsdata

    // Henter arbeidslogg og sorterer etter dato
    sanityClient
      .fetch(`*[_type == "workLog"] | order(date desc){
        title,
        date,
        timer,
        author->{name}
      }`)
      .then(setLogs) // Oppdaterer state med loggdata
  }, [])

  return (
    <div className="forside">
      <h2>Gruppemedlemmer</h2>

      {/* Viser medlemskort */}
      <div className="kort-container">
        {members.map((member) => (
          <Link key={member._id} to={`/profile/${member.slug.current}`} className="kort-link">
            <div className="personkort">
              <img src={member.image?.asset?.url} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.email}</p>
            </div>
          </Link>
        ))}
      </div>

      <h2>Arbeidslogg</h2>

      {/* Viser arbeidsloggen som en tabell */}
      <div className="arbeidslogg">
        <table>
          <thead>
            <tr>
              <th>Dato</th>
              <th>Navn</th>
              <th>Oppgave</th>
              <th>Timer</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={i}>
                <td>{log.date?.slice(0, 10)}</td>      {/* Viser dato */}
                <td>{log.author?.name}</td>            {/* Viser hvem som gjorde oppgaven */}
                <td>{log.title}</td>                   {/* Viser oppgaveteksten */}
                <td>{log.timer || 1} timer</td>        {/* Viser antall timer (standard 1) */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// KILDER:
// React useEffect og useState: https://react.dev/reference/react/useEffect
// Sanity-spørringer med GROQ: https://www.sanity.io/docs/query-cheat-sheet
// Sanity JavaScript-klient: https://www.sanity.io/docs/js-client
// React Router (Link-komponent): https://reactrouter.com/en/main/components/link
// HTML-tabell-elementer: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table

