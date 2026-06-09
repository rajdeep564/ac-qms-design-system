/* @ds-bundle: {"format":3,"namespace":"ACQMSDesignSystem_6f64dd","components":[],"sourceHashes":{"notifications-overlay.js":"9e806dac3a50","ui_kits/ac_qms/App.jsx":"2bfcc6c0c003","ui_kits/ac_qms/AppShell.jsx":"c0bf47d630a6","ui_kits/ac_qms/Atoms.jsx":"c2219682c8db","ui_kits/ac_qms/AuditTrail.jsx":"7eee89f9ed0b","ui_kits/ac_qms/Dashboard.jsx":"340f5254b336","ui_kits/ac_qms/DocumentDetail.jsx":"0a6e468fb2f0","ui_kits/ac_qms/DocumentsList.jsx":"7b86a438967d","ui_kits/ac_qms/Icons.jsx":"77a1f7125692","ui_kits/ac_qms/OOSInvestigation.jsx":"e64ae767446f","ui_kits/ac_qms/SignatureModal.jsx":"a070af793b23","ui_kits/ac_qms/data.js":"ba8d25fab426"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ACQMSDesignSystem_6f64dd = window.ACQMSDesignSystem_6f64dd || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// notifications-overlay.js
try { (() => {
/* ============================================================
   AC-QMS — Notifications overlay
   Renders the notification panel as a popover OVERLAY on top of
   whatever screen the user is on (the bell calls openNotifications()).
   No navigation — the underlying screen stays visible, dimmed.
   ============================================================ */
(function () {
  if (window.openNotifications) return;
  var CSS = '' + '.nfo-scrim{position:fixed;inset:0;background:rgba(16,32,38,0.38);z-index:9998;}' + '.nfo-panel{position:fixed;top:62px;right:20px;width:380px;max-height:min(620px,calc(100vh - 88px));' + 'background:var(--bg,#fff);border:1px solid var(--border,#e6e6e6);border-radius:var(--radius,10px);' + 'box-shadow:0 16px 48px rgba(16,32,38,0.22),0 2px 8px rgba(16,32,38,0.12);z-index:9999;' + 'display:flex;flex-direction:column;overflow:hidden;font-family:var(--font,Inter,sans-serif);}' + '.nfo-panel::before{content:"";position:absolute;top:-6px;right:24px;width:11px;height:11px;' + 'background:var(--bg,#fff);border-left:1px solid var(--border,#e6e6e6);border-top:1px solid var(--border,#e6e6e6);transform:rotate(45deg);}' + '.nfo-head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:14px 16px;border-bottom:1px solid var(--border,#e6e6e6);}' + '.nfo-title{font-size:14px;font-weight:600;color:var(--text,#1a2b2f);display:flex;align-items:baseline;gap:8px;}' + '.nfo-title .ct{font-size:11px;font-weight:500;color:var(--text-muted,#8a9499);}' + '.nfo-mark{font-size:11px;color:var(--primary,#0f5560);font-weight:500;cursor:pointer;background:none;border:none;padding:0;}' + '.nfo-mark:hover{text-decoration:underline;}' + '.nfo-tabs{display:flex;gap:2px;padding:6px 10px;border-bottom:1px solid var(--border,#e6e6e6);}' + '.nfo-tab{font-size:12px;font-weight:500;color:var(--text-secondary,#5a6a6f);background:none;border:none;cursor:pointer;' + 'padding:5px 9px;border-radius:6px;display:inline-flex;align-items:center;gap:6px;}' + '.nfo-tab.active{background:var(--primary-soft,#e7f0f1);color:var(--primary,#0f5560);}' + '.nfo-tab .bc{font-family:var(--font-mono,monospace);font-size:10px;padding:0 5px;border-radius:3px;background:var(--canvas,#f4f6f6);color:var(--text-muted,#8a9499);}' + '.nfo-tab.active .bc{background:var(--bg,#fff);color:var(--primary,#0f5560);}' + '.nfo-list{flex:1;overflow-y:auto;}' + '.nfo-day{font-size:10px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted,#8a9499);' + 'padding:10px 16px 6px;background:var(--canvas,#f4f6f6);border-bottom:1px solid var(--border,#e6e6e6);}' + '.nfo-row{display:grid;grid-template-columns:10px 1fr;gap:12px;padding:11px 16px;border-bottom:1px solid var(--border,#e6e6e6);position:relative;transition:background-color 120ms ease;}' + '.nfo-row:hover{background:var(--canvas,#f4f6f6);}' + '.nfo-row.unread{background:var(--primary-soft,#e7f0f1);}' + '.nfo-row.unread:hover{filter:brightness(0.985);}' + '.nfo-row.act{cursor:pointer;}' + '.nfo-dot{width:8px;height:8px;margin-top:6px;border-radius:999px;flex-shrink:0;}' + '.nfo-row.cat-action .nfo-dot{background:var(--text-secondary,#5a6a6f);}' + '.nfo-row.cat-info .nfo-dot{background:transparent;border:1.5px solid var(--text-muted,#8a9499);width:9px;height:9px;margin-top:5.5px;}' + '.nfo-body{display:flex;flex-direction:column;gap:2px;min-width:0;}' + '.nfo-hl{display:flex;align-items:baseline;justify-content:space-between;gap:8px;}' + '.nfo-tt{font-size:13px;font-weight:500;color:var(--text,#1a2b2f);line-height:1.35;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}' + '.nfo-row.unread .nfo-tt{font-weight:600;}' + '.nfo-tt .doc{font-family:var(--font-mono,monospace);font-weight:500;color:var(--text,#1a2b2f);}' + '.nfo-ts{font-size:11px;color:var(--text-muted,#8a9499);white-space:nowrap;flex-shrink:0;}' + '.nfo-msg{font-size:12px;color:var(--text-secondary,#5a6a6f);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}' + '.nfo-msg b{color:var(--text,#1a2b2f);font-weight:500;}' + '.nfo-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:11px 16px;border-top:1px solid var(--border,#e6e6e6);}' + '.nfo-foot a{font-size:12px;color:var(--primary,#0f5560);font-weight:500;cursor:pointer;text-decoration:none;}' + '.nfo-foot a:hover{text-decoration:underline;}' + '.nfo-foot .pref{font-size:12px;color:var(--text-muted,#8a9499);background:none;border:none;cursor:pointer;}';

  // category: 'action' | 'info'.  Routing applies only to action rows.
  var ROWS = [{
    day: 'Today · 28-May-2026'
  }, {
    cat: 'action',
    unread: true,
    title: 'Approval pending:',
    doc: 'SPEC/FG00132/01',
    ts: '2 h ago',
    msg: '<b>S. Kulkarni (QC)</b> submitted for QA review'
  }, {
    cat: 'action',
    unread: true,
    title: 'OOS opened:',
    doc: 'OOS-2026-0089',
    ts: '5 h ago',
    msg: 'Dissolution 72 % vs NLT 80 % on <b>BR-2026-04781</b>'
  }, {
    cat: 'action',
    unread: true,
    title: 'Signature required:',
    doc: 'DEV-2026-0156 r2',
    ts: '6 h ago',
    msg: '<b>M. Joshi (QA)</b> requested QA head sign-off'
  }, {
    cat: 'info',
    unread: true,
    title: 'Mentioned:',
    doc: 'BR-2026-04781 r1',
    ts: '8 h ago',
    msg: '<b>A. Nair</b> mentioned you in a review comment'
  }, {
    cat: 'info',
    unread: true,
    title: 'Issued:',
    doc: 'SPEC-EXC-0078 r5',
    ts: '10 h ago',
    msg: 'Now effective for incoming materials inspection'
  }, {
    day: 'Yesterday · 27-May-2026'
  }, {
    cat: 'action',
    unread: false,
    title: 'Approval pending:',
    doc: 'SOP-LAB-0034 r7',
    ts: 'Yesterday',
    msg: '<b>A. Nair (QC)</b> submitted HPLC method validation'
  }, {
    cat: 'info',
    unread: false,
    title: 'Calibration overdue:',
    doc: 'INST-HPLC-04',
    ts: 'Yesterday',
    msg: 'Next calibration was due 26-May-2026 · in-use locked'
  }, {
    cat: 'info',
    unread: false,
    title: 'QC approved:',
    doc: 'SPEC-API-0142 r3',
    ts: 'Yesterday',
    msg: '<b>A. Nair (QC)</b> marked Reviewed · awaiting QA'
  }];
  function routeFor(title, msg) {
    var t = (title + ' ' + msg).toLowerCase();
    if (/signature required|pending signature|sign-off|signature/.test(t)) return 'Document Approval Review.html?role=qa';
    if (/approval pending/.test(t)) return 'Document Approval Review.html';
    return null; // not an approval/signature event → inert
  }
  function esc(s) {
    return (s || '').replace(/[<>&]/g, function (c) {
      return {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;'
      }[c];
    });
  }
  function rowHtml(r) {
    if (r.day) return '<div class="nfo-day">' + esc(r.day) + '</div>';
    var route = r.cat === 'action' ? routeFor(r.title, r.msg) : null;
    var cls = 'nfo-row cat-' + r.cat + (r.unread ? ' unread' : '') + (route ? ' act' : '');
    var dataRoute = route ? ' data-route="' + route + '"' : '';
    return '<div class="' + cls + '"' + dataRoute + '>' + '<span class="nfo-dot"></span>' + '<div class="nfo-body">' + '<div class="nfo-hl"><span class="nfo-tt">' + esc(r.title) + ' <span class="doc">' + esc(r.doc) + '</span></span><span class="nfo-ts">' + esc(r.ts) + '</span></div>' + '<span class="nfo-msg">' + r.msg + '</span>' + '</div></div>';
  }
  function ensureStyle() {
    if (document.getElementById('nfo-style')) return;
    var s = document.createElement('style');
    s.id = 'nfo-style';
    s.textContent = CSS;
    document.head.appendChild(s);
  }
  function close() {
    var o = document.getElementById('nfo-overlay');
    if (o) o.remove();
    document.removeEventListener('keydown', onKey);
  }
  function onKey(e) {
    if (e.key === 'Escape') close();
  }
  window.closeNotifications = close;
  window.openNotifications = function () {
    ensureStyle();
    if (document.getElementById('nfo-overlay')) {
      close();
      return;
    } // toggle
    var wrap = document.createElement('div');
    wrap.id = 'nfo-overlay';
    var scrim = document.createElement('div');
    scrim.className = 'nfo-scrim';
    scrim.addEventListener('click', close);
    var panel = document.createElement('div');
    panel.className = 'nfo-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Notifications');
    panel.addEventListener('click', function (e) {
      e.stopPropagation();
    });
    panel.innerHTML = '<div class="nfo-head"><div class="nfo-title">Notifications<span class="ct">5 unread</span></div><button class="nfo-mark">Mark all as read</button></div>' + '<div class="nfo-tabs"><button class="nfo-tab active">All <span class="bc">12</span></button><button class="nfo-tab">Pending action <span class="bc">4</span></button><button class="nfo-tab">Informational <span class="bc">8</span></button></div>' + '<div class="nfo-list">' + ROWS.map(rowHtml).join('') + '</div>' + '<div class="nfo-foot"><a href="Notifications.html">View all notifications</a><button class="pref">Preferences</button></div>';

    // Row routing (#30)
    panel.querySelectorAll('.nfo-row.act').forEach(function (row) {
      row.addEventListener('click', function () {
        var dest = row.getAttribute('data-route');
        if (dest) location.href = dest;
      });
    });
    wrap.appendChild(scrim);
    wrap.appendChild(panel);
    document.body.appendChild(wrap);
    document.addEventListener('keydown', onKey);
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "notifications-overlay.js", error: String((e && e.message) || e) }); }

