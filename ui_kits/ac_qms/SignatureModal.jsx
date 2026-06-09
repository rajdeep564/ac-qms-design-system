/* Signature modal — 21 CFR Part 11 e-signature confirmation.
   Instant appearance (no animation), backdrop only transparency in system. */

const SignatureModal = ({ doc, onCancel, onConfirm }) => {
  const [pwd, setPwd] = React.useState('');
  const [reason, setReason] = React.useState('Approval');

  return (
    <div className="modal-backdrop" onMouseDown={onCancel}>
      <div className="modal" onMouseDown={e => e.stopPropagation()}>
        <div className="modal-header">Sign &amp; approve — {doc.id}</div>
        <div className="modal-body">
          <p style={{ marginBottom: 'var(--s4)' }}>
            You are about to apply your bound electronic signature to
            <b> {doc.id} {doc.rev}</b>. This action is irreversible and
            logged to the tamper-evident audit trail under 21 CFR Part 11.
          </p>
          <Field label="Reason for signature">
            <Select value={reason} onChange={e => setReason(e.target.value)}>
              <option>Approval</option>
              <option>Review</option>
              <option>Authorisation</option>
              <option>Issuance</option>
            </Select>
          </Field>
          <Field label="Re-enter password" help="Confirms your identity (21 CFR 11.200).">
            <Input
              type="password"
              autoFocus
              value={pwd}
              onChange={e => setPwd(e.target.value)}
              placeholder="••••••••"
            />
          </Field>
        </div>
        <div className="modal-footer">
          <Button variant="neutral" onClick={onCancel}>Cancel</Button>
          <Button variant="primary" disabled={pwd.length < 4} onClick={() => onConfirm(reason)}>
            Apply signature
          </Button>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { SignatureModal });
