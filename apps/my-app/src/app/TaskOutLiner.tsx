import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import {
  UserOutlined,
  PicRightOutlined,
  BarsOutlined,
} from '@ant-design/icons';
import ProductTable from './ProductTable';
import EmployeeList from './UserList';
import ButtonVariants from './button';
import Counter from './Counter';

const { Sider, Content } = Layout;

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [selectedNav, setSelectedNav] = useState('1');

  const handleMenuClick = (e) => {
    setSelectedNav(e.key); 
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
     
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{ background: colorBgContainer, width: '20%' }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={handleMenuClick}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            Nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<PicRightOutlined />}>
            Nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<BarsOutlined />}>
            Nav 3
          </Menu.Item>
          <Menu.Item key="4" icon={<BarsOutlined />}>
            Nav 4
          </Menu.Item>
        </Menu>
      </Sider>

     
      <Layout>
        <Content style={{ margin: '4px 4px 0', width: '100%' }}>
          {selectedNav === '1' && <ProductTable />} {/* Display ProductTable when Nav 1 is selected */}
          {selectedNav === '2' && <div><EmployeeList/></div>} {/* Placeholder for Nav 2 */}
          {selectedNav === '3' && <div><ButtonVariants/></div>} {/* Placeholder for Nav 3 */}
          {selectedNav === '4' && <div><Counter/></div>} {/* Placeholder for Nav 4 */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;