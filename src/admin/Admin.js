import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout, Breadcrumb, Menu } from 'antd'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

import AdminContent from './AdminContent'
import Sidebar from './Sidebar'

import './Admin.sass'

const { Header, Content, Footer } = Layout

// const menu = (
//   <Menu>
//     <Menu.Item>
//       <Button>
//         Profile
//       </Button>
//     </Menu.Item>
//     <Menu.Item>
//       <Button>
//         Settings
//       </Button>
//     </Menu.Item>
//     <Menu.Item>
//       <Button>
//         Log Out
//       </Button>
//     </Menu.Item>
//   </Menu>
// )

const Admin = () => {
  const [layoutWidth, setLayoutWidth] = useState('200px')
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar setLayoutWidth={setLayoutWidth} />
      <Layout className='site-layout' style={{ paddingLeft: layoutWidth }}>
        <Header className='site-layout-background' style={{ padding: 0, position: 'fixed', zIndex: 1, width: '100%', float: 'right' }}>
          <Menu mode='horizontal'>
            <Menu.Item key='1'>Log out</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Patients</Breadcrumb.Item>
          </Breadcrumb>
          <div className='site-layout-background' style={{ padding: 24, minHeight: 360 }}>
            <Switch>
              <Route exact path='/admin' render={() => (<Redirect to='/admin/dashboard' />)} />
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
