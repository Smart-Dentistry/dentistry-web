import React from 'react'
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

const Sidebar = ({ onCollapse, collapsed }) => {
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
        <Menu.Item key="1" icon={<FontAwesomeIcon icon={faChartLine} style={{ minWidth: '18px' }} />}>
          {collapsed ? null : <span style={{ marginLeft: '0.75rem' }}>Dashboard</span>}
        </Menu.Item>
        <Menu.Item key="2" icon={<FontAwesomeIcon icon={faCalendar} style={{ minWidth: '18px' }} />}>
          {collapsed ? null : <span style={{ marginLeft: '0.75rem' }}>Calendar</span>}
        </Menu.Item>
        <Menu.Item key="3" icon={<FontAwesomeIcon icon={faUsers} style={{ minWidth: '18px' }} />}>
          {collapsed ? null : <span style={{ marginLeft: '0.75rem' }}>Patients</span>}
        </Menu.Item>
        <Menu.Item key="4" icon={<FontAwesomeIcon icon={faFileInvoiceDollar} style={{ minWidth: '18px' }} />}>
          {collapsed ? null : <span style={{ marginLeft: '0.75rem' }}>Billing</span>}
        </Menu.Item>
        <Menu.Item key="5" icon={<FontAwesomeIcon icon={faUserMd} style={{ minWidth: '18px' }} />}>
          {collapsed ? null : <span style={{ marginLeft: '0.75rem' }}>Users</span>}
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

Sidebar.propTypes = {
  collapsed: PropTypes.bool,
  onCollapse: PropTypes.func
}

export default Sidebar
