import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import './assets/base.less'
import { Outlet,useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import Logo from './components/Logo/Logo'
import React from 'react';
import Header from './components/Header/Header'
const { Sider, Content } = Layout;
const App = () => {
  const navigate=useNavigate()
  const menuClick=(e)=>{
    navigate('/'+e.key)
  }
  return (
    <Layout style={{height:'100vh'}}>
      <Sider trigger={null} collapsible>
        <div className="logo" >
          <Logo />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={menuClick}
          items={[
            {
              key: 'list',
              icon: <UserOutlined />,
              label: '我的主页',
            },
            {
              key: 'means',
              icon: <VideoCameraOutlined />,
              label: '社交广场',
            },
            {
              key: 'edit',
              icon: <UploadOutlined />,
              label: '天体物理',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
      <Header />
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;