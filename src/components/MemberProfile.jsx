import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import sanityClient from '../sanityClient'
import WorkLogTable from './WorkLogTable'

// Komponent som viser én medlemsprofil basert på slug i URL
const MemberProfile = () => {
  const { slug } = useParams() // Henter slug fra URL
  const [member, setMember] = useState(null) // Lagrer data om medlemmet
  const [logs, setLogs] = useState([])       // Lagrer loggføringer for medlemmet

  // Henter medlemsdata fra Sanity basert på slug
  useEffect(() => {
    sanityClient.fetch(`*[_type == "member" && slug.current == $slug][0]{
      _id, name, email, image{asset->{url}}, interests, bio
    }`, { slug }).then(setMember)
  }, [slug])

  // Når vi har fått medlemmet, henter vi loggene til den personen
  useEffect(() => {
    if (member?._id) {
      sanityClient.fetch(`*[_type == "workLog" && author._ref == $id]{ title, date, timer }`, { id: member._id })
        .then(setLogs)
    }
  }, [member])

  // Viser "Laster..." mens data hentes
  if (!member) return <p>Laster...</p>

  return (
    <div className="profil">
      {/* Bilde og informasjon om medlemmet */}
      <img src={member.image?.asset?.url} alt={member.name} style={{ maxWidth: '200px' }} />
      <h2>{member.name}</h2>
      <p>{member.email}</p>
      <p><strong>Interesser:</strong> {member.interests?.join(', ')}</p>
      <p><strong>Om:</strong> {member.bio}</p>

      {/* Viser arbeidsloggen til dette medlemmet */}
      <h3>Arbeidslogg</h3>
      <WorkLogTable logs={logs} />
    </div>
  )
}

export default MemberProfile
