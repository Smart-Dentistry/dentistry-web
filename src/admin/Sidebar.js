import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Layout, Menu } from 'antd'
import PropTypes from 'prop-types'
import {
  faTooth,
  faChartLine,
  faCalendar,
  faUsers,
  faFileInvoiceDollar,
  faUserMd
} from '@fortawesome/free-solid-svg-icons'

const { Sider } = Layout

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  }
  const items = [
    { key: '1', icon: faChartLine, label: 'Dashboard' },
    { key: '2', icon: faCalendar, label: 'Calendar' },
    { key: '3', icon: faUsers, label: 'Patients' },
    { key: '4', icon: faFileInvoiceDollar, label: 'Billing' },
    { key: '5', icon: faUserMd, label: 'Users' }
  ]
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      {collapsed ? (
        <h3 style={{ fontSize: '2rem', paddingTop: '0.5rem', textAlign: 'center' }}>
          <FontAwesomeIcon icon={faTooth} style={{ color: 'white' }} />
        </h3>
      ) : (
        <h3 style={{ color: 'white', padding: '0.5rem', fontSize: '1.25rem' }}>
          <FontAwesomeIcon icon={faTooth} style={{ color: 'white', marginRight: '0.5rem' }} />
          <span style={{ fontWeight: 'bold' }}>Smart Dentistry</span>
        </h3>
      )}
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        { items.map((item) => (
          <Menu.Item key={item.key} icon={<FontAwesomeIcon icon={item.icon} style={{ minWidth: '18px' }} />}>
            {collapsed ? null : <span style={{ marginLeft: '0.75rem' }}>{item.label}</span>}
          </Menu.Item>
        )) }
      </Menu>
    </Sider>
  )
}

Sidebar.propTypes = {
  collapsed: PropTypes.bool,
  onCollapse: PropTypes.func
}

export default Sidebar
