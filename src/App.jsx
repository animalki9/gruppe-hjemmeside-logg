import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import client from './sanityClient'

// Komponenter
import Layout from './components/Layout'
import Forside from './components/Forside'
import MemberProfile from './components/MemberProfile'

// Stiler
import './styles/header.scss'
import './styles/layout.scss'
import './styles/membercard.scss'
import './styles/worklog.scss'
import './styles/forside.scss'
import './styles/memberprofile.scss'


function App() {
  // Lager state for medlemmer og arbeidslogger
  const [members, setMembers] = useState([])
  const [logs, setLogs] = useState([])

  // Kjører når appen starter – henter data fra Sanity
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Henter medlemmer fra Sanity
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

        // Henter arbeidslogg og sorterer etter dato
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

        // Skriver ut til konsollen (valgfritt)
        console.log("Medlemmer:", memberData)
        console.log("Arbeidslogg:", logData)
      } catch (err) {
        console.error("Feil ved henting fra Sanity:", err)
      }
    }

    fetchData()
  }, [])

  return (
    <Router>
      {/* Layout med header og innhold */}
      <Layout members={members}>
        <Routes>
          {/* Forsiden med kort og felles logg */}
          <Route path="/" element={<Forside members={members} logs={logs} />} />

          {/* Profilside for hvert medlem */}
          <Route path="/profile/:slug" element={<MemberProfile />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
// Kilder:
// React useEffect og useState: https://react.dev/learn/synchronizing-with-effects
// React Router – Routes, Route, BrowserRouter: https://reactrouter.com/en/main/start/tutorial
// Sanity-klient og dataspørring (GROQ): https://www.sanity.io/docs/js-client
// JavaScript async/await: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises
