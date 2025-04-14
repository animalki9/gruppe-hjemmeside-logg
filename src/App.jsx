import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import client from './sanityClient'

import Layout from './components/Layout'
import Forside from './components/Forside'
import MemberProfile from './components/MemberProfile'

import './styles/header.scss'
import './styles/layout.scss'
import './styles/membercard.scss'
import './styles/worklog.scss'
import './styles/forside.scss'
import './App.css'




function App() {
  const [members, setMembers] = useState([])
  const [logs, setLogs] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const memberData = await client.fetch(
          `*[_type == "member"]{
            _id,
            name,
            email,
            image { asset->{url} },
            interests,
            bio,
            slug
          }`
        )
        setMembers(memberData)

        const logData = await client.fetch(
          `*[_type == "workLog"] | order(date desc){
            title,
            description,
            date,
            timer,
            author->{_id, name, slug}
          }`
        )
        setLogs(logData)

        console.log("✅ Medlemmer:", memberData)
        console.log("✅ Arbeidslogg:", logData)
      } catch (err) {
        console.error("Feil ved henting fra Sanity:", err)
      }
    }

    fetchData()
  }, [])

  return (
    <Router>
      <Layout members={members}>
        <Routes>
          <Route path="/" element={<Forside members={members} logs={logs} />} />
          <Route path="/profile/:slug" element={<MemberProfile />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App