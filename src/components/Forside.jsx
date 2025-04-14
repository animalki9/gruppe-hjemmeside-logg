import { useEffect, useState } from 'react'
import sanityClient from '../sanityClient'
import { Link } from 'react-router-dom'



export default function Forside() {
  const [members, setMembers] = useState([])
  const [logs, setLogs] = useState([])

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "member"]{
        _id,
        name,
        email,
        image{asset->{url}},
        slug
      }`)
      .then(setMembers)

    sanityClient
      .fetch(`*[_type == "workLog"] | order(date desc){
        title,
        date,
        timer,
        author->{name}
      }`)
      .then(setLogs)
  }, [])

  return (
    <div className="forside">
      <h2>Gruppemedlemmer</h2>
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
                <td>{log.date?.slice(0, 10)}</td>
                <td>{log.author?.name}</td>
                <td>{log.title}</td>
                <td>{log.timer || 1} timer</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
