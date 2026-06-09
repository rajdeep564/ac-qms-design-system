/* Documents — list view with filter bar and status chips. */

const STATUS_CHIPS = [
  { id: 'all',       label: 'All' },
  { id: 'mine',      label: 'My queue' },
  { id: 'draft',     label: 'Draft' },
  { id: 'submitted', label: 'Submitted' },
  { id: 'approved',  label: 'Approved' },
  { id: 'signed',    label: 'Signed' },
  { id: 'oos',       label: 'OOS' },
];

const DocumentsList = ({ data, onOpenDoc }) => {
  const [filter, setFilter] = React.useState('all');
  const [query, setQuery]   = React.useState('');

  const filtered = data.documents.filter(d => {
    if (filter !== 'all' && filter !== 'mine' && d.status !== filter) return false;
    if (filter === 'mine' && d.owner !== 'R. Patel') return false;
    if (query && !`${d.id} ${d.title}`.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="page">
      <PageHeader
        crumb="Documents"
        title="Documents"
        actions={
          <React.Fragment>
            <Button variant="neutral" icon={<IconDownload size={14} />}>Export</Button>
            <Button variant="primary"  icon={<IconPlus size={14} />}>New document</Button>
          </React.Fragment>
        }
      />

      <div className="filter-bar">
        <div className="search">
          <span className="icon-wrap"><IconSearch size={14} /></span>
          <input
            placeholder="Search by document ID or title…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className="chip-group">
          {STATUS_CHIPS.map(c => (
            <span
              key={c.id}
              className={`chip ${filter === c.id ? 'active' : ''}`}
              onClick={() => setFilter(c.id)}
            >
              {c.label}
            </span>
          ))}
        </div>
        <div className="spacer" />
        <Button variant="ghost" icon={<IconFilter size={14} />}>More filters</Button>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="title">{filtered.length} documents</span>
          <span className="meta">Updated 25-May-2026 09:30 IST</span>
        </div>
        <div className="card-body card-body--flush">
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Dept</th>
                  <th>Owner</th>
                  <th>Status</th>
                  <th>Last modified</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(d => (
                  <tr key={d.id} onClick={() => onOpenDoc(d)}>
                    <td className="id">{d.id} <span className="muted">{d.rev}</span></td>
                    <td className="title-cell">{d.title}</td>
                    <td className="secondary">{d.type}</td>
                    <td><DepartmentBadge dept={d.dept} /></td>
                    <td className="secondary">{d.owner}</td>
                    <td><StatusPill status={d.status} /></td>
                    <td className="secondary mono text-xs">{d.modified}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan="7" style={{ padding: 'var(--s8)', textAlign: 'center' }} className="secondary">No documents match.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { DocumentsList });
