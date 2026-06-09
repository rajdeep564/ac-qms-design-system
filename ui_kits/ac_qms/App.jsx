/* App.jsx — top-level router. Holds simple state for the active route,
   open document, signature modal, and toast notifications. */

const Placeholder = ({ title, crumb, blurb }) => (
  <div className="page">
    <PageHeader crumb={crumb} title={title} />
    <div className="card">
      <div className="card-body" style={{ padding: 'var(--s10)', textAlign: 'center' }}>
        <div className="secondary text-sm">{blurb}</div>
      </div>
    </div>
  </div>
);

const FilteredList = ({ data, onOpenDoc, statusFilter, title, crumb }) => {
  const docs = data.documents.filter(d => statusFilter.includes(d.status));
  return (
    <div className="page">
      <PageHeader
        crumb={crumb}
        title={title}
        actions={<Button variant="primary" icon={<IconPlus size={14} />}>New</Button>}
      />
      <div className="card">
        <div className="card-header">
          <span className="title">{docs.length} record{docs.length === 1 ? '' : 's'}</span>
          <span className="meta">Updated 25-May-2026 09:30 IST</span>
        </div>
        <div className="card-body card-body--flush">
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Dept</th>
                  <th>Owner</th>
                  <th>Status</th>
                  <th>Last modified</th>
                </tr>
              </thead>
              <tbody>
                {docs.map(d => (
                  <tr key={d.id} onClick={() => onOpenDoc(d)}>
                    <td className="id">{d.id} <span className="muted">{d.rev}</span></td>
                    <td className="title-cell">{d.title}</td>
                    <td><DepartmentBadge dept={d.dept} /></td>
                    <td className="secondary">{d.owner}</td>
                    <td><StatusPill status={d.status} /></td>
                    <td className="secondary mono text-xs">{d.modified}</td>
                  </tr>
                ))}
                {docs.length === 0 && (
                  <tr><td colSpan="6" style={{ padding: 'var(--s8)', textAlign: 'center' }} className="secondary">No records.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const data = window.QMS_DATA;
  const [route, setRoute] = React.useState('dashboard');
  const [openDoc, setOpenDoc] = React.useState(null);
  const [signing, setSigning] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [toast, setToast] = React.useState(null);

  // brief loading shimmer on every route change — typical app behavior
  const navigate = (r) => {
    setOpenDoc(null);
    setRoute(r);
    setLoading(true);
    setTimeout(() => setLoading(false), 350);
  };

  const openDocument = (d) => {
    setOpenDoc(d);
    if (d.status === 'oos') {
      setRoute('oos-detail');
    } else {
      setRoute('doc-detail');
    }
    window.scrollTo({ top: 0 });
  };

  const showToast = (t) => {
    setToast(t);
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => setToast(null), 4000);
  };

  const handleSign = (reason) => {
    setSigning(false);
    showToast({ message: `Signed — ${openDoc.id} ${openDoc.rev}. Logged at 25-May-2026 09:42 IST.` });
  };

  let screen;
  switch (route) {
    case 'dashboard':
      screen = <Dashboard data={data} onOpenDoc={openDocument} />;
      break;
    case 'documents':
      screen = <DocumentsList data={data} onOpenDoc={openDocument} />;
      break;
    case 'doc-detail':
      screen = <DocumentDetail
        doc={openDoc}
        data={data}
        onBack={() => navigate('documents')}
        onSign={() => setSigning(true)}
      />;
      break;
    case 'oos-detail':
      screen = <DocumentDetail
        doc={openDoc}
        data={data}
        onBack={() => navigate('documents')}
        onSign={() => setSigning(true)}
      />;
      break;
    case 'batches':
      screen = <FilteredList
        data={data}
        onOpenDoc={openDocument}
        crumb="Batch records"
        title="Batch records"
        statusFilter={['signed', 'issued', 'submitted']}
      />;
      break;
    case 'deviations':
      screen = <FilteredList
        data={data}
        onOpenDoc={openDocument}
        crumb="Deviations"
        title="Deviations"
        statusFilter={['submitted', 'draft']}
      />;
      break;
    case 'oos':
      screen = <OOSInvestigation data={data} onBack={() => navigate('documents')} />;
      break;
    case 'audit':
      screen = <AuditTrail />;
      break;
    case 'users':
      screen = <Placeholder
        crumb="Admin"
        title="Users"
        blurb="User and role administration is part of AC-QMS but not wired in this UI kit."
      />;
      break;
    case 'settings':
      screen = <Placeholder
        crumb="Admin"
        title="Settings"
        blurb="System settings, integrations, and signature policies live here."
      />;
      break;
    default:
      screen = <Dashboard data={data} onOpenDoc={openDocument} />;
  }

  return (
    <React.Fragment>
      <AppShell activeRoute={route} onNavigate={navigate} loading={loading} toast={toast}>
        {screen}
      </AppShell>
      {signing && openDoc && (
        <SignatureModal
          doc={openDoc}
          onCancel={() => setSigning(false)}
          onConfirm={handleSign}
        />
      )}
    </React.Fragment>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
