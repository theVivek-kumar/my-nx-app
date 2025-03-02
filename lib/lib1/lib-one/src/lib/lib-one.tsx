import styles from './lib-one.module.css';
import { Layout, Menu, Form, Select, Button, Row, Col } from "antd";

const { Sider, Content } = Layout;
const { Option } = Select;

export function LibOne() {
  return (
    
    <div className={styles['container']}>
        <h1>this is navbar</h1>
      <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider width="20%" style={{ background: "#fff", padding: "20px" }}>
        <Menu mode="vertical" defaultSelectedKeys={["3"]}>
          <Menu.Item key="1">Main</Menu.Item>
          <Menu.Item key="2">Product Information</Menu.Item>
          <Menu.Item key="3" style={{ background: "#e6f7ff" }}>Attributes</Menu.Item>
          <Menu.Item key="4">Pricing</Menu.Item>
          <Menu.Item key="5">Packaging</Menu.Item>
          <Menu.Item key="6">Variants</Menu.Item>
          <Menu.Item key="7">Media</Menu.Item>
        </Menu>
      </Sider>

      {/* Form Section */}
      <Content style={{ padding: "40px", display: "flex", justifyContent: "center", alignItems: "center", width: "70%" }}>
        <Row justify="center" style={{ width: "70%" }}>
          <Col span={12}>
            <Form layout="vertical">
              <Form.Item label="Chemical Class">
                <Select placeholder="Placeholder">
                  <Option value="class1">Class 1</Option>
                  <Option value="class2">Class 2</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Therapeutic Class">
                <Select placeholder="Placeholder">
                  <Option value="therapy1">Therapy 1</Option>
                  <Option value="therapy2">Therapy 2</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Action Class">
                <Select placeholder="Placeholder">
                  <Option value="action1">Action 1</Option>
                  <Option value="action2">Action 2</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Habit Forming">
                <Select placeholder="Placeholder">
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button htmlType="reset">Clear</Button>
                <Button type="primary" htmlType="submit" style={{ marginLeft: 8 }}>
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
    
    </div>
  );
}

export default LibOne;
