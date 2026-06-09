/* Atoms — small, composable building blocks.
   Button, StatusPill, DepartmentBadge, Input, Field, Select. */

const Button = ({ variant = 'neutral', size, icon, children, ...rest }) => (
  <button
    className={`btn btn--${variant}${size === 'lg' ? ' btn--lg' : ''}`}
    {...rest}
  >
    {icon}
    {children}
  </button>
);

const STATUS_LABELS = {
  draft: 'Draft',
  submitted: 'Submitted',
  approved: 'Approved',
  signed: 'Signed',
  issued: 'Issued',
  oos: 'OOS',
  in_spec: 'In spec',
};
const STATUS_CLASS = {
  draft: 'pill--draft',
  submitted: 'pill--submitted',
  approved: 'pill--approved',
  signed: 'pill--signed',
  issued: 'pill--issued',
  oos: 'pill--oos',
  in_spec: 'pill--approved',
};

const StatusPill = ({ status, children }) => (
  <span className={`pill ${STATUS_CLASS[status] || 'pill--draft'}`}>
    {children || STATUS_LABELS[status] || status}
  </span>
);

const DepartmentBadge = ({ dept }) => (
  <span className={`pill ${dept === 'QC' ? 'pill--qc' : 'pill--qa'}`}>{dept}</span>
);

const Avatar = ({ name }) => {
  const initials = name
    .split(' ')
    .map(s => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return <span className="avatar">{initials}</span>;
};

const Field = ({ label, children, help, error }) => (
  <label className="field">
    {label && <span className="field-label">{label}</span>}
    {children}
    {error
      ? <span className="text-xs" style={{ color: 'var(--oos)' }}>{error}</span>
      : help
        ? <span className="text-xs muted">{help}</span>
        : null}
  </label>
);

const Input = ({ error, ...rest }) => (
  <input
    className="input"
    style={error ? { borderColor: 'var(--oos)' } : undefined}
    {...rest}
  />
);

const Select = ({ children, ...rest }) => (
  <select className="select input" {...rest}>{children}</select>
);

Object.assign(window, {
  Button, StatusPill, DepartmentBadge, Avatar, Field, Input, Select,
  STATUS_LABELS, STATUS_CLASS,
});
