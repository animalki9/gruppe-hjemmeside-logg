import Header from './Header'

export default function Layout({ children, members }) {
  return (
    <>
      <Header members={members} />
      <main>{children}</main>
    </>
  )
}
