import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import client from './sanityClient'
import Layout from './components/Layout'
import WorkLog from './components/WorkLog'
import MemberProfile from './components/MemberProfile'

function App() {
  const [members, setMembers] = useState([])
  const [logs, setLogs] = useState([])

  useEffect(() => {
    client.fetch(`*[_type == "member"]{..., slug { current }, image { asset->{url} } }`)
      .then((data) => {
        console.log("Medlemmer fra Sanity:", data)
        setMembers(data)
      })
  
    client.fetch(`*[_type == "workLog"]{..., author->{_id, name, slug}} | order(date desc)`)
      .then((data) => {
        console.log("Arbeidslogg fra Sanity:", data)
        setLogs(data)
      })
  }, [])
  

  return (
    <Router>
      <Layout members={members}>
        <Routes>
          <Route path="/" element={<WorkLog members={members} logs={logs} />} />
          <Route path="/:slug" element={<MemberProfile members={members} logs={logs} />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
