/* DocumentDetail — spec / record view with parameters table, signatures, audit trail.
   Routes branch on doc.status === 'oos' to show the OOSBanner. */

const DocumentDetail = ({ doc, data, onBack, onSign }) => {
  const spec = data.spec;
  const isOOS = doc.status === 'oos';
  const oos = data.oos;

  return (
    <div className="page">
      <PageHeader
        crumb={<span><span style={{ cursor: 'pointer' }} onClick={onBack}>Documents</span> › {doc.id}</span>}
        title={doc.title}
        actions={
          <React.Fragment>
            <Button variant="neutral" icon={<IconHistory size={14} />}>History</Button>
            <Button variant="neutral" icon={<IconDownload size={14} />}>Export PDF</Button>
            {doc.status === 'submitted' || doc.status === 'draft'
              ? <Button variant="primary" icon={<IconPenLine size={14} />} onClick={onSign}>Sign &amp; approve</Button>
              : doc.status === 'oos'
                ? <Button variant="primary" icon={<IconArrowRight size={14} />}>Open investigation</Button>
                : <Button variant="primary" icon={<IconLock size={14} />} disabled>Locked</Button>
            }
          </React.Fragment>
        }
      />

      {isOOS && (
        <div className="oos-banner">
          <IconAlertTriangle size={20} className="icon" />
          <div className="body">
            <div className="title">Result outside specification</div>
            <div className="desc">
              {oos.parameter}: <b className="mono">{oos.result}</b> against spec <b className="mono">{oos.spec}</b>.
              {' '}Investigation required ({oos.cfr}). Affected batch: <b className="mono">{oos.affectedBatch}</b>.
            </div>
            <div className="actions">
              <Button variant="danger">Quarantine batch</Button>
              <Button variant="neutral">Notify QA head</Button>
            </div>
          </div>
        </div>
      )}

      <div className="detail-grid">
        <div className="card">
          <dl className="doc-meta">
            <div><dt>Document ID</dt><dd className="mono">{doc.id}</dd></div>
            <div><dt>Revision</dt><dd className="mono">{doc.rev}</dd></div>
            <div><dt>Department</dt><dd><DepartmentBadge dept={doc.dept} /></dd></div>
            <div><dt>Status</dt><dd><StatusPill status={doc.status} /></dd></div>
            <div><dt>Type</dt><dd>{doc.type}</dd></div>
            <div><dt>Owner</dt><dd>{doc.owner}</dd></div>
            <div><dt>Last modified</dt><dd className="mono">{doc.modified}</dd></div>
            <div><dt>Effective from</dt><dd className="mono">26-May-2026</dd></div>
          </dl>

          <section className="doc-section">
            <h3>Purpose</h3>
            <p>{spec.purpose}</p>
          </section>

          <section className="doc-section">
            <h3>Acceptance criteria</h3>
            <table className="spec-table">
              <thead>
                <tr>
                  <th style={{ width: 70 }}>Test #</th>
                  <th>Parameter</th>
                  <th>Method</th>
                  <th>Specification</th>
                  <th>Result</th>
                  <th>Evaluation</th>
                </tr>
              </thead>
              <tbody>
                {spec.parameters.map(p => (
                  <tr key={p.id}>
                    <td className="id">{p.id}</td>
                    <td>{p.parameter}</td>
                    <td className="secondary">{p.method}</td>
                    <td className="mono">{p.spec}</td>
                    <td className={`mono ${p.evaluation === 'oos' ? 'oos' : ''}`}>{p.result}</td>
                    <td><StatusPill status={p.evaluation} /></td>
                  </tr>
                ))}
                {isOOS && (
                  <tr>
                    <td className="id">AP-07</td>
                    <td>Dissolution (Q30 min)</td>
                    <td className="secondary">USP &lt;711&gt;</td>
                    <td className="mono">NLT 80 %</td>
                    <td className="mono oos">72 %</td>
                    <td><StatusPill status="oos" /></td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </div>

        <aside className="col gap-4">
          <div className="card">
            <div className="card-header"><span className="title">Signatures</span></div>
            <div className="card-body" style={{ paddingTop: 0, paddingBottom: 0 }}>
              {spec.signatures.map((s, i) => (
                <div className="sig-panel-row" key={i}>
                  <Avatar name={s.name} />
                  <div className="who" style={{ flex: 1 }}>
                    <span className="name">{s.name}</span>
                    <span className="text-xs secondary">{s.role} · <DepartmentBadge dept={s.dept} /></span>
                  </div>
                  <span className="time">{s.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header"><span className="title">Audit trail</span></div>
            <div className="card-body" style={{ paddingTop: 0, paddingBottom: 'var(--s3)' }}>
              {spec.audit.map((a, i) => (
                <div className="audit-row" key={i} style={{ gridTemplateColumns: '120px 1fr' }}>
                  <span className="ts">{a.time}</span>
                  <span>
                    <span className="who">{a.who}</span>
                    <span className="text-xs secondary" style={{ display: 'block', marginTop: 2 }}>{a.what}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

Object.assign(window, { DocumentDetail });
