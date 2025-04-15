// Komponent som viser en tabell med arbeidslogger
const WorkLogTable = ({ logs }) => (
  <div className="arbeidslogg">
    <table>
      <thead>
        <tr>
          <th>Dato</th>
          <th>Navn</th>
          <th>Oppgave</th>
          <th>Timer</th>
        </tr>
      </thead>
      <tbody>
        {/* Går gjennom hver logg og lager en rad i tabellen */}
        {logs.map((log, i) => (
          <tr key={i}>
            <td>{log.date?.slice(0, 10)}</td> {/* Viser datoen (bare yyyy-mm-dd) */}
            <td>{log.author?.name || ''}</td>  {/* Navn på personen som gjorde oppgaven */}
            <td>{log.title}</td>               {/* Hva de har gjort */}
            <td style={{ textAlign: 'right' }}>
              {log.timer || 1}t {/* Antall timer brukt (standard 1) */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default WorkLogTable
