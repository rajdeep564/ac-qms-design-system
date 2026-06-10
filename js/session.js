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

  function findNavItemByLabel(labelText) {
    var items = document.querySelectorAll('a.nav-item');
    var target = String(labelText).toLowerCase();
    for (var i = 0; i < items.length; i++) {
      var label = items[i].querySelector('.label');
      if (label && label.textContent.trim().toLowerCase() === target) return items[i];
    }
    return null;
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
    return null;
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
  }

  function wireSidebarNav() {
    var user = getCurrentUser();
    if (!user) return;
    document.querySelectorAll('a.nav-item').forEach(function (item) {
      if (item.getAttribute('href')) return;
      var label = item.querySelector('.label');
      if (!label) return;
      var href = navHrefForLabel(label.textContent, user);
      if (href) item.href = href;
    });
  }

  function applyAppShell() {
    var user = getCurrentUser();
    if (!user) return;

    guardDashboardRole();
    wireSidebarNav();
    document.querySelectorAll('a[href="Dashboard.html"]').forEach(function (a) {
      a.href = getDashboardForUser(user);
    });

    var sidebarUser = document.querySelector('.sidebar-user');
    if (sidebarUser) {
      var nameEl = sidebarUser.querySelector('.who > .name');
      if (nameEl) nameEl.textContent = user.fullName;

      var roleEl = sidebarUser.querySelector('.role');
      if (roleEl) roleEl.textContent = user.designation;

      var avatarEl = sidebarUser.querySelector('.avatar');
      if (avatarEl) avatarEl.textContent = initials(user.fullName);

      var badgeEl = sidebarUser.querySelector('.dept-badge');
      if (badgeEl) {
        if (user.department) {
          badgeEl.textContent = user.department;
          badgeEl.classList.remove('dept-badge--qc', 'dept-badge--qa');
          badgeEl.classList.add(user.department === 'QA' ? 'dept-badge--qa' : 'dept-badge--qc');
          badgeEl.style.display = '';
        } else {
          badgeEl.style.display = 'none';
        }
      }

      if (!sidebarUser.querySelector('[data-ac-qms-logout]')) {
        sidebarUser.removeAttribute('role');
        sidebarUser.style.cursor = 'default';

        var logoutLink = document.createElement('a');
        logoutLink.href = '#';
        logoutLink.setAttribute('data-ac-qms-logout', '');
        logoutLink.textContent = 'Log out';
        logoutLink.style.cssText = 'font-size: 11px; color: var(--text-muted); text-decoration: none; margin-top: 2px;';
        logoutLink.addEventListener('click', function (e) {
          e.preventDefault();
          logout();
          location.href = 'index.html';
        });

        var who = sidebarUser.querySelector('.who');
        if (who) who.appendChild(logoutLink);
      }

      var chev = sidebarUser.querySelector('.chev');
      if (chev) chev.style.display = 'none';
    }

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

    var isSuperAdmin = hasRole('SUPER_ADMIN');
    var usersNav = findNavItemByLabel('Users');
    var permNav = findNavItemByLabel('Permissions matrix');
    if (usersNav) usersNav.style.display = isSuperAdmin ? '' : 'none';
    if (permNav) permNav.style.display = isSuperAdmin ? '' : 'none';
    if (usersNav) {
      var adminLabel = usersNav.previousElementSibling;
      if (adminLabel && adminLabel.classList.contains('nav-group-label') &&
          adminLabel.textContent.trim().toLowerCase() === 'administration') {
        adminLabel.style.display = isSuperAdmin ? '' : 'none';
      }
    }

    var auditNav = findNavItemByLabel('Audit log');
    if (auditNav) {
      var canSeeAudit = hasRole('SUPER_ADMIN') || hasRole('QC_MGR') || hasRole('QA_MGR');
      auditNav.style.display = canSeeAudit ? '' : 'none';
    }

    applyDashboardGreeting();
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
