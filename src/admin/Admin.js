import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout, Breadcrumb } from 'antd'

import AdminContent from './AdminContent'
import Sidebar from './Sidebar'

import './Admin.sass'

const { Header, Content, Footer } = Layout

const Admin = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Patients</Breadcrumb.Item>
          </Breadcrumb>
          <div className='site-layout-background' style={{ padding: 24, minHeight: 360 }}>
            <Switch>
              <Route exact path='/admin' render={() => (<Redirect to='/admin/dashboard' />)} />
              <Route path='/admin/:page' component={AdminContent} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Smart Dentistry ©2020 powered by Mathsistor</Footer>
      </Layout>
    </Layout>
  )
}

export default Admin
