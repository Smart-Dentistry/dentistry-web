import React, { useState } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { Layout, Breadcrumb, Menu } from 'antd'

import AdminContent from './AdminContent'
import Sidebar from './Sidebar'

import './Admin.sass'

const { Header, Content, Footer } = Layout

const Admin = () => {
  const [layoutWidth, setLayoutWidth] = useState('200px')
  const history = useHistory()
  const onClick = item => {
    switch (item.key) {
      case '1': {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('refreshToken')
        history.push('/login')
        break
      }
      default: break
    }
  }
  if (!localStorage.getItem('token') && !localStorage.getItem('refreshToken')) {
    history.push('/login')
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar setLayoutWidth={setLayoutWidth} />
      <Layout className='site-layout' style={{ paddingLeft: layoutWidth }}>
        <Header id='header' className='site-layout-background'>
          <Menu mode='horizontal' onClick={onClick} style={{ position: 'absolute', top: 0, right: '200px' }}>
            <Menu.Item id='logout' key='1'>Log out</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ margin: '0 16px', marginTop: '65px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Patients</Breadcrumb.Item>
          </Breadcrumb>
          <div className='site-layout-background' style={{ padding: 24, minHeight: 360 }}>
            <Switch>
              <Route exact path='/admin' render={() => <Redirect to='/admin/dashboard' />} />
              <Route path='/admin/' component={AdminContent} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Smart Dentistry ©2020 powered by Mathsistor</Footer>
      </Layout>
    </Layout>
  )
}

export default Admin
