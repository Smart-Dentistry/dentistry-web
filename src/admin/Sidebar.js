import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
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
const items = [
  { key: '1', icon: faChartLine, label: 'Dashboard', path: '/admin/dashboard' },
  { key: '2', icon: faCalendar, label: 'Calendar', path: '/admin/calendar' },
  { key: '3', icon: faUsers, label: 'Patients', path: '/admin/patients' },
  { key: '4', icon: faFileInvoiceDollar, label: 'Billing', path: '/admin/billing' },
  { key: '5', icon: faUserMd, label: 'Users', path: '/admin/users' }
]

const Sidebar = ({ setLayoutWidth }) => {
  const location = useLocation()
  const history = useHistory()
  const [collapsed, setCollapsed] = useState(false)
  const computeSelected = () => {
    const selected = items.find(_item => location.pathname.startsWith(_item.path))
    return selected ? selected.key : null
  }
  const [selectedKey, setSelectedKey] = useState(computeSelected())

  useEffect(() => {
    setSelectedKey(computeSelected())
  }, [location])

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
    setLayoutWidth(collapsed ? '80px' : '200px')
  }
  const onClickMenu = (item) => {
    const clicked = items.find(_item => _item.key === item.key)
    history.push(clicked.path)
  }

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        zIndex: 1
      }}
    >
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
      <Menu theme='dark' selectedKeys={[selectedKey]} mode='inline' onClick={onClickMenu}>
        {items.map((item) => (
          <Menu.Item key={item.key} icon={<FontAwesomeIcon icon={item.icon} style={{ minWidth: '18px' }} />}>
            {collapsed ? null : <span style={{ marginLeft: '0.75rem' }}>{item.label}</span>}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  )
}

Sidebar.propTypes = {
  setLayoutWidth: PropTypes.func
}

export default Sidebar
