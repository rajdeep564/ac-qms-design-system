/* ============================================================
   AC-QMS — Notifications overlay
   Renders the notification panel as a popover OVERLAY on top of
   whatever screen the user is on (the bell calls openNotifications()).
   No navigation — the underlying screen stays visible, dimmed.
   ============================================================ */
(function () {
  if (window.openNotifications) return;

  var CSS = ''
    + '.nfo-scrim{position:fixed;inset:0;background:rgba(16,32,38,0.38);z-index:9998;}'
    + '.nfo-panel{position:fixed;top:62px;right:20px;width:380px;max-height:min(620px,calc(100vh - 88px));'
    + 'background:var(--bg,#fff);border:1px solid var(--border,#e6e6e6);border-radius:var(--radius,10px);'
    + 'box-shadow:0 16px 48px rgba(16,32,38,0.22),0 2px 8px rgba(16,32,38,0.12);z-index:9999;'
    + 'display:flex;flex-direction:column;overflow:hidden;font-family:var(--font,Inter,sans-serif);}'
    + '.nfo-panel::before{content:"";position:absolute;top:-6px;right:24px;width:11px;height:11px;'
    + 'background:var(--bg,#fff);border-left:1px solid var(--border,#e6e6e6);border-top:1px solid var(--border,#e6e6e6);transform:rotate(45deg);}'
    + '.nfo-head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:14px 16px;border-bottom:1px solid var(--border,#e6e6e6);}'
    + '.nfo-title{font-size:14px;font-weight:600;color:var(--text,#1a2b2f);display:flex;align-items:baseline;gap:8px;}'
    + '.nfo-title .ct{font-size:11px;font-weight:500;color:var(--text-muted,#8a9499);}'
    + '.nfo-mark{font-size:11px;color:var(--primary,#0f5560);font-weight:500;cursor:pointer;background:none;border:none;padding:0;}'
    + '.nfo-mark:hover{text-decoration:underline;}'
    + '.nfo-tabs{display:flex;gap:2px;padding:6px 10px;border-bottom:1px solid var(--border,#e6e6e6);}'
    + '.nfo-tab{font-size:12px;font-weight:500;color:var(--text-secondary,#5a6a6f);background:none;border:none;cursor:pointer;'
    + 'padding:5px 9px;border-radius:6px;display:inline-flex;align-items:center;gap:6px;}'
    + '.nfo-tab.active{background:var(--primary-soft,#e7f0f1);color:var(--primary,#0f5560);}'
    + '.nfo-tab .bc{font-family:var(--font-mono,monospace);font-size:10px;padding:0 5px;border-radius:3px;background:var(--canvas,#f4f6f6);color:var(--text-muted,#8a9499);}'
    + '.nfo-tab.active .bc{background:var(--bg,#fff);color:var(--primary,#0f5560);}'
    + '.nfo-list{flex:1;overflow-y:auto;}'
    + '.nfo-day{font-size:10px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted,#8a9499);'
    + 'padding:10px 16px 6px;background:var(--canvas,#f4f6f6);border-bottom:1px solid var(--border,#e6e6e6);}'
    + '.nfo-row{display:grid;grid-template-columns:10px 1fr;gap:12px;padding:11px 16px;border-bottom:1px solid var(--border,#e6e6e6);position:relative;transition:background-color 120ms ease;}'
    + '.nfo-row:hover{background:var(--canvas,#f4f6f6);}'
    + '.nfo-row.unread{background:var(--primary-soft,#e7f0f1);}'
    + '.nfo-row.unread:hover{filter:brightness(0.985);}'
    + '.nfo-row.act{cursor:pointer;}'
    + '.nfo-dot{width:8px;height:8px;margin-top:6px;border-radius:999px;flex-shrink:0;}'
    + '.nfo-row.cat-action .nfo-dot{background:var(--text-secondary,#5a6a6f);}'
    + '.nfo-row.cat-info .nfo-dot{background:transparent;border:1.5px solid var(--text-muted,#8a9499);width:9px;height:9px;margin-top:5.5px;}'
    + '.nfo-body{display:flex;flex-direction:column;gap:2px;min-width:0;}'
    + '.nfo-hl{display:flex;align-items:baseline;justify-content:space-between;gap:8px;}'
    + '.nfo-tt{font-size:13px;font-weight:500;color:var(--text,#1a2b2f);line-height:1.35;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}'
    + '.nfo-row.unread .nfo-tt{font-weight:600;}'
    + '.nfo-tt .doc{font-family:var(--font-mono,monospace);font-weight:500;color:var(--text,#1a2b2f);}'
    + '.nfo-ts{font-size:11px;color:var(--text-muted,#8a9499);white-space:nowrap;flex-shrink:0;}'
    + '.nfo-msg{font-size:12px;color:var(--text-secondary,#5a6a6f);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}'
    + '.nfo-msg b{color:var(--text,#1a2b2f);font-weight:500;}'
    + '.nfo-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:11px 16px;border-top:1px solid var(--border,#e6e6e6);}'
    + '.nfo-foot a{font-size:12px;color:var(--primary,#0f5560);font-weight:500;cursor:pointer;text-decoration:none;}'
    + '.nfo-foot a:hover{text-decoration:underline;}'
    + '.nfo-foot .pref{font-size:12px;color:var(--text-muted,#8a9499);background:none;border:none;cursor:pointer;}';

  function getOverlayRows() {
    if (typeof getNotificationsForUser === 'function' && typeof getCurrentUser === 'function') {
      var user = getCurrentUser();
      if (user) {
        var rows = [];
        var lastDay = '';
        getNotificationsForUser(user.username).forEach(function (n) {
          if (n.dayGroup !== lastDay) {
            rows.push({ day: n.dayGroup });
            lastDay = n.dayGroup;
          }
          rows.push({
            cat: n.category,
            unread: !!n.unread,
            title: n.titlePrefix,
            doc: n.docNo,
            ts: n.timestamp,
            msg: n.messageHtml.replace(/<span class="who">/g, '<b>').replace(/<\/span>/g, '</b>'),
            route: n.route || null
          });
        });
        return rows;
      }
    }
    return [
      { day: 'Today · 28-May-2026' },
      { cat: 'action', unread: true, title: 'Approval pending:', doc: 'AWS/GCN/01', ts: '2 h ago', msg: '<b>Kavya Patel (QC)</b> submitted for review', route: 'Document Approval Review.html?docNo=AWS%2FFG00038%2F01' }
    ];
  }

  function routeFor(row) {
    if (row.route) return row.route;
    var t = ((row.title || '') + ' ' + (row.msg || '')).toLowerCase();
    if (/signature required|pending signature|sign-off|signature/.test(t)) return 'Document Approval Review.html?role=qa';
    if (/approval pending/.test(t)) return 'Document Approval Review.html';
    return null;
  }

  function esc(s) { return (s || '').replace(/[<>&]/g, function (c) { return { '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]; }); }

  function rowHtml(r) {
    if (r.day) return '<div class="nfo-day">' + esc(r.day) + '</div>';
    var route = r.cat === 'action' ? routeFor(r) : null;
    var cls = 'nfo-row cat-' + r.cat + (r.unread ? ' unread' : '') + (route ? ' act' : '');
    var dataRoute = route ? ' data-route="' + route + '"' : '';
    return '<div class="' + cls + '"' + dataRoute + '>' +
      '<span class="nfo-dot"></span>' +
      '<div class="nfo-body">' +
        '<div class="nfo-hl"><span class="nfo-tt">' + esc(r.title) + ' <span class="doc">' + esc(r.doc) + '</span></span><span class="nfo-ts">' + esc(r.ts) + '</span></div>' +
        '<span class="nfo-msg">' + r.msg + '</span>' +
      '</div></div>';
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
  function onKey(e) { if (e.key === 'Escape') close(); }

  window.closeNotifications = close;
  window.openNotifications = function () {
    ensureStyle();
    if (document.getElementById('nfo-overlay')) { close(); return; } // toggle
    var wrap = document.createElement('div');
    wrap.id = 'nfo-overlay';

    var scrim = document.createElement('div');
    scrim.className = 'nfo-scrim';
    scrim.addEventListener('click', close);

    var panel = document.createElement('div');
    panel.className = 'nfo-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Notifications');
    panel.addEventListener('click', function (e) { e.stopPropagation(); });
    var rows = getOverlayRows();
    var items = rows.filter(function (r) { return !r.day; });
    var unreadN = items.filter(function (r) { return r.unread; }).length;
    var actionN = items.filter(function (r) { return r.cat === 'action'; }).length;
    var infoN = items.filter(function (r) { return r.cat === 'info'; }).length;
    var listHtml = items.length
      ? rows.map(rowHtml).join('')
      : '<div class="list-empty" style="margin:var(--s4);color:var(--text-muted,#8a9499);border:1px solid var(--border,#e6e6e6);padding:var(--s6) var(--s5);text-align:center;font-size:var(--text-sm,13px);">No notifications.</div>';
    panel.innerHTML =
      '<div class="nfo-head"><div class="nfo-title">Notifications<span class="ct">' + unreadN + ' unread</span></div><button class="nfo-mark">Mark all as read</button></div>' +
      '<div class="nfo-tabs"><button class="nfo-tab active">All <span class="bc">' + items.length + '</span></button><button class="nfo-tab">Pending action <span class="bc">' + actionN + '</span></button><button class="nfo-tab">Informational <span class="bc">' + infoN + '</span></button></div>' +
      '<div class="nfo-list">' + listHtml + '</div>' +
      '<div class="nfo-foot"><a href="Notifications.html">View all notifications</a><button class="pref">Preferences</button></div>';

    // Row routing (#30)
    panel.querySelectorAll('.nfo-row.act').forEach(function (row) {
      row.addEventListener('click', function () {
        var dest = row.getAttribute('data-route');
        if (dest) location.href = dest;
      });
    });

    var tabs = panel.querySelectorAll('.nfo-tab');
    var listEl = panel.querySelector('.nfo-list');
    tabs.forEach(function (tab, idx) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        listEl.querySelectorAll('.nfo-row').forEach(function (row) {
          if (idx === 0) row.style.display = '';
          else if (idx === 1) row.style.display = row.classList.contains('cat-action') ? '' : 'none';
          else row.style.display = row.classList.contains('cat-info') ? '' : 'none';
        });
        listEl.querySelectorAll('.nfo-day').forEach(function (day) {
          var next = day.nextElementSibling;
          var anyVisible = false;
          while (next && !next.classList.contains('nfo-day')) {
            if (next.classList.contains('nfo-row') && next.style.display !== 'none') anyVisible = true;
            next = next.nextElementSibling;
          }
          day.style.display = anyVisible ? '' : 'none';
        });
      });
    });

    var markBtn = panel.querySelector('.nfo-mark');
    if (markBtn) {
      markBtn.addEventListener('click', function () {
        listEl.querySelectorAll('.nfo-row.unread').forEach(function (row) {
          row.classList.remove('unread');
        });
        var ct = panel.querySelector('.nfo-title .ct');
        if (ct) ct.textContent = '0 unread';
      });
    }

    wrap.appendChild(scrim);
    wrap.appendChild(panel);
    document.body.appendChild(wrap);
    document.addEventListener('keydown', onKey);
  };
})();
