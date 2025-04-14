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
        {logs.map((log, i) => (
          <tr key={i}>
            <td>{log.date?.slice(0, 10)}</td>
            <td>{log.author?.name || ''}</td>
            <td>{log.title}</td>
            <td style={{ textAlign: 'right' }}>{log.timer || 1}t</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default WorkLogTable