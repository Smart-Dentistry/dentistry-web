import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTooth,
  faChartLine,
  faCalendar,
  faUsers,
  faFileInvoiceDollar,
  faUserMd
} from '@fortawesome/free-solid-svg-icons'
import Patients from './Patients'

import './Admin.sass'

const { Header, Content, Footer, Sider } = Layout

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        { collapsed ? (
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
          <Menu.Item key="1" icon={<FontAwesomeIcon icon={faChartLine} style={{ minWidth: '18px' }}/>}>
            { collapsed ? null : <span style={{ marginLeft: '0.75rem' }}>Dashboard</span> }
          </Menu.Item>
          <Menu.Item key="2" icon={<FontAwesomeIcon icon={faCalendar} style={{ minWidth: '18px' }}/>}>
            { collapsed ? null : <span style={{ marginLeft: '0.75rem' }}>Calendar</span> }
          </Menu.Item>
          <Menu.Item key="3" icon={<FontAwesomeIcon icon={faUsers} style={{ minWidth: '18px' }}/>}>
            { collapsed ? null : <span style={{ marginLeft: '0.75rem' }}>Patients</span> }
          </Menu.Item>
          <Menu.Item key="4" icon={<FontAwesomeIcon icon={faFileInvoiceDollar} style={{ minWidth: '18px' }}/>}>
            { collapsed ? null : <span style={{ marginLeft: '0.75rem' }}>Billing</span> }
          </Menu.Item>
          <Menu.Item key="5" icon={<FontAwesomeIcon icon={faUserMd} style={{ minWidth: '18px' }}/>}>
            { collapsed ? null : <span style={{ marginLeft: '0.75rem' }}>Users</span> }
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Patients</Breadcrumb.Item>
          </Breadcrumb>
          <Switch>
            <Route exact path='/admin' render={() => (<Redirect to='/admin/patients' />)} />
            <Route path='/admin/patients' component={Patients} />
            <Route render={() => <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>Under construction...</div>}/>
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Smart Dentistry ©2020 powered by Mathsistor</Footer>
      </Layout>
    </Layout>
  )
}

export default Admin
