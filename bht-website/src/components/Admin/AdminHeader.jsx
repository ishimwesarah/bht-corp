import React from 'react';
import './AdminUI.css';

const AdminHeader = ({ title, subtitle, children }) => (
  <div className="admin-header">
    <div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
    <div>{children}</div>
  </div>
);

export default AdminHeader;