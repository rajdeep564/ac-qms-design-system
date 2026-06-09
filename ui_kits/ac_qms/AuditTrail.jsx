/* Audit trail — system-wide log. Tabular, exhaustive, monospace timestamps. */

const AUDIT_ENTRIES = [
  { time: '25-May-2026 09:14:32 IST', who: 'S. Kulkarni', dept: 'QC', action: 'Created OOS', target: 'OOS-2026-0089', detail: 'Dissolution result 72 % against spec NLT 80 %.' },
  { time: '25-May-2026 08:02:11 IST', who: 'R. Patel',    dept: 'QA', action: 'Created draft', target: 'CC-2026-0212', detail: 'Change control initiated — Excipient E-12.' },
  { time: '24-May-2026 14:02:07 IST', who: 'R. Patel',    dept: 'QA', action: 'Approved',      target: 'SPEC-API-0142 r3', detail: 'E-signature bound under 21 CFR Part 11.' },
  { time: '24-May-2026 13:50:44 IST', who: 'R. Patel',    dept: 'QA', action: 'Opened',        target: 'SPEC-API-0142 r3', detail: 'Opened for review.' },
  { time: '24-May-2026 11:48:23 IST', who: 'R. Patel',    dept: 'QA', action: 'Signed',        target: 'BR-2026-04781 r1', detail: 'Batch record signed.' },
  { time: '23-May-2026 16:21:09 IST', who: 'A. Nair',     dept: 'QC', action: 'Submitted',     target: 'SOP-LAB-0034 r7', detail: 'Submitted for QA review.' },
  { time: '23-May-2026 11:02:50 IST', who: 'A. Nair',     dept: 'QC', action: 'Reviewed',      target: 'SPEC-API-0142 r3', detail: 'Marked Reviewed.' },
  { time: '22-May-2026 17:39:18 IST', who: 'M. Joshi',    dept: 'QA', action: 'Submitted',     target: 'DEV-2026-0156 r2', detail: 'Deviation re-submitted with corrective action.' },
  { time: '22-May-2026 10:14:02 IST', who: 'S. Kulkarni', dept: 'QC', action: 'Submitted',     target: 'SPEC-API-0142 r3', detail: 'Updated related-substances limit to NMT 0.10 %.' },
  { time: '20-May-2026 10:11:33 IST', who: 'S. Kulkarni', dept: 'QC', action: 'Issued',        target: 'SPEC-EXC-0078 r5', detail: 'Issued to production.' },
];

const AuditTrail = () => {
  return (
    <div className="page">
      <PageHeader
        crumb="Audit trail"
        title="Audit trail"
        actions={
          <React.Fragment>
            <Button variant="neutral" icon={<IconFilter size={14} />}>Filter</Button>
            <Button variant="neutral" icon={<IconDownload size={14} />}>Export CSV</Button>
          </React.Fragment>
        }
      />

      <div className="card">
        <div className="card-header">
          <span className="title">All events</span>
          <span className="meta">Tamper-evident · 21 CFR Part 11 compliant</span>
        </div>
        <div className="card-body card-body--flush">
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>User</th>
                  <th>Dept</th>
                  <th>Action</th>
                  <th>Target</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {AUDIT_ENTRIES.map((e, i) => (
                  <tr key={i}>
                    <td className="mono text-xs muted" style={{ whiteSpace: 'nowrap' }}>{e.time}</td>
                    <td>{e.who}</td>
                    <td><DepartmentBadge dept={e.dept} /></td>
                    <td>{e.action}</td>
                    <td className="id">{e.target}</td>
                    <td className="secondary">{e.detail}</td>
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

Object.assign(window, { AuditTrail });
