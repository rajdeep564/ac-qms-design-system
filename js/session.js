(function () {
  'use strict';

  var STORAGE_KEY = 'ac-qms-current-user';

  var USERS = [
    {
      username: 'admin',
      fullName: 'Rajesh Kumar',
      designation: 'Super Admin',
      department: null,
      role: 'SUPER_ADMIN',
      signLabel: 'Super Admin'
    },
    {
      username: 'qc.exec',
      fullName: 'Kavya Patel',
      designation: 'QC Executive',
      department: 'QC',
      role: 'QC_EXEC',
      signLabel: 'Executive-QC'
    },
    {
      username: 'qc.mgr',
      fullName: 'Priya Mehta',
      designation: 'QC Manager',
      department: 'QC',
      role: 'QC_MGR',
      signLabel: 'Manager-QC'
    },
    {
      username: 'qa.exec',
      fullName: 'Anand Joshi',
      designation: 'QA Executive',
      department: 'QA',
      role: 'QA_EXEC',
      signLabel: 'Executive-QA'
    },
    {
      username: 'qa.mgr',
      fullName: 'Sanjay Reddy',
      designation: 'QA Manager',
      department: 'QA',
      role: 'QA_MGR',
      signLabel: 'Manager-QA'
    }
  ];

  function findUser(username) {
    if (!username) return null;
    var key = String(username).trim().toLowerCase();
    for (var i = 0; i < USERS.length; i++) {
      if (USERS[i].username.toLowerCase() === key) return USERS[i];
    }
    return null;
  }

  function initials(fullName) {
    var parts = String(fullName || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '?';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function shortName(fullName) {
    var parts = String(fullName || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '';
    if (parts.length === 1) return parts[0];
    return parts[0][0] + '. ' + parts[parts.length - 1];
  }

  function getCurrentUser() {
    try {
      return findUser(localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      return null;
    }
  }

  function setCurrentUser(username) {
    var user = findUser(username);
    if (!user) return false;
    try {
      localStorage.setItem(STORAGE_KEY, user.username);
    } catch (e) {
      return false;
    }
    return true;
  }

  function logout() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      /* ignore */
    }
  }

  function requireAuth() {
    if (!getCurrentUser()) {
      location.href = 'index.html';
      return false;
    }
    return true;
  }

  function hasRole(role) {
    var user = getCurrentUser();
    return !!(user && user.role === role);
  }

  function isDepartment(dept) {
    var user = getCurrentUser();
    if (!user || !user.department || !dept) return false;
    return user.department.toLowerCase() === String(dept).toLowerCase();
  }

  function getDashboardForUser(user) {
    if (!user) return 'index.html';
    switch (user.username) {
      case 'admin':
        return 'User Management Console.html';
      case 'qc.exec':
        return 'QC Executive Dashboard.html';
      case 'qc.mgr':
        return 'QC Manager Dashboard.html';
      case 'qa.exec':
      case 'qa.mgr':
        return 'QA Manager Dashboard.html';
      default:
        return 'QC Executive Dashboard.html';
    }
  }

  function navHrefForNavId(navId, user) {
    switch (navId) {
      case 'dashboard': return getDashboardForUser(user);
      case 'batches': return 'Batch Pipeline.html';
      case 'product-masters': return 'Product Masters.html';
      case 'instruments': return 'Instrument Master.html';
      case 'reports': return 'Reports Hub.html';
      case 'audit-log': return 'Audit Log Viewer.html';
      case 'users': return 'User Management Console.html';
      case 'permissions-matrix': return 'Permissions Matrix.html';
      case 'reset-demo': return null;
      default: return null;
    }
  }

  function navHrefForLabel(label, user) {
    var key = String(label || '').trim().toLowerCase();
    if (key === 'dashboard') return getDashboardForUser(user);
    if (key === 'approvals' || key === 'pending signatures') return getDashboardForUser(user);
    if (key === 'my batches' || key === 'batches') return 'Batch Pipeline.html';
    if (key === 'product masters' || key === 'masters') return 'Product Masters.html';
    if (key.indexOf('instruments') !== -1) return 'Instrument Master.html';
    if (key === 'reports') return 'Reports Hub.html';
    if (key === 'audit log') return 'Audit Log Viewer.html';
    if (key === 'users') return 'User Management Console.html';
    if (key === 'permissions matrix') return 'Permissions Matrix.html';
    if (key === 'reset demo') return null;
    return null;
  }

  var NAV_ACTIVE_BY_PATH = {
    'dashboard.html': 'dashboard',
    'qc executive dashboard.html': 'dashboard',
    'qc manager dashboard.html': 'dashboard',
    'qa manager dashboard.html': 'dashboard',
    'user management console.html': 'users',
    'batch pipeline.html': 'batches',
    'batch detail.html': 'batches',
    'create batch.html': 'batches',
    'released batches register.html': 'batches',
    'product masters.html': 'product-masters',
    'product master editor.html': 'product-masters',
    'create product master.html': 'product-masters',
    'test parameter editor.html': 'product-masters',
    'moa section editor.html': 'product-masters',
    'instrument master.html': 'instruments',
    'reagent master.html': 'instruments',
    'reports hub.html': 'reports',
    'audit log viewer.html': 'audit-log',
    'permissions matrix.html': 'permissions-matrix',
    'create spec.html': 'batches',
    'create spec - review step.html': 'batches',
    'aws data entry.html': 'batches',
    'document approval review.html': 'batches',
    'coa sign & issue.html': 'batches',
    'document timeline.html': 'batches',
    'notifications.html': 'dashboard'
  };

  function detectNavActive() {
    if (document.body && document.body.dataset.navActive) {
      return document.body.dataset.navActive;
    }
    var path = (location.pathname.split('/').pop() || '').toLowerCase();
    try {
      path = decodeURIComponent(path);
    } catch (e) { /* ignore */ }
    return NAV_ACTIVE_BY_PATH[path] || null;
  }

  function roleMatchesNavRoles(userRole, rolesAttr) {
    if (!rolesAttr || rolesAttr === '*') return true;
    var parts = rolesAttr.split(',');
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].trim() === userRole) return true;
    }
    return false;
  }

  function injectCanonicalSidebarStyles() {
    if (document.getElementById('ac-qms-shell-nav-css')) return;
    var link = document.createElement('link');
    link.id = 'ac-qms-shell-nav-css';
    link.rel = 'stylesheet';
    link.href = 'css/shell-nav.css';
    document.head.appendChild(link);
  }

  function renderCanonicalSidebar() {
    var nav = document.querySelector('.sidebar-nav');
    if (!nav) return;

    nav.innerHTML =
      '<span class="nav-group-label">Workflow</span>' +
      '<a class="nav-item" data-nav-id="dashboard" data-nav-roles="*">' +
        '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' +
          '<rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" />' +
          '<rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" />' +
        '</svg><span class="label">Dashboard</span></a>' +
      '<a class="nav-item" data-nav-id="batches" data-nav-roles="*">' +
        '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="m7.5 4.27 9 5.15" /><path d="M21 8 12 13 3 8" />' +
          '<path d="M21 8v8a2 2 0 0 1-1 1.73l-7 4a2 2 0 0 1-2 0l-7-4A2 2 0 0 1 3 16V8" />' +
          '<path d="m3.3 7 7.7 4.4 7.7-4.4" /><path d="M12 22V12" />' +
        '</svg><span class="label">Batches</span><span class="count" data-sidebar-batch-count></span></a>' +
      '<a class="nav-item" data-nav-id="product-masters" data-nav-roles="*">' +
        '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />' +
          '<polyline points="7.5 4.21 12 6.81 16.5 4.21" />' +
          '<polyline points="7.5 19.79 7.5 14.6 3 12" />' +
          '<polyline points="21 12 16.5 14.6 16.5 19.79" />' +
        '</svg><span class="label">Product Masters</span></a>' +
      '<a class="nav-item" data-nav-id="instruments" data-nav-roles="*">' +
        '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M10 2v8L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45L14 10V2" />' +
          '<path d="M8.5 2h7" /><path d="M7 16h10" />' +
        '</svg><span class="label">Instruments &amp; reagents</span></a>' +
      '<a class="nav-item" data-nav-id="reports" data-nav-roles="*">' +
        '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M3 3v18h18" /><path d="m7 14 4-4 4 4 5-5" />' +
        '</svg><span class="label">Reports</span></a>' +
      '<a class="nav-item" data-nav-id="audit-log" data-nav-roles="SUPER_ADMIN,QC_MGR,QA_MGR">' +
        '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />' +
          '<path d="M3 3v5h5" /><path d="M12 7v5l4 2" />' +
        '</svg><span class="label">Audit log</span></a>' +
      '<span class="nav-group-label" data-nav-group="administration" data-nav-roles="SUPER_ADMIN">Administration</span>' +
      '<a class="nav-item" data-nav-id="users" data-nav-roles="SUPER_ADMIN">' +
        '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />' +
        '</svg><span class="label">Users</span><span class="admin-tag">Super</span></a>' +
      '<a class="nav-item" data-nav-id="permissions-matrix" data-nav-roles="SUPER_ADMIN">' +
        '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />' +
        '</svg><span class="label">Permissions Matrix</span><span class="admin-tag">Super</span></a>' +
      '<a class="nav-item" href="#" data-nav-id="reset-demo" data-nav-roles="SUPER_ADMIN">' +
        '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />' +
          '<path d="M3 3v5h5" />' +
        '</svg><span class="label">Reset demo</span></a>';

    var activeId = detectNavActive();
    if (activeId) {
      var activeEl = nav.querySelector('[data-nav-id="' + activeId + '"]');
      if (activeEl) activeEl.classList.add('active');
    }
  }

  function applySidebarRoleVisibility(user) {
    if (!user) return;
    var nav = document.querySelector('.sidebar-nav');
    if (!nav) return;

    nav.querySelectorAll('[data-nav-roles]').forEach(function (el) {
      var roles = el.getAttribute('data-nav-roles');
      var show = roleMatchesNavRoles(user.role, roles);
      el.style.display = show ? '' : 'none';
    });

    var adminLabel = nav.querySelector('[data-nav-group="administration"]');
    if (adminLabel) {
      var anyAdminVisible = false;
      nav.querySelectorAll('[data-nav-id="users"], [data-nav-id="permissions-matrix"], [data-nav-id="reset-demo"]').forEach(function (item) {
        if (item.style.display !== 'none') anyAdminVisible = true;
      });
      adminLabel.style.display = anyAdminVisible ? '' : 'none';
    }
  }

  function applySidebarBatchCount(user) {
    if (!user) return;
    var batchesNav = document.querySelector('[data-nav-id="batches"]');
    if (!batchesNav) return;

    var labelEl = batchesNav.querySelector('.label');
    var countEl = batchesNav.querySelector('[data-sidebar-batch-count]');
    var count = 0;

    if (user.role === 'QC_EXEC' && typeof getAssignedBatchCount === 'function') {
      if (labelEl) labelEl.textContent = 'My batches';
      count = getAssignedBatchCount(user.username);
    } else {
      if (labelEl) labelEl.textContent = 'Batches';
      if (typeof getActiveBatchCount === 'function') {
        count = getActiveBatchCount();
      }
    }
    if (countEl) countEl.textContent = String(count);
  }

  function wireResetDemoNav() {
    var resetNav = document.querySelector('[data-nav-id="reset-demo"]');
    if (!resetNav || resetNav.dataset.acQmsResetWired) return;
    resetNav.dataset.acQmsResetWired = '1';
    resetNav.addEventListener('click', function (e) {
      e.preventDefault();
      if (typeof resetToBaseline === 'function') resetToBaseline();
      location.reload();
    });
  }

  var DASHBOARD_ROLE_ALLOW = {
    QC_EXEC: ['QC_EXEC'],
    QC_MGR: ['QC_MGR'],
    QA_MGR: ['QA_MGR', 'QA_EXEC']
  };

  function guardDashboardRole() {
    var expected = document.body && document.body.dataset.dashboardRole;
    if (!expected) return;
    var user = getCurrentUser();
    if (!user) return;
    if (user.role === 'SUPER_ADMIN') return;
    var allowed = DASHBOARD_ROLE_ALLOW[expected];
    if (!allowed || allowed.indexOf(user.role) !== -1) return;
    location.replace(getDashboardForUser(user));
  }

  function guardCreateProductMasterAccess() {
    if (!requireAuth()) return false;
    var user = getCurrentUser();
    if (user.role === 'QC_EXEC' || user.role === 'SUPER_ADMIN') return true;
    location.replace(getDashboardForUser(user));
    return false;
  }

  function guardCreateBatchAccess() {
    if (!requireAuth()) return false;
    var user = getCurrentUser();
    if (user.role === 'QC_MGR' || user.role === 'SUPER_ADMIN') return true;
    location.replace(getDashboardForUser(user));
    return false;
  }

  function applyDashboardGreeting() {
    var user = getCurrentUser();
    if (!user) return;
    var greetingSpan = document.querySelector('.page-header .greeting > span:first-child');
    if (greetingSpan) greetingSpan.textContent = 'Good morning, ' + user.fullName;

    var dayEl = document.querySelector('.page-header .greeting .day');
    if (dayEl) {
      var now = new Date();
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      var dayName = days[now.getDay()];
      var dateStr = String(now.getDate()).padStart(2, '0') + '-' + months[now.getMonth()] + '-' + now.getFullYear();
      var timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
      var sep = ' \u00b7 ';
      dayEl.textContent = dayName + sep + dateStr + sep + timeStr + ' IST';
    }
  }

  function applyEnvTagText() {
    document.querySelectorAll('.env-tag').forEach(function (tag) {
      var dot = tag.querySelector('.dot');
      if (dot) {
        tag.innerHTML = '';
        tag.appendChild(dot);
        tag.appendChild(document.createTextNode('Prod \u00b7 IST'));
      } else if (tag.textContent.indexOf('\uFFFD') !== -1 || tag.textContent.indexOf('?') !== -1) {
        tag.textContent = 'Prod \u00b7 IST';
      }
    });
  }

  function wireSidebarNav() {
    var user = getCurrentUser();
    if (!user) return;
    document.querySelectorAll('a.nav-item[data-nav-id]').forEach(function (item) {
      var navId = item.getAttribute('data-nav-id');
      if (navId === 'reset-demo') return;
      var href = navHrefForNavId(navId, user);
      if (href) item.href = href;
    });
    document.querySelectorAll('a.nav-item:not([data-nav-id])').forEach(function (item) {
      if (item.getAttribute('href')) return;
      var label = item.querySelector('.label');
      if (!label) return;
      var href = navHrefForLabel(label.textContent, user);
      if (href) item.href = href;
    });
    wireResetDemoNav();
  }

  function applySidebarUser(user) {
    var sidebarUser = document.querySelector('.sidebar-user');
    if (!sidebarUser || !user) return;

    var avatarEl = sidebarUser.querySelector('.avatar');
    if (!avatarEl) {
      avatarEl = document.createElement('span');
      avatarEl.className = 'avatar';
      sidebarUser.insertBefore(avatarEl, sidebarUser.firstChild);
    }
    avatarEl.textContent = initials(user.fullName);

    var who = sidebarUser.querySelector('.who');
    if (!who) {
      who = document.createElement('div');
      who.className = 'who';
      sidebarUser.appendChild(who);
    }

    who.innerHTML =
      '<span class="name"></span>' +
      '<div class="role-row">' +
        '<span class="role"></span>' +
        '<span class="dept-badge"></span>' +
      '</div>' +
      '<a href="#" data-ac-qms-logout>Log out</a>';

    who.querySelector('.name').textContent = user.fullName;
    who.querySelector('.role').textContent = user.designation;

    var badgeEl = who.querySelector('.dept-badge');
    if (user.department) {
      badgeEl.textContent = user.department;
      badgeEl.classList.remove('dept-badge--qc', 'dept-badge--qa');
      badgeEl.classList.add(user.department === 'QA' ? 'dept-badge--qa' : 'dept-badge--qc');
      badgeEl.style.display = '';
    } else {
      badgeEl.style.display = 'none';
    }

    var logoutLink = who.querySelector('[data-ac-qms-logout]');
    if (logoutLink && !logoutLink.dataset.acQmsLogoutWired) {
      logoutLink.dataset.acQmsLogoutWired = '1';
      logoutLink.addEventListener('click', function (e) {
        e.preventDefault();
        logout();
        location.href = 'index.html';
      });
    }

    sidebarUser.removeAttribute('role');
    sidebarUser.style.cursor = 'default';

    var chev = sidebarUser.querySelector('.chev');
    if (chev) chev.style.display = 'none';
  }

  function applyAppShell() {
    var user = getCurrentUser();
    if (!user) return;

    guardDashboardRole();
    injectCanonicalSidebarStyles();
    renderCanonicalSidebar();
    applySidebarRoleVisibility(user);
    applySidebarBatchCount(user);
    wireSidebarNav();
    document.querySelectorAll('a[href="Dashboard.html"]').forEach(function (a) {
      a.href = getDashboardForUser(user);
    });

    applySidebarUser(user);

    var userChip = document.querySelector('.user-chip');
    if (userChip) {
      var chipAvatar = userChip.querySelector('.avatar');
      if (chipAvatar) chipAvatar.textContent = initials(user.fullName);
      var nameSpan = userChip.querySelector('span:not(.avatar):not(.chev)');
      if (nameSpan) nameSpan.textContent = shortName(user.fullName);
      if (!userChip.dataset.acQmsWired) {
        userChip.dataset.acQmsWired = '1';
        userChip.style.cursor = 'pointer';
        userChip.addEventListener('click', function () {
          location.href = getDashboardForUser(user);
        });
      }
    }

    applyDashboardGreeting();
    applyEnvTagText();
  }

  window.USERS = USERS;
  window.getCurrentUser = getCurrentUser;
  window.setCurrentUser = setCurrentUser;
  window.logout = logout;
  window.requireAuth = requireAuth;
  window.hasRole = hasRole;
  window.isDepartment = isDepartment;
  window.getDashboardForUser = getDashboardForUser;
  window.applyAppShell = applyAppShell;
  window.guardCreateProductMasterAccess = guardCreateProductMasterAccess;
  window.guardCreateBatchAccess = guardCreateBatchAccess;
  window.wireSidebarNav = wireSidebarNav;
  window.navHrefForLabel = navHrefForLabel;
  window.initials = initials;
  window.shortName = shortName;

  function signModalUrl(next, context) {
    var url = 'Sign Modal.html?next=' + encodeURIComponent(next);
    if (context) url += '&context=' + encodeURIComponent(context);
    return url;
  }
  window.signModalUrl = signModalUrl;
})();
