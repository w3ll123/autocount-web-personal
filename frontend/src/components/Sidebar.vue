<template>
  <aside class="sidebar">
    <div class="brand">
      <div class="brand-logo">AC</div>
      <div>
        <p class="brand-name">AutoCount</p>
        <p class="brand-tag">Business Management</p>
      </div>
    </div>

    <nav class="nav">
      <RouterLink to="/" class="nav-link" active-class="active">
        <span class="dot"></span>
        Dashboard
      </RouterLink>

      <RouterLink to="/invoices" class="nav-link" active-class="active">
        <span class="dot"></span>
        Invoices
      </RouterLink>

      <RouterLink to="/customers" class="nav-link" active-class="active">
        <span class="dot"></span>
        Customers
      </RouterLink>

      <RouterLink to="/items" class="nav-link" active-class="active">
        <span class="dot"></span>
        Items
      </RouterLink>

      <RouterLink to="/reports" class="nav-link" active-class="active">
        <span class="dot"></span>
        Reports
      </RouterLink>
    </nav>

    <div class="footer">
      <div class="user">
        <div class="avatar">R</div>
        <div>
          <p class="user-name">Rowell</p>
          <p class="user-role">Admin</p>
        </div>
      </div>
      <p class="copyright">© 2026 AutoCount</p>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 240px;
  min-height: 100vh;
  background: #0b1220;
  color: #e2e8f0;
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  border-right: 1px solid #1e293b;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 6px 24px;
  border-bottom: 1px solid #1e293b;
  margin-bottom: 24px;
}

.brand-logo {
  width: 40px;
  height: 40px;
  background: #14b8a6;
  color: #0b1220;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.5px;
}

.brand-name {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #e2e8f0;
}

.brand-tag {
  margin: 2px 0 0;
  font-size: 11px;
  color: #64748b;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 8px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.15s ease, color 0.15s ease;
}

.nav-link:hover {
  background: #131c2e;
  color: #e2e8f0;
}

.nav-link.active {
  background: #14b8a6;
  color: #0b1220;
  font-weight: 600;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.6;
}

.nav-link.active .dot {
  opacity: 1;
  background: #0b1220;
}

.footer {
  border-top: 1px solid #1e293b;
  padding-top: 16px;
  margin-top: 16px;
}

.user {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 6px;
}

.avatar {
  width: 34px;
  height: 34px;
  background: #1e293b;
  color: #14b8a6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
}

.user-name {
  margin: 0;
  font-size: 13px;
  color: #e2e8f0;
  font-weight: 600;
}

.user-role {
  margin: 2px 0 0;
  font-size: 11px;
  color: #64748b;
}

.copyright {
  margin: 12px 6px 0;
  font-size: 11px;
  color: #475569;
}
</style>
