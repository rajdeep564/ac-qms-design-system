/* OOS investigation screen — focused workflow page.
   Mirrors how a regulated investigation is anchored: banner up top,
   structured facts, root-cause workspace, then sign-off. */

const OOSInvestigation = ({ data, onBack }) => {
  const oos = data.oos;

  return (
    <div className="page">
      <PageHeader
        crumb={<span><span style={{ cursor: 'pointer' }} onClick={onBack}>Documents</span> › {oos.id}</span>}
        title={oos.title}
        actions={
          <React.Fragment>
            <Button variant="neutral" icon={<IconHistory size={14} />}>Audit trail</Button>
            <Button variant="primary"  icon={<IconPenLine size={14} />}>Submit Phase I</Button>
          </React.Fragment>
        }
      />

      <div className="oos-banner">
        <IconAlertTriangle size={20} className="icon" />
        <div className="body">
          <div className="title">Out-Of-Specification — investigation open</div>
          <div className="desc">
            {oos.parameter} measured at <b className="mono">{oos.result}</b> against
            specification <b className="mono">{oos.spec}</b>. Discovered <b className="mono">{oos.discovered}</b>.
            Investigation required per {oos.cfr}.
          </div>
        </div>
      </div>

      <div className="detail-grid">
        <div className="col gap-4">
          <div className="card">
            <div className="card-header"><span className="title">Investigation facts</span></div>
            <dl className="doc-meta" style={{ borderBottom: 'none' }}>
              <div><dt>OOS ID</dt><dd className="mono">{oos.id}</dd></div>
              <div><dt>Affected batch</dt><dd className="mono">{oos.affectedBatch}</dd></div>
              <div><dt>Product</dt><dd>{oos.product}</dd></div>
              <div><dt>Parameter</dt><dd>{oos.parameter}</dd></div>
              <div><dt>Specification</dt><dd className="mono">{oos.spec}</dd></div>
              <div><dt>Result</dt><dd className="mono" style={{ color: 'var(--oos)', fontWeight: 600 }}>{oos.result}</dd></div>
              <div><dt>Discovered</dt><dd className="mono">{oos.discovered}</dd></div>
              <div><dt>Regulatory ref</dt><dd className="mono">{oos.cfr}</dd></div>
            </dl>
          </div>

          <div className="card">
            <div className="card-header"><span className="title">Phase I — Laboratory investigation</span></div>
            <div className="card-body col gap-4">
              <Field label="Initial assessment">
                <textarea
                  className="input"
                  style={{ height: 90, padding: 10, resize: 'vertical', fontFamily: 'var(--font)' }}
                  defaultValue="Apparent assay value within spec; dissolution Q30 below NLT 80 %. Operator confirmed correct vessel selection. Dissolution media pH verified pre-test (pH 5.8, within range)."
                />
              </Field>
              <Field label="Hypothesis">
                <Select defaultValue="formulation">
                  <option value="lab_error">Laboratory error</option>
                  <option value="sampling">Sampling error</option>
                  <option value="formulation">Formulation / manufacturing variability</option>
                  <option value="equipment">Equipment / instrument fault</option>
                  <option value="unknown">Cause not yet determined</option>
                </Select>
              </Field>
              <Field label="Retest authorised by" help="Bound to e-signature on submission.">
                <Input defaultValue="R. Patel (QA)" readOnly />
              </Field>
            </div>
          </div>
        </div>

        <aside className="col gap-4">
          <div className="card">
            <div className="card-header"><span className="title">Investigators</span></div>
            <div className="card-body" style={{ paddingTop: 0, paddingBottom: 0 }}>
              {oos.investigators.map((p, i) => (
                <div className="sig-panel-row" key={i}>
                  <Avatar name={p.name} />
                  <div className="who" style={{ flex: 1 }}>
                    <span className="name">{p.name}</span>
                    <span className="text-xs secondary">{p.role} · <DepartmentBadge dept={p.dept} /></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header"><span className="title">Linked records</span></div>
            <div className="card-body col gap-3" style={{ fontSize: 'var(--text-sm)' }}>
              <div className="row gap-2"><IconPackage size={14} className="secondary" /><span className="mono">{oos.affectedBatch}</span><span className="muted text-xs" style={{ marginLeft: 'auto' }}>Batch record</span></div>
              <div className="row gap-2"><IconFileText size={14} className="secondary" /><span className="mono">SPEC-API-0142 r3</span><span className="muted text-xs" style={{ marginLeft: 'auto' }}>Spec</span></div>
              <div className="row gap-2"><IconFileText size={14} className="secondary" /><span className="mono">SOP-LAB-0034 r7</span><span className="muted text-xs" style={{ marginLeft: 'auto' }}>SOP</span></div>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><span className="title">Phase status</span></div>
            <div className="card-body col gap-3" style={{ fontSize: 'var(--text-sm)' }}>
              <div className="row gap-3"><StatusPill status="submitted">In progress</StatusPill><span>Phase I — Lab</span></div>
              <div className="row gap-3"><StatusPill status="draft">Pending</StatusPill><span>Phase II — Full</span></div>
              <div className="row gap-3"><StatusPill status="draft">Pending</StatusPill><span>CAPA</span></div>
              <div className="row gap-3"><StatusPill status="draft">Pending</StatusPill><span>Closure</span></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

Object.assign(window, { OOSInvestigation });
