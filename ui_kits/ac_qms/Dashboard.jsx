/* Dashboard — KPI tiles + a focused "Awaiting my review" queue.
   Reflects the QMS reality: a reviewer's day is a queue of records. */

const Dashboard = ({ data, onOpenDoc }) => {
  const queue = data.documents.filter(d => d.status === 'submitted' || d.status === 'oos');

  return (
    <div className="page">
      <PageHeader
        crumb="Home · 25-May-2026"
        title="My queue"
        actions={
          <React.Fragment>
            <Button variant="neutral" icon={<IconDownload size={14} />}>Export queue</Button>
            <Button variant="primary"  icon={<IconPlus size={14} />}>New document</Button>
          </React.Fragment>
        }
      />

      <div className="kpi-row">
        {data.kpis.map((k) => (
          <div className="kpi" key={k.label}>
            <span className="label">{k.label}</span>
            <span className={`value ${k.oos ? 'value--oos' : ''}`}>{k.value}</span>
            <span className="delta">{k.delta}</span>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <span className="title">Awaiting my review</span>
          <span className="meta">Sorted by oldest first</span>
        </div>
        <div className="card-body card-body--flush">
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Title</th>
                  <th>Dept</th>
                  <th>Status</th>
                  <th>Last modified</th>
                </tr>
              </thead>
              <tbody>
                {queue.map(d => (
                  <tr key={d.id} onClick={() => onOpenDoc(d)}>
                    <td className="id">{d.id} <span className="muted">{d.rev}</span></td>
                    <td className="title-cell">{d.title}<div className="text-xs muted" style={{ marginTop: 2 }}>{d.type}</div></td>
                    <td><DepartmentBadge dept={d.dept} /></td>
                    <td><StatusPill status={d.status} /></td>
                    <td className="secondary mono text-xs">{d.modified}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { Dashboard });
