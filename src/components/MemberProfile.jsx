import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import sanityClient from '../sanityClient'

export default function MemberProfile() {
  const { slug } = useParams()
  const [person, setPerson] = useState(null)
  const [personLogs, setPersonLogs] = useState([])

  useEffect(() => {
    // Hent medlem basert på slug
    sanityClient
      .fetch(`*[_type == "member" && slug.current == $slug][0]{
        name,
        email,
        image{asset->{url}},
        interests,
        bio,
        _id
      }`, { slug })
      .then((data) => {
        setPerson(data)

        // Hent arbeidslogg koblet til denne personen
        if (data?._id) {
          sanityClient
            .fetch(`*[_type == "workLog" && author._ref == $id] | order(date desc){
              title,
              description,
              date,
              timer
            }`, { id: data._id })
            .then(setPersonLogs)
        }
      })
  }, [slug])

  if (!person) return <p>Laster persondata...</p>

  return (
    <div>
      <img src={person.image?.asset?.url} alt={person.name} style={{ maxWidth: '200px' }} />
      <h2>{person.name}</h2>
      <p>{person.email}</p>
      {person.interests?.length > 0 && (
        <p><strong>Interesser:</strong> {person.interests.join(', ')}</p>
      )}
      <p><strong>Om:</strong> {person.bio}</p>

      <h3>Arbeidslogg</h3>
      {personLogs.length > 0 ? (
        <ul>
          {personLogs.map((log, i) => (
            <li key={i}>
              {log.date?.slice(0, 10)} – {log.title} ({log.timer}t)
              <br />
              {log.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>Ingen loggføringer ennå.</p>
      )}
    </div>
  )
}
