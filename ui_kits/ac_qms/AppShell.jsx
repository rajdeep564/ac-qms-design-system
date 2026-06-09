/* AppShell — top bar + left navigation.
   Hairline-separated, white-on-white, no shadows.
   Loading state: 1px progress line under the top bar. */

const AppShell = ({ activeRoute, onNavigate, loading, toast, children }) => {
  const navItems = [
    { id: 'dashboard',  label: 'Dashboard',     icon: <IconLayoutDashboard size={16} />, count: null },
    { id: 'documents',  label: 'Documents',     icon: <IconFileText size={16} />,        count: 247 },
    { id: 'batches',    label: 'Batch records', icon: <IconPackage size={16} />,         count: 89 },
    { id: 'deviations', label: 'Deviations',    icon: <IconCircleAlert size={16} />,     count: 14 },
    { id: 'oos',        label: 'OOS',           icon: <IconAlertTriangle size={16} />,   count: 3 },
    { id: 'audit',      label: 'Audit trail',   icon: <IconHistory size={16} />,         count: null },
  ];

  const adminItems = [
    { id: 'users',    label: 'Users',     icon: <IconUser size={16} /> },
    { id: 'settings', label: 'Settings',  icon: <IconSettings size={16} /> },
  ];

  return (
    <div className="app">
      <header className="topbar" style={{ position: 'relative' }}>
        <div className="topbar-logo">
          <img src="../../assets/aditya-chemicals-logo.png" alt="Aditya Chemicals" />
          <span className="product">AC-QMS</span>
        </div>
        <div className="topbar-search">
          <span className="icon-wrap"><IconSearch size={14} /></span>
          <input placeholder="Search documents, batches, deviations…" />
        </div>
        <div className="topbar-right">
          <span className="env-tag"><span className="dot" />Prod · IST</span>
          <span className="user-chip">
            <Avatar name="Rohan Patel" />
            <span>R. Patel</span>
            <DepartmentBadge dept="QA" />
          </span>
        </div>
        {loading ? <div className="progress-line" /> : null}
      </header>

      <nav className="nav">
        <span className="nav-group-label">Workflow</span>
        {navItems.map(item => (
          <div
            key={item.id}
            className={`nav-item ${activeRoute === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
            {item.count != null && <span className="count">{item.count}</span>}
          </div>
        ))}
        <span className="nav-group-label" style={{ marginTop: 'var(--s4)' }}>Admin</span>
        {adminItems.map(item => (
          <div
            key={item.id}
            className={`nav-item ${activeRoute === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </div>
        ))}
      </nav>

      <main className="main">{children}</main>

      {toast ? (
        <div className={`toast ${toast.kind === 'oos' ? 'toast--oos' : ''}`}>
          {toast.kind === 'oos'
            ? <IconAlertTriangle size={16} style={{ color: 'var(--oos)' }} />
            : <IconCheck size={16} style={{ color: 'var(--primary)' }} />
          }
          <span>{toast.message}</span>
        </div>
      ) : null}
    </div>
  );
};

const PageHeader = ({ crumb, title, actions }) => (
  <div className="page-header">
    <div>
      {crumb && <div className="crumb">{crumb}</div>}
      <div className="title">{title}</div>
    </div>
    {actions && <div className="actions">{actions}</div>}
  </div>
);

Object.assign(window, { AppShell, PageHeader });
