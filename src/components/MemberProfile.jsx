import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import sanityClient from '../sanityClient'
import WorkLogTable from './WorkLogTable'

const MemberProfile = () => {
  const { slug } = useParams()
  const [member, setMember] = useState(null)
  const [logs, setLogs] = useState([])

  useEffect(() => {
    sanityClient.fetch(`*[_type == "member" && slug.current == $slug][0]{
      _id, name, email, image{asset->{url}}, interests, bio
    }`, { slug }).then(setMember)
  }, [slug])

  useEffect(() => {
    if (member?._id) {
      sanityClient.fetch(`*[_type == "workLog" && author._ref == $id]{ title, date, timer }`, { id: member._id })
        .then(setLogs)
    }
  }, [member])

  if (!member) return <p>Laster...</p>

  return (
    <div className="profil">
      <img src={member.image?.asset?.url} alt={member.name} style={{ maxWidth: '200px' }} />
      <h2>{member.name}</h2>
      <p>{member.email}</p>
      <p><strong>Interesser:</strong> {member.interests?.join(', ')}</p>
      <p><strong>Om:</strong> {member.bio}</p>
      <h3>Arbeidslogg</h3>
      <WorkLogTable logs={logs} />
    </div>
  )
}

export default MemberProfile