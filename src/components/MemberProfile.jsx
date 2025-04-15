import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import sanityClient from '../sanityClient'
import WorkLogTable from './WorkLogTable'
import '../styles/memberprofile.scss'

// Komponent som viser én medlemsprofil basert på slug i URL
const MemberProfile = () => {
  const { slug } = useParams()
  const [member, setMember] = useState(null)
  const [logs, setLogs] = useState([])

  // Henter medlemsdata
  useEffect(() => {
    sanityClient.fetch(`*[_type == "member" && slug.current == $slug][0]{
      _id, name, email, image{asset->{url}}, interests, bio
    }`, { slug }).then(setMember)
  }, [slug])

  // Henter arbeidslogger for medlemmet
  useEffect(() => {
    if (member?._id) {
      sanityClient.fetch(
        `*[_type == "workLog" && author._ref == $id]{
            title,
            date,
            timer,
            author->{
                name
            }
            }`
            ,
        { id: member._id }
      ).then(setLogs)
    }
  }, [member])

  if (!member) return <p>Laster...</p>

  return (
    <>
      <div className="profil">
        {/* Profilbilde */}
        <img src={member.image?.asset?.url} alt={member.name} />

        {/* Info */}
        <div className="profil-info">
          <h2>{member.name}</h2>

          {/* Flyttet bio rett under navn */}
          <p>{member.bio}</p>
          <p><strong>Interesser:</strong></p>
          <ul>
            {member.interests?.map((interest, i) => (
              <li key={i}>{interest}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Arbeidsloggen vises separat under profilen */}
      <div className="arbeidslogg-seksjon">
        <h3>Arbeidslogg</h3>
        <WorkLogTable logs={logs} />
      </div>
    </>
  )
}

export default MemberProfile
