import Header from './Header'

// Layout-komponenten brukes som ramme rundt alle sidene
export default function Layout({ children, members }) {
  return (
    <div className="layout">
      {/* Header vises på toppen av alle sider */}
      <Header members={members} />

      {/* Hovedinnholdet fra sidene vises her */}
      <main className="main-content">
        {children} {/* Dette er innholdet fra f.eks. Forside eller MemberProfile */}
      </main>
    </div>
  )
}
