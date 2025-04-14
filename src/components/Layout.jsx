import Header from './Header'

export default function Layout({ children, members }) {
  return (
    <div className="layout">
      <Header members={members} />
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}