// ui_kits/ac_qms/App.jsx
try { (() => {
/* App.jsx — top-level router. Holds simple state for the active route,
   open document, signature modal, and toast notifications. */

const Placeholder = ({
  title,
  crumb,
  blurb
}) => /*#__PURE__*/React.createElement("div", {
  className: "page"
}, /*#__PURE__*/React.createElement(PageHeader, {
  crumb: crumb,
  title: title
}), /*#__PURE__*/React.createElement("div", {
  className: "card"
}, /*#__PURE__*/React.createElement("div", {
  className: "card-body",
  style: {
    padding: 'var(--s10)',
    textAlign: 'center'
  }
}, /*#__PURE__*/React.createElement("div", {
  className: "secondary text-sm"
}, blurb))));
const FilteredList = ({
  data,
  onOpenDoc,
  statusFilter,
  title,
  crumb
}) => {
  const docs = data.documents.filter(d => statusFilter.includes(d.status));
  return /*#__PURE__*/React.createElement("div", {
    className: "page"
  }, /*#__PURE__*/React.createElement(PageHeader, {
    crumb: crumb,
    title: title,
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      icon: /*#__PURE__*/React.createElement(IconPlus, {
        size: 14
      })
    }, "New")
  }), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "title"
  }, docs.length, " record", docs.length === 1 ? '' : 's'), /*#__PURE__*/React.createElement("span", {
    className: "meta"
  }, "Updated 25-May-2026 09:30 IST")), /*#__PURE__*/React.createElement("div", {
    className: "card-body card-body--flush"
  }, /*#__PURE__*/React.createElement("div", {
    className: "table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "data"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Dept"), /*#__PURE__*/React.createElement("th", null, "Owner"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Last modified"))), /*#__PURE__*/React.createElement("tbody", null, docs.map(d => /*#__PURE__*/React.createElement("tr", {
    key: d.id,
    onClick: () => onOpenDoc(d)
  }, /*#__PURE__*/React.createElement("td", {
    className: "id"
  }, d.id, " ", /*#__PURE__*/React.createElement("span", {
    className: "muted"
  }, d.rev)), /*#__PURE__*/React.createElement("td", {
    className: "title-cell"
  }, d.title), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(DepartmentBadge, {
    dept: d.dept
  })), /*#__PURE__*/React.createElement("td", {
    className: "secondary"
  }, d.owner), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(StatusPill, {
    status: d.status
  })), /*#__PURE__*/React.createElement("td", {
    className: "secondary mono text-xs"
  }, d.modified))), docs.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "6",
    style: {
      padding: 'var(--s8)',
      textAlign: 'center'
    },
    className: "secondary"
  }, "No records."))))))));
};
const App = () => {
  const data = window.QMS_DATA;
  const [route, setRoute] = React.useState('dashboard');
  const [openDoc, setOpenDoc] = React.useState(null);
  const [signing, setSigning] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [toast, setToast] = React.useState(null);

  // brief loading shimmer on every route change — typical app behavior
  const navigate = r => {
    setOpenDoc(null);
    setRoute(r);
    setLoading(true);
    setTimeout(() => setLoading(false), 350);
  };
  const openDocument = d => {
    setOpenDoc(d);
    if (d.status === 'oos') {
      setRoute('oos-detail');
    } else {
      setRoute('doc-detail');
    }
    window.scrollTo({
      top: 0
    });
  };
  const showToast = t => {
    setToast(t);
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => setToast(null), 4000);
  };
  const handleSign = reason => {
    setSigning(false);
    showToast({
      message: `Signed — ${openDoc.id} ${openDoc.rev}. Logged at 25-May-2026 09:42 IST.`
    });
  };
  let screen;
  switch (route) {
    case 'dashboard':
      screen = /*#__PURE__*/React.createElement(Dashboard, {
        data: data,
        onOpenDoc: openDocument
      });
      break;
    case 'documents':
      screen = /*#__PURE__*/React.createElement(DocumentsList, {
        data: data,
        onOpenDoc: openDocument
      });
      break;
    case 'doc-detail':
      screen = /*#__PURE__*/React.createElement(DocumentDetail, {
        doc: openDoc,
        data: data,
        onBack: () => navigate('documents'),
        onSign: () => setSigning(true)
      });
      break;
    case 'oos-detail':
      screen = /*#__PURE__*/React.createElement(DocumentDetail, {
        doc: openDoc,
        data: data,
        onBack: () => navigate('documents'),
        onSign: () => setSigning(true)
      });
      break;
    case 'batches':
      screen = /*#__PURE__*/React.createElement(FilteredList, {
        data: data,
        onOpenDoc: openDocument,
        crumb: "Batch records",
        title: "Batch records",
        statusFilter: ['signed', 'issued', 'submitted']
      });
      break;
    case 'deviations':
      screen = /*#__PURE__*/React.createElement(FilteredList, {
        data: data,
        onOpenDoc: openDocument,
        crumb: "Deviations",
        title: "Deviations",
        statusFilter: ['submitted', 'draft']
      });
      break;
    case 'oos':
      screen = /*#__PURE__*/React.createElement(OOSInvestigation, {
        data: data,
        onBack: () => navigate('documents')
      });
      break;
    case 'audit':
      screen = /*#__PURE__*/React.createElement(AuditTrail, null);
      break;
    case 'users':
      screen = /*#__PURE__*/React.createElement(Placeholder, {
        crumb: "Admin",
        title: "Users",
        blurb: "User and role administration is part of AC-QMS but not wired in this UI kit."
      });
      break;
    case 'settings':
      screen = /*#__PURE__*/React.createElement(Placeholder, {
        crumb: "Admin",
        title: "Settings",
        blurb: "System settings, integrations, and signature policies live here."
      });
      break;
    default:
      screen = /*#__PURE__*/React.createElement(Dashboard, {
        data: data,
        onOpenDoc: openDocument
      });
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppShell, {
    activeRoute: route,
    onNavigate: navigate,
    loading: loading,
    toast: toast
  }, screen), signing && openDoc && /*#__PURE__*/React.createElement(SignatureModal, {
    doc: openDoc,
    onCancel: () => setSigning(false),
    onConfirm: handleSign
  }));
};
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ac_qms/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ac_qms/AppShell.jsx
try { (() => {
/* AppShell — top bar + left navigation.
   Hairline-separated, white-on-white, no shadows.
   Loading state: 1px progress line under the top bar. */

const AppShell = ({
  activeRoute,
  onNavigate,
  loading,
  toast,
  children
}) => {
  const navItems = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: /*#__PURE__*/React.createElement(IconLayoutDashboard, {
      size: 16
    }),
    count: null
  }, {
    id: 'documents',
    label: 'Documents',
    icon: /*#__PURE__*/React.createElement(IconFileText, {
      size: 16
    }),
    count: 247
  }, {
    id: 'batches',
    label: 'Batch records',
    icon: /*#__PURE__*/React.createElement(IconPackage, {
      size: 16
    }),
    count: 89
  }, {
    id: 'deviations',
    label: 'Deviations',
    icon: /*#__PURE__*/React.createElement(IconCircleAlert, {
      size: 16
    }),
    count: 14
  }, {
    id: 'oos',
    label: 'OOS',
    icon: /*#__PURE__*/React.createElement(IconAlertTriangle, {
      size: 16
    }),
    count: 3
  }, {
    id: 'audit',
    label: 'Audit trail',
    icon: /*#__PURE__*/React.createElement(IconHistory, {
      size: 16
    }),
    count: null
  }];
  const adminItems = [{
    id: 'users',
    label: 'Users',
    icon: /*#__PURE__*/React.createElement(IconUser, {
      size: 16
    })
  }, {
    id: 'settings',
    label: 'Settings',
    icon: /*#__PURE__*/React.createElement(IconSettings, {
      size: 16
    })
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement("header", {
    className: "topbar",
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "topbar-logo"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/aditya-chemicals-logo.png",
    alt: "Aditya Chemicals"
  }), /*#__PURE__*/React.createElement("span", {
    className: "product"
  }, "AC-QMS")), /*#__PURE__*/React.createElement("div", {
    className: "topbar-search"
  }, /*#__PURE__*/React.createElement("span", {
    className: "icon-wrap"
  }, /*#__PURE__*/React.createElement(IconSearch, {
    size: 14
  })), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search documents, batches, deviations\u2026"
  })), /*#__PURE__*/React.createElement("div", {
    className: "topbar-right"
  }, /*#__PURE__*/React.createElement("span", {
    className: "env-tag"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "Prod \xB7 IST"), /*#__PURE__*/React.createElement("span", {
    className: "user-chip"
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Rohan Patel"
  }), /*#__PURE__*/React.createElement("span", null, "R. Patel"), /*#__PURE__*/React.createElement(DepartmentBadge, {
    dept: "QA"
  }))), loading ? /*#__PURE__*/React.createElement("div", {
    className: "progress-line"
  }) : null), /*#__PURE__*/React.createElement("nav", {
    className: "nav"
  }, /*#__PURE__*/React.createElement("span", {
    className: "nav-group-label"
  }, "Workflow"), navItems.map(item => /*#__PURE__*/React.createElement("div", {
    key: item.id,
    className: `nav-item ${activeRoute === item.id ? 'active' : ''}`,
    onClick: () => onNavigate(item.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "icon"
  }, item.icon), /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, item.label), item.count != null && /*#__PURE__*/React.createElement("span", {
    className: "count"
  }, item.count))), /*#__PURE__*/React.createElement("span", {
    className: "nav-group-label",
    style: {
      marginTop: 'var(--s4)'
    }
  }, "Admin"), adminItems.map(item => /*#__PURE__*/React.createElement("div", {
    key: item.id,
    className: `nav-item ${activeRoute === item.id ? 'active' : ''}`,
    onClick: () => onNavigate(item.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "icon"
  }, item.icon), /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, item.label)))), /*#__PURE__*/React.createElement("main", {
    className: "main"
  }, children), toast ? /*#__PURE__*/React.createElement("div", {
    className: `toast ${toast.kind === 'oos' ? 'toast--oos' : ''}`
  }, toast.kind === 'oos' ? /*#__PURE__*/React.createElement(IconAlertTriangle, {
    size: 16,
    style: {
      color: 'var(--oos)'
    }
  }) : /*#__PURE__*/React.createElement(IconCheck, {
    size: 16,
    style: {
      color: 'var(--primary)'
    }
  }), /*#__PURE__*/React.createElement("span", null, toast.message)) : null);
};
const PageHeader = ({
  crumb,
  title,
  actions
}) => /*#__PURE__*/React.createElement("div", {
  className: "page-header"
}, /*#__PURE__*/React.createElement("div", null, crumb && /*#__PURE__*/React.createElement("div", {
  className: "crumb"
}, crumb), /*#__PURE__*/React.createElement("div", {
  className: "title"
}, title)), actions && /*#__PURE__*/React.createElement("div", {
  className: "actions"
}, actions));
Object.assign(window, {
  AppShell,
  PageHeader
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ac_qms/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ac_qms/Atoms.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Atoms — small, composable building blocks.
   Button, StatusPill, DepartmentBadge, Input, Field, Select. */

const Button = ({
  variant = 'neutral',
  size,
  icon,
  children,
  ...rest
}) => /*#__PURE__*/React.createElement("button", _extends({
  className: `btn btn--${variant}${size === 'lg' ? ' btn--lg' : ''}`
}, rest), icon, children);
const STATUS_LABELS = {
  draft: 'Draft',
  submitted: 'Submitted',
  approved: 'Approved',
  signed: 'Signed',
  issued: 'Issued',
  oos: 'OOS',
  in_spec: 'In spec'
};
const STATUS_CLASS = {
  draft: 'pill--draft',
  submitted: 'pill--submitted',
  approved: 'pill--approved',
  signed: 'pill--signed',
  issued: 'pill--issued',
  oos: 'pill--oos',
  in_spec: 'pill--approved'
};
const StatusPill = ({
  status,
  children
}) => /*#__PURE__*/React.createElement("span", {
  className: `pill ${STATUS_CLASS[status] || 'pill--draft'}`
}, children || STATUS_LABELS[status] || status);
const DepartmentBadge = ({
  dept
}) => /*#__PURE__*/React.createElement("span", {
  className: `pill ${dept === 'QC' ? 'pill--qc' : 'pill--qa'}`
}, dept);
const Avatar = ({
  name
}) => {
  const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase();
  return /*#__PURE__*/React.createElement("span", {
    className: "avatar"
  }, initials);
};
const Field = ({
  label,
  children,
  help,
  error
}) => /*#__PURE__*/React.createElement("label", {
  className: "field"
}, label && /*#__PURE__*/React.createElement("span", {
  className: "field-label"
}, label), children, error ? /*#__PURE__*/React.createElement("span", {
  className: "text-xs",
  style: {
    color: 'var(--oos)'
  }
}, error) : help ? /*#__PURE__*/React.createElement("span", {
  className: "text-xs muted"
}, help) : null);
const Input = ({
  error,
  ...rest
}) => /*#__PURE__*/React.createElement("input", _extends({
  className: "input",
  style: error ? {
    borderColor: 'var(--oos)'
  } : undefined
}, rest));
const Select = ({
  children,
  ...rest
}) => /*#__PURE__*/React.createElement("select", _extends({
  className: "select input"
}, rest), children);
Object.assign(window, {
  Button,
  StatusPill,
  DepartmentBadge,
  Avatar,
  Field,
  Input,
  Select,
  STATUS_LABELS,
  STATUS_CLASS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ac_qms/Atoms.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ac_qms/AuditTrail.jsx
try { (() => {
/* Audit trail — system-wide log. Tabular, exhaustive, monospace timestamps. */

const AUDIT_ENTRIES = [{
  time: '25-May-2026 09:14:32 IST',
  who: 'S. Kulkarni',
  dept: 'QC',
  action: 'Created OOS',
  target: 'OOS-2026-0089',
  detail: 'Dissolution result 72 % against spec NLT 80 %.'
}, {
  time: '25-May-2026 08:02:11 IST',
  who: 'R. Patel',
  dept: 'QA',
  action: 'Created draft',
  target: 'CC-2026-0212',
  detail: 'Change control initiated — Excipient E-12.'
}, {
  time: '24-May-2026 14:02:07 IST',
  who: 'R. Patel',
  dept: 'QA',
  action: 'Approved',
  target: 'SPEC-API-0142 r3',
  detail: 'E-signature bound under 21 CFR Part 11.'
}, {
  time: '24-May-2026 13:50:44 IST',
  who: 'R. Patel',
  dept: 'QA',
  action: 'Opened',
  target: 'SPEC-API-0142 r3',
  detail: 'Opened for review.'
}, {
  time: '24-May-2026 11:48:23 IST',
  who: 'R. Patel',
  dept: 'QA',
  action: 'Signed',
  target: 'BR-2026-04781 r1',
  detail: 'Batch record signed.'
}, {
  time: '23-May-2026 16:21:09 IST',
  who: 'A. Nair',
  dept: 'QC',
  action: 'Submitted',
  target: 'SOP-LAB-0034 r7',
  detail: 'Submitted for QA review.'
}, {
  time: '23-May-2026 11:02:50 IST',
  who: 'A. Nair',
  dept: 'QC',
  action: 'Reviewed',
  target: 'SPEC-API-0142 r3',
  detail: 'Marked Reviewed.'
}, {
  time: '22-May-2026 17:39:18 IST',
  who: 'M. Joshi',
  dept: 'QA',
  action: 'Submitted',
  target: 'DEV-2026-0156 r2',
  detail: 'Deviation re-submitted with corrective action.'
}, {
  time: '22-May-2026 10:14:02 IST',
  who: 'S. Kulkarni',
  dept: 'QC',
  action: 'Submitted',
  target: 'SPEC-API-0142 r3',
  detail: 'Updated related-substances limit to NMT 0.10 %.'
}, {
  time: '20-May-2026 10:11:33 IST',
  who: 'S. Kulkarni',
  dept: 'QC',
  action: 'Issued',
  target: 'SPEC-EXC-0078 r5',
  detail: 'Issued to production.'
}];
const AuditTrail = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "page"
  }, /*#__PURE__*/React.createElement(PageHeader, {
    crumb: "Audit trail",
    title: "Audit trail",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "neutral",
      icon: /*#__PURE__*/React.createElement(IconFilter, {
        size: 14
      })
    }, "Filter"), /*#__PURE__*/React.createElement(Button, {
      variant: "neutral",
      icon: /*#__PURE__*/React.createElement(IconDownload, {
        size: 14
      })
    }, "Export CSV"))
  }), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "title"
  }, "All events"), /*#__PURE__*/React.createElement("span", {
    className: "meta"
  }, "Tamper-evident \xB7 21 CFR Part 11 compliant")), /*#__PURE__*/React.createElement("div", {
    className: "card-body card-body--flush"
  }, /*#__PURE__*/React.createElement("div", {
    className: "table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "data"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Timestamp"), /*#__PURE__*/React.createElement("th", null, "User"), /*#__PURE__*/React.createElement("th", null, "Dept"), /*#__PURE__*/React.createElement("th", null, "Action"), /*#__PURE__*/React.createElement("th", null, "Target"), /*#__PURE__*/React.createElement("th", null, "Detail"))), /*#__PURE__*/React.createElement("tbody", null, AUDIT_ENTRIES.map((e, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", {
    className: "mono text-xs muted",
    style: {
      whiteSpace: 'nowrap'
    }
  }, e.time), /*#__PURE__*/React.createElement("td", null, e.who), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(DepartmentBadge, {
    dept: e.dept
  })), /*#__PURE__*/React.createElement("td", null, e.action), /*#__PURE__*/React.createElement("td", {
    className: "id"
  }, e.target), /*#__PURE__*/React.createElement("td", {
    className: "secondary"
  }, e.detail)))))))));
};
Object.assign(window, {
  AuditTrail
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ac_qms/AuditTrail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ac_qms/Dashboard.jsx
try { (() => {
/* Dashboard — KPI tiles + a focused "Awaiting my review" queue.
   Reflects the QMS reality: a reviewer's day is a queue of records. */

const Dashboard = ({
  data,
  onOpenDoc
}) => {
  const queue = data.documents.filter(d => d.status === 'submitted' || d.status === 'oos');
  return /*#__PURE__*/React.createElement("div", {
    className: "page"
  }, /*#__PURE__*/React.createElement(PageHeader, {
    crumb: "Home \xB7 25-May-2026",
    title: "My queue",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "neutral",
      icon: /*#__PURE__*/React.createElement(IconDownload, {
        size: 14
      })
    }, "Export queue"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      icon: /*#__PURE__*/React.createElement(IconPlus, {
        size: 14
      })
    }, "New document"))
  }), /*#__PURE__*/React.createElement("div", {
    className: "kpi-row"
  }, data.kpis.map(k => /*#__PURE__*/React.createElement("div", {
    className: "kpi",
    key: k.label
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, k.label), /*#__PURE__*/React.createElement("span", {
    className: `value ${k.oos ? 'value--oos' : ''}`
  }, k.value), /*#__PURE__*/React.createElement("span", {
    className: "delta"
  }, k.delta)))), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "title"
  }, "Awaiting my review"), /*#__PURE__*/React.createElement("span", {
    className: "meta"
  }, "Sorted by oldest first")), /*#__PURE__*/React.createElement("div", {
    className: "card-body card-body--flush"
  }, /*#__PURE__*/React.createElement("div", {
    className: "table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "data"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Document"), /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Dept"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Last modified"))), /*#__PURE__*/React.createElement("tbody", null, queue.map(d => /*#__PURE__*/React.createElement("tr", {
    key: d.id,
    onClick: () => onOpenDoc(d)
  }, /*#__PURE__*/React.createElement("td", {
    className: "id"
  }, d.id, " ", /*#__PURE__*/React.createElement("span", {
    className: "muted"
  }, d.rev)), /*#__PURE__*/React.createElement("td", {
    className: "title-cell"
  }, d.title, /*#__PURE__*/React.createElement("div", {
    className: "text-xs muted",
    style: {
      marginTop: 2
    }
  }, d.type)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(DepartmentBadge, {
    dept: d.dept
  })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(StatusPill, {
    status: d.status
  })), /*#__PURE__*/React.createElement("td", {
    className: "secondary mono text-xs"
  }, d.modified)))))))));
};
Object.assign(window, {
  Dashboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ac_qms/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ac_qms/DocumentDetail.jsx
try { (() => {
/* DocumentDetail — spec / record view with parameters table, signatures, audit trail.
   Routes branch on doc.status === 'oos' to show the OOSBanner. */

const DocumentDetail = ({
  doc,
  data,
  onBack,
  onSign
}) => {
  const spec = data.spec;
  const isOOS = doc.status === 'oos';
  const oos = data.oos;
  return /*#__PURE__*/React.createElement("div", {
    className: "page"
  }, /*#__PURE__*/React.createElement(PageHeader, {
    crumb: /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      style: {
        cursor: 'pointer'
      },
      onClick: onBack
    }, "Documents"), " \u203A ", doc.id),
    title: doc.title,
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "neutral",
      icon: /*#__PURE__*/React.createElement(IconHistory, {
        size: 14
      })
    }, "History"), /*#__PURE__*/React.createElement(Button, {
      variant: "neutral",
      icon: /*#__PURE__*/React.createElement(IconDownload, {
        size: 14
      })
    }, "Export PDF"), doc.status === 'submitted' || doc.status === 'draft' ? /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      icon: /*#__PURE__*/React.createElement(IconPenLine, {
        size: 14
      }),
      onClick: onSign
    }, "Sign & approve") : doc.status === 'oos' ? /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      icon: /*#__PURE__*/React.createElement(IconArrowRight, {
        size: 14
      })
    }, "Open investigation") : /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      icon: /*#__PURE__*/React.createElement(IconLock, {
        size: 14
      }),
      disabled: true
    }, "Locked"))
  }), isOOS && /*#__PURE__*/React.createElement("div", {
    className: "oos-banner"
  }, /*#__PURE__*/React.createElement(IconAlertTriangle, {
    size: 20,
    className: "icon"
  }), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, "Result outside specification"), /*#__PURE__*/React.createElement("div", {
    className: "desc"
  }, oos.parameter, ": ", /*#__PURE__*/React.createElement("b", {
    className: "mono"
  }, oos.result), " against spec ", /*#__PURE__*/React.createElement("b", {
    className: "mono"
  }, oos.spec), ".", ' ', "Investigation required (", oos.cfr, "). Affected batch: ", /*#__PURE__*/React.createElement("b", {
    className: "mono"
  }, oos.affectedBatch), "."), /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "danger"
  }, "Quarantine batch"), /*#__PURE__*/React.createElement(Button, {
    variant: "neutral"
  }, "Notify QA head")))), /*#__PURE__*/React.createElement("div", {
    className: "detail-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("dl", {
    className: "doc-meta"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Document ID"), /*#__PURE__*/React.createElement("dd", {
    className: "mono"
  }, doc.id)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Revision"), /*#__PURE__*/React.createElement("dd", {
    className: "mono"
  }, doc.rev)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Department"), /*#__PURE__*/React.createElement("dd", null, /*#__PURE__*/React.createElement(DepartmentBadge, {
    dept: doc.dept
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Status"), /*#__PURE__*/React.createElement("dd", null, /*#__PURE__*/React.createElement(StatusPill, {
    status: doc.status
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Type"), /*#__PURE__*/React.createElement("dd", null, doc.type)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Owner"), /*#__PURE__*/React.createElement("dd", null, doc.owner)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Last modified"), /*#__PURE__*/React.createElement("dd", {
    className: "mono"
  }, doc.modified)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Effective from"), /*#__PURE__*/React.createElement("dd", {
    className: "mono"
  }, "26-May-2026"))), /*#__PURE__*/React.createElement("section", {
    className: "doc-section"
  }, /*#__PURE__*/React.createElement("h3", null, "Purpose"), /*#__PURE__*/React.createElement("p", null, spec.purpose)), /*#__PURE__*/React.createElement("section", {
    className: "doc-section"
  }, /*#__PURE__*/React.createElement("h3", null, "Acceptance criteria"), /*#__PURE__*/React.createElement("table", {
    className: "spec-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      width: 70
    }
  }, "Test #"), /*#__PURE__*/React.createElement("th", null, "Parameter"), /*#__PURE__*/React.createElement("th", null, "Method"), /*#__PURE__*/React.createElement("th", null, "Specification"), /*#__PURE__*/React.createElement("th", null, "Result"), /*#__PURE__*/React.createElement("th", null, "Evaluation"))), /*#__PURE__*/React.createElement("tbody", null, spec.parameters.map(p => /*#__PURE__*/React.createElement("tr", {
    key: p.id
  }, /*#__PURE__*/React.createElement("td", {
    className: "id"
  }, p.id), /*#__PURE__*/React.createElement("td", null, p.parameter), /*#__PURE__*/React.createElement("td", {
    className: "secondary"
  }, p.method), /*#__PURE__*/React.createElement("td", {
    className: "mono"
  }, p.spec), /*#__PURE__*/React.createElement("td", {
    className: `mono ${p.evaluation === 'oos' ? 'oos' : ''}`
  }, p.result), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(StatusPill, {
    status: p.evaluation
  })))), isOOS && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    className: "id"
  }, "AP-07"), /*#__PURE__*/React.createElement("td", null, "Dissolution (Q30 min)"), /*#__PURE__*/React.createElement("td", {
    className: "secondary"
  }, "USP <711>"), /*#__PURE__*/React.createElement("td", {
    className: "mono"
  }, "NLT 80 %"), /*#__PURE__*/React.createElement("td", {
    className: "mono oos"
  }, "72 %"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(StatusPill, {
    status: "oos"
  }))))))), /*#__PURE__*/React.createElement("aside", {
    className: "col gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "title"
  }, "Signatures")), /*#__PURE__*/React.createElement("div", {
    className: "card-body",
    style: {
      paddingTop: 0,
      paddingBottom: 0
    }
  }, spec.signatures.map((s, i) => /*#__PURE__*/React.createElement("div", {
    className: "sig-panel-row",
    key: i
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: s.name
  }), /*#__PURE__*/React.createElement("div", {
    className: "who",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "name"
  }, s.name), /*#__PURE__*/React.createElement("span", {
    className: "text-xs secondary"
  }, s.role, " \xB7 ", /*#__PURE__*/React.createElement(DepartmentBadge, {
    dept: s.dept
  }))), /*#__PURE__*/React.createElement("span", {
    className: "time"
  }, s.time))))), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "title"
  }, "Audit trail")), /*#__PURE__*/React.createElement("div", {
    className: "card-body",
    style: {
      paddingTop: 0,
      paddingBottom: 'var(--s3)'
    }
  }, spec.audit.map((a, i) => /*#__PURE__*/React.createElement("div", {
    className: "audit-row",
    key: i,
    style: {
      gridTemplateColumns: '120px 1fr'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ts"
  }, a.time), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "who"
  }, a.who), /*#__PURE__*/React.createElement("span", {
    className: "text-xs secondary",
    style: {
      display: 'block',
      marginTop: 2
    }
  }, a.what)))))))));
};
Object.assign(window, {
  DocumentDetail
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ac_qms/DocumentDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ac_qms/DocumentsList.jsx
try { (() => {
/* Documents — list view with filter bar and status chips. */

const STATUS_CHIPS = [{
  id: 'all',
  label: 'All'
}, {
  id: 'mine',
  label: 'My queue'
}, {
  id: 'draft',
  label: 'Draft'
}, {
  id: 'submitted',
  label: 'Submitted'
}, {
  id: 'approved',
  label: 'Approved'
}, {
  id: 'signed',
  label: 'Signed'
}, {
  id: 'oos',
  label: 'OOS'
}];
const DocumentsList = ({
  data,
  onOpenDoc
}) => {
  const [filter, setFilter] = React.useState('all');
  const [query, setQuery] = React.useState('');
  const filtered = data.documents.filter(d => {
    if (filter !== 'all' && filter !== 'mine' && d.status !== filter) return false;
    if (filter === 'mine' && d.owner !== 'R. Patel') return false;
    if (query && !`${d.id} ${d.title}`.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "page"
  }, /*#__PURE__*/React.createElement(PageHeader, {
    crumb: "Documents",
    title: "Documents",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "neutral",
      icon: /*#__PURE__*/React.createElement(IconDownload, {
        size: 14
      })
    }, "Export"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      icon: /*#__PURE__*/React.createElement(IconPlus, {
        size: 14
      })
    }, "New document"))
  }), /*#__PURE__*/React.createElement("div", {
    className: "filter-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "search"
  }, /*#__PURE__*/React.createElement("span", {
    className: "icon-wrap"
  }, /*#__PURE__*/React.createElement(IconSearch, {
    size: 14
  })), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search by document ID or title\u2026",
    value: query,
    onChange: e => setQuery(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "chip-group"
  }, STATUS_CHIPS.map(c => /*#__PURE__*/React.createElement("span", {
    key: c.id,
    className: `chip ${filter === c.id ? 'active' : ''}`,
    onClick: () => setFilter(c.id)
  }, c.label))), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    icon: /*#__PURE__*/React.createElement(IconFilter, {
      size: 14
    })
  }, "More filters")), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "title"
  }, filtered.length, " documents"), /*#__PURE__*/React.createElement("span", {
    className: "meta"
  }, "Updated 25-May-2026 09:30 IST")), /*#__PURE__*/React.createElement("div", {
    className: "card-body card-body--flush"
  }, /*#__PURE__*/React.createElement("div", {
    className: "table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "data"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Document"), /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Type"), /*#__PURE__*/React.createElement("th", null, "Dept"), /*#__PURE__*/React.createElement("th", null, "Owner"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Last modified"))), /*#__PURE__*/React.createElement("tbody", null, filtered.map(d => /*#__PURE__*/React.createElement("tr", {
    key: d.id,
    onClick: () => onOpenDoc(d)
  }, /*#__PURE__*/React.createElement("td", {
    className: "id"
  }, d.id, " ", /*#__PURE__*/React.createElement("span", {
    className: "muted"
  }, d.rev)), /*#__PURE__*/React.createElement("td", {
    className: "title-cell"
  }, d.title), /*#__PURE__*/React.createElement("td", {
    className: "secondary"
  }, d.type), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(DepartmentBadge, {
    dept: d.dept
  })), /*#__PURE__*/React.createElement("td", {
    className: "secondary"
  }, d.owner), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(StatusPill, {
    status: d.status
  })), /*#__PURE__*/React.createElement("td", {
    className: "secondary mono text-xs"
  }, d.modified))), filtered.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "7",
    style: {
      padding: 'var(--s8)',
      textAlign: 'center'
    },
    className: "secondary"
  }, "No documents match."))))))));
};
Object.assign(window, {
  DocumentsList
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ac_qms/DocumentsList.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ac_qms/Icons.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Icons.jsx — Lucide icon subset rendered as inline SVG React components.
   Stroke 1.75, currentColor — matches AC-QMS clinical aesthetic.
   Icon source paths: lucide.dev (ISC license). */

const Icon = ({
  size = 16,
  stroke = 1.75,
  children,
  ...rest
}) => /*#__PURE__*/React.createElement("svg", _extends({
  className: "icon",
  xmlns: "http://www.w3.org/2000/svg",
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: stroke,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, rest), children);
const IconLayoutDashboard = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("rect", {
  x: "3",
  y: "3",
  width: "7",
  height: "9"
}), /*#__PURE__*/React.createElement("rect", {
  x: "14",
  y: "3",
  width: "7",
  height: "5"
}), /*#__PURE__*/React.createElement("rect", {
  x: "14",
  y: "12",
  width: "7",
  height: "9"
}), /*#__PURE__*/React.createElement("rect", {
  x: "3",
  y: "16",
  width: "7",
  height: "5"
}));
const IconFileText = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M14 2v4a2 2 0 0 0 2 2h4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8 13h8"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8 17h6"
}));
const IconPackage = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "m7.5 4.27 9 5.15"
}), /*#__PURE__*/React.createElement("path", {
  d: "M21 8 12 13 3 8"
}), /*#__PURE__*/React.createElement("path", {
  d: "M21 8v8a2 2 0 0 1-1 1.73l-7 4a2 2 0 0 1-2 0l-7-4A2 2 0 0 1 3 16V8"
}), /*#__PURE__*/React.createElement("path", {
  d: "m3.3 7 7.7 4.4 7.7-4.4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 22V12"
}));
const IconAlertTriangle = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 9v4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 17h.01"
}));
const IconCircleAlert = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "10"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "8",
  x2: "12",
  y2: "12"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "16",
  x2: "12.01",
  y2: "16"
}));
const IconPenLine = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M12 20h9"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4Z"
}));
const IconCheck = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polyline", {
  points: "20 6 9 17 4 12"
}));
const IconX = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /*#__PURE__*/React.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
}));
const IconSearch = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
  cx: "11",
  cy: "11",
  r: "8"
}), /*#__PURE__*/React.createElement("path", {
  d: "m21 21-4.3-4.3"
}));
const IconFilter = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polygon", {
  points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
}));
const IconUser = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "7",
  r: "4"
}));
const IconHistory = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 3v5h5"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 7v5l4 2"
}));
const IconSettings = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "3"
}));
const IconLock = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("rect", {
  width: "18",
  height: "11",
  x: "3",
  y: "11",
  rx: "2",
  ry: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M7 11V7a5 5 0 0 1 10 0v4"
}));
const IconChevronRight = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "m9 18 6-6-6-6"
}));
const IconChevronDown = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "m6 9 6 6 6-6"
}));
const IconPlus = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M12 5v14"
}), /*#__PURE__*/React.createElement("path", {
  d: "M5 12h14"
}));
const IconArrowRight = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M5 12h14"
}), /*#__PURE__*/React.createElement("path", {
  d: "m12 5 7 7-7 7"
}));
const IconDownload = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "7 10 12 15 17 10"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "15",
  x2: "12",
  y2: "3"
}));
const IconBell = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
}), /*#__PURE__*/React.createElement("path", {
  d: "M10.3 21a1.94 1.94 0 0 0 3.4 0"
}));
Object.assign(window, {
  Icon,
  IconLayoutDashboard,
  IconFileText,
  IconPackage,
  IconAlertTriangle,
  IconCircleAlert,
  IconPenLine,
  IconCheck,
  IconX,
  IconSearch,
  IconFilter,
  IconUser,
  IconHistory,
  IconSettings,
  IconLock,
  IconChevronRight,
  IconChevronDown,
  IconPlus,
  IconArrowRight,
  IconDownload,
  IconBell
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ac_qms/Icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ac_qms/OOSInvestigation.jsx
try { (() => {
/* OOS investigation screen — focused workflow page.
   Mirrors how a regulated investigation is anchored: banner up top,
   structured facts, root-cause workspace, then sign-off. */

const OOSInvestigation = ({
  data,
  onBack
}) => {
  const oos = data.oos;
  return /*#__PURE__*/React.createElement("div", {
    className: "page"
  }, /*#__PURE__*/React.createElement(PageHeader, {
    crumb: /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      style: {
        cursor: 'pointer'
      },
      onClick: onBack
    }, "Documents"), " \u203A ", oos.id),
    title: oos.title,
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "neutral",
      icon: /*#__PURE__*/React.createElement(IconHistory, {
        size: 14
      })
    }, "Audit trail"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      icon: /*#__PURE__*/React.createElement(IconPenLine, {
        size: 14
      })
    }, "Submit Phase I"))
  }), /*#__PURE__*/React.createElement("div", {
    className: "oos-banner"
  }, /*#__PURE__*/React.createElement(IconAlertTriangle, {
    size: 20,
    className: "icon"
  }), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, "Out-Of-Specification \u2014 investigation open"), /*#__PURE__*/React.createElement("div", {
    className: "desc"
  }, oos.parameter, " measured at ", /*#__PURE__*/React.createElement("b", {
    className: "mono"
  }, oos.result), " against specification ", /*#__PURE__*/React.createElement("b", {
    className: "mono"
  }, oos.spec), ". Discovered ", /*#__PURE__*/React.createElement("b", {
    className: "mono"
  }, oos.discovered), ". Investigation required per ", oos.cfr, "."))), /*#__PURE__*/React.createElement("div", {
    className: "detail-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "title"
  }, "Investigation facts")), /*#__PURE__*/React.createElement("dl", {
    className: "doc-meta",
    style: {
      borderBottom: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "OOS ID"), /*#__PURE__*/React.createElement("dd", {
    className: "mono"
  }, oos.id)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Affected batch"), /*#__PURE__*/React.createElement("dd", {
    className: "mono"
  }, oos.affectedBatch)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Product"), /*#__PURE__*/React.createElement("dd", null, oos.product)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Parameter"), /*#__PURE__*/React.createElement("dd", null, oos.parameter)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Specification"), /*#__PURE__*/React.createElement("dd", {
    className: "mono"
  }, oos.spec)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Result"), /*#__PURE__*/React.createElement("dd", {
    className: "mono",
    style: {
      color: 'var(--oos)',
      fontWeight: 600
    }
  }, oos.result)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Discovered"), /*#__PURE__*/React.createElement("dd", {
    className: "mono"
  }, oos.discovered)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Regulatory ref"), /*#__PURE__*/React.createElement("dd", {
    className: "mono"
  }, oos.cfr)))), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "title"
  }, "Phase I \u2014 Laboratory investigation")), /*#__PURE__*/React.createElement("div", {
    className: "card-body col gap-4"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Initial assessment"
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "input",
    style: {
      height: 90,
      padding: 10,
      resize: 'vertical',
      fontFamily: 'var(--font)'
    },
    defaultValue: "Apparent assay value within spec; dissolution Q30 below NLT 80 %. Operator confirmed correct vessel selection. Dissolution media pH verified pre-test (pH 5.8, within range)."
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Hypothesis"
  }, /*#__PURE__*/React.createElement(Select, {
    defaultValue: "formulation"
  }, /*#__PURE__*/React.createElement("option", {
    value: "lab_error"
  }, "Laboratory error"), /*#__PURE__*/React.createElement("option", {
    value: "sampling"
  }, "Sampling error"), /*#__PURE__*/React.createElement("option", {
    value: "formulation"
  }, "Formulation / manufacturing variability"), /*#__PURE__*/React.createElement("option", {
    value: "equipment"
  }, "Equipment / instrument fault"), /*#__PURE__*/React.createElement("option", {
    value: "unknown"
  }, "Cause not yet determined"))), /*#__PURE__*/React.createElement(Field, {
    label: "Retest authorised by",
    help: "Bound to e-signature on submission."
  }, /*#__PURE__*/React.createElement(Input, {
    defaultValue: "R. Patel (QA)",
    readOnly: true
  }))))), /*#__PURE__*/React.createElement("aside", {
    className: "col gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "title"
  }, "Investigators")), /*#__PURE__*/React.createElement("div", {
    className: "card-body",
    style: {
      paddingTop: 0,
      paddingBottom: 0
    }
  }, oos.investigators.map((p, i) => /*#__PURE__*/React.createElement("div", {
    className: "sig-panel-row",
    key: i
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: p.name
  }), /*#__PURE__*/React.createElement("div", {
    className: "who",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "name"
  }, p.name), /*#__PURE__*/React.createElement("span", {
    className: "text-xs secondary"
  }, p.role, " \xB7 ", /*#__PURE__*/React.createElement(DepartmentBadge, {
    dept: p.dept
  }))))))), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "title"
  }, "Linked records")), /*#__PURE__*/React.createElement("div", {
    className: "card-body col gap-3",
    style: {
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row gap-2"
  }, /*#__PURE__*/React.createElement(IconPackage, {
    size: 14,
    className: "secondary"
  }), /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, oos.affectedBatch), /*#__PURE__*/React.createElement("span", {
    className: "muted text-xs",
    style: {
      marginLeft: 'auto'
    }
  }, "Batch record")), /*#__PURE__*/React.createElement("div", {
    className: "row gap-2"
  }, /*#__PURE__*/React.createElement(IconFileText, {
    size: 14,
    className: "secondary"
  }), /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, "SPEC-API-0142 r3"), /*#__PURE__*/React.createElement("span", {
    className: "muted text-xs",
    style: {
      marginLeft: 'auto'
    }
  }, "Spec")), /*#__PURE__*/React.createElement("div", {
    className: "row gap-2"
  }, /*#__PURE__*/React.createElement(IconFileText, {
    size: 14,
    className: "secondary"
  }), /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, "SOP-LAB-0034 r7"), /*#__PURE__*/React.createElement("span", {
    className: "muted text-xs",
    style: {
      marginLeft: 'auto'
    }
  }, "SOP")))), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "title"
  }, "Phase status")), /*#__PURE__*/React.createElement("div", {
    className: "card-body col gap-3",
    style: {
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row gap-3"
  }, /*#__PURE__*/React.createElement(StatusPill, {
    status: "submitted"
  }, "In progress"), /*#__PURE__*/React.createElement("span", null, "Phase I \u2014 Lab")), /*#__PURE__*/React.createElement("div", {
    className: "row gap-3"
  }, /*#__PURE__*/React.createElement(StatusPill, {
    status: "draft"
  }, "Pending"), /*#__PURE__*/React.createElement("span", null, "Phase II \u2014 Full")), /*#__PURE__*/React.createElement("div", {
    className: "row gap-3"
  }, /*#__PURE__*/React.createElement(StatusPill, {
    status: "draft"
  }, "Pending"), /*#__PURE__*/React.createElement("span", null, "CAPA")), /*#__PURE__*/React.createElement("div", {
    className: "row gap-3"
  }, /*#__PURE__*/React.createElement(StatusPill, {
    status: "draft"
  }, "Pending"), /*#__PURE__*/React.createElement("span", null, "Closure")))))));
};
Object.assign(window, {
  OOSInvestigation
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ac_qms/OOSInvestigation.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ac_qms/SignatureModal.jsx
try { (() => {
/* Signature modal — 21 CFR Part 11 e-signature confirmation.
   Instant appearance (no animation), backdrop only transparency in system. */

const SignatureModal = ({
  doc,
  onCancel,
  onConfirm
}) => {
  const [pwd, setPwd] = React.useState('');
  const [reason, setReason] = React.useState('Approval');
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-backdrop",
    onMouseDown: onCancel
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal",
    onMouseDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, "Sign & approve \u2014 ", doc.id), /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 'var(--s4)'
    }
  }, "You are about to apply your bound electronic signature to", /*#__PURE__*/React.createElement("b", null, " ", doc.id, " ", doc.rev), ". This action is irreversible and logged to the tamper-evident audit trail under 21 CFR Part 11."), /*#__PURE__*/React.createElement(Field, {
    label: "Reason for signature"
  }, /*#__PURE__*/React.createElement(Select, {
    value: reason,
    onChange: e => setReason(e.target.value)
  }, /*#__PURE__*/React.createElement("option", null, "Approval"), /*#__PURE__*/React.createElement("option", null, "Review"), /*#__PURE__*/React.createElement("option", null, "Authorisation"), /*#__PURE__*/React.createElement("option", null, "Issuance"))), /*#__PURE__*/React.createElement(Field, {
    label: "Re-enter password",
    help: "Confirms your identity (21 CFR 11.200)."
  }, /*#__PURE__*/React.createElement(Input, {
    type: "password",
    autoFocus: true,
    value: pwd,
    onChange: e => setPwd(e.target.value),
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "neutral",
    onClick: onCancel
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    disabled: pwd.length < 4,
    onClick: () => onConfirm(reason)
  }, "Apply signature"))));
};
Object.assign(window, {
  SignatureModal
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ac_qms/SignatureModal.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ac_qms/data.js
try { (() => {
/* Sample data for the AC-QMS prototype — realistic pharma QMS records.
   Plain JS — loaded before the React app so screens can read window.QMS_DATA. */

window.QMS_DATA = {
  user: {
    name: 'Rohan Patel',
    initials: 'RP',
    role: 'QA Reviewer',
    department: 'QA'
  },
  kpis: [{
    label: 'Awaiting my review',
    value: 6,
    delta: '+2 since yesterday'
  }, {
    label: 'Open deviations',
    value: 14,
    delta: '4 high priority'
  }, {
    label: 'OOS investigations',
    value: 3,
    delta: '1 over SLA',
    oos: true
  }, {
    label: 'Batches in process',
    value: 28,
    delta: '12 awaiting release'
  }],
  documents: [{
    id: 'SPEC-API-0142',
    rev: 'r3',
    title: 'Acetaminophen API — release specification',
    type: 'Specification',
    dept: 'QC',
    status: 'approved',
    owner: 'S. Kulkarni',
    modified: '24-May-2026 14:02 IST'
  }, {
    id: 'BR-2026-04781',
    rev: 'r1',
    title: 'Batch record · Lot A4781 — Paracetamol 500 mg',
    type: 'Batch record',
    dept: 'QA',
    status: 'signed',
    owner: 'R. Patel',
    modified: '24-May-2026 11:48 IST'
  }, {
    id: 'OOS-2026-0089',
    rev: 'r0',
    title: 'Dissolution outside specification — Lot A4781',
    type: 'OOS investigation',
    dept: 'QC',
    status: 'oos',
    owner: 'S. Kulkarni',
    modified: '25-May-2026 09:14 IST'
  }, {
    id: 'SOP-LAB-0034',
    rev: 'r7',
    title: 'HPLC method validation — Paracetamol assay',
    type: 'SOP',
    dept: 'QC',
    status: 'submitted',
    owner: 'A. Nair',
    modified: '23-May-2026 16:21 IST'
  }, {
    id: 'CC-2026-0212',
    rev: 'r0',
    title: 'Change control — supplier qualification, Excipient E-12',
    type: 'Change control',
    dept: 'QA',
    status: 'draft',
    owner: 'R. Patel',
    modified: '25-May-2026 08:02 IST'
  }, {
    id: 'DEV-2026-0156',
    rev: 'r2',
    title: 'Deviation — pH meter calibration overdue',
    type: 'Deviation',
    dept: 'QA',
    status: 'submitted',
    owner: 'M. Joshi',
    modified: '22-May-2026 17:39 IST'
  }, {
    id: 'SPEC-EXC-0078',
    rev: 'r5',
    title: 'Excipient E-12 — incoming material spec',
    type: 'Specification',
    dept: 'QC',
    status: 'issued',
    owner: 'S. Kulkarni',
    modified: '20-May-2026 10:11 IST'
  }, {
    id: 'BR-2026-04780',
    rev: 'r1',
    title: 'Batch record · Lot A4780 — Paracetamol 500 mg',
    type: 'Batch record',
    dept: 'QA',
    status: 'issued',
    owner: 'R. Patel',
    modified: '19-May-2026 15:30 IST'
  }],
  // Detail of SPEC-API-0142
  spec: {
    id: 'SPEC-API-0142',
    rev: 'r3',
    title: 'Acetaminophen API — release specification',
    purpose: 'Release specification and acceptance criteria for Acetaminophen Active Pharmaceutical Ingredient (API), in accordance with USP <711> and in-house method ACI-API-021.',
    parameters: [{
      id: 'AP-01',
      parameter: 'Description',
      method: 'Visual',
      spec: 'White crystalline powder',
      result: 'White crystalline powder',
      evaluation: 'in_spec'
    }, {
      id: 'AP-02',
      parameter: 'Identification (IR)',
      method: 'USP <197M>',
      spec: 'Conforms to RS',
      result: 'Conforms',
      evaluation: 'in_spec'
    }, {
      id: 'AP-03',
      parameter: 'Assay',
      method: 'HPLC',
      spec: 'NLT 98.0 %',
      result: '99.74 %',
      evaluation: 'in_spec'
    }, {
      id: 'AP-04',
      parameter: 'Related substances',
      method: 'HPLC',
      spec: 'NMT 0.10 %',
      result: '0.04 %',
      evaluation: 'in_spec'
    }, {
      id: 'AP-05',
      parameter: 'Loss on drying',
      method: 'USP <731>',
      spec: 'NMT 0.5 %',
      result: '0.21 %',
      evaluation: 'in_spec'
    }, {
      id: 'AP-06',
      parameter: 'Residual solvents',
      method: 'GC',
      spec: 'Meets USP <467>',
      result: 'Meets',
      evaluation: 'in_spec'
    }],
    signatures: [{
      role: 'Prepared by',
      name: 'S. Kulkarni',
      dept: 'QC',
      time: '22-May-2026 10:14 IST'
    }, {
      role: 'Reviewed by',
      name: 'A. Nair',
      dept: 'QC',
      time: '23-May-2026 11:02 IST'
    }, {
      role: 'Approved by',
      name: 'R. Patel',
      dept: 'QA',
      time: '24-May-2026 14:02 IST'
    }],
    audit: [{
      time: '24-May-2026 14:02 IST',
      who: 'R. Patel (QA)',
      what: 'Approved revision r3. E-signature bound.'
    }, {
      time: '24-May-2026 13:50 IST',
      who: 'R. Patel (QA)',
      what: 'Opened r3 for review.'
    }, {
      time: '23-May-2026 11:02 IST',
      who: 'A. Nair (QC)',
      what: 'Marked Reviewed.'
    }, {
      time: '22-May-2026 10:14 IST',
      who: 'S. Kulkarni (QC)',
      what: 'Submitted r3 — updated related-substances limit.'
    }, {
      time: '20-May-2026 09:00 IST',
      who: 'S. Kulkarni (QC)',
      what: 'Created revision r3 from r2.'
    }]
  },
  // Detail of OOS-2026-0089
  oos: {
    id: 'OOS-2026-0089',
    title: 'Dissolution outside specification — Lot A4781',
    affectedBatch: 'BR-2026-04781',
    product: 'Paracetamol 500 mg tablets',
    parameter: 'Dissolution (Q30 min)',
    spec: 'NLT 80 %',
    result: '72 %',
    discovered: '25-May-2026 09:14 IST',
    cfr: '21 CFR 211.192',
    investigators: [{
      role: 'Lead investigator',
      name: 'S. Kulkarni',
      dept: 'QC'
    }, {
      role: 'QA oversight',
      name: 'R. Patel',
      dept: 'QA'
    }]
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ac_qms/data.js", error: String((e && e.message) || e) }); }

})();
