import React, { useState } from 'react';
import styles from './lib-one.module.css';
import { Layout, Menu, Form, Select, Button, Row, Col } from "antd";

const { Sider, Content } = Layout;
const { Option } = Select;

interface LibOneProps {
  onSave: (values: { [key: string]: string }) => void;
}

export const LibOne: React.FC<LibOneProps> = ({ onSave }) => {
  const [formValues, setFormValues] = useState({
    chemicalClass: '',
    therapeuticClass: '',
    actionClass: '',
    habitForming: ''
  });

  // Handle form value change
  const handleSelectChange = (key: string, value: string) => {
    setFormValues({
      ...formValues,
      [key]: value
    });
  };

  // Handle save click
  const handleSave = () => {
    onSave(formValues);
  };

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
                  <Select
                    value={formValues.chemicalClass}
                    onChange={(value) => handleSelectChange('chemicalClass', value)}
                    placeholder="Select Chemical Class"
                  >
                    <Option value="class1">Class 1</Option>
                    <Option value="class2">Class 2</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Therapeutic Class">
                  <Select
                    value={formValues.therapeuticClass}
                    onChange={(value) => handleSelectChange('therapeuticClass', value)}
                    placeholder="Select Therapeutic Class"
                  >
                    <Option value="therapy1">Therapy 1</Option>
                    <Option value="therapy2">Therapy 2</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Action Class">
                  <Select
                    value={formValues.actionClass}
                    onChange={(value) => handleSelectChange('actionClass', value)}
                    placeholder="Select Action Class"
                  >
                    <Option value="action1">Action 1</Option>
                    <Option value="action2">Action 2</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Habit Forming">
                  <Select
                    value={formValues.habitForming}
                    onChange={(value) => handleSelectChange('habitForming', value)}
                    placeholder="Select Habit Forming"
                  >
                    <Option value="yes">Yes</Option>
                    <Option value="no">No</Option>
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button htmlType="reset">Clear</Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginLeft: 8 }}
                    onClick={handleSave} // Trigger onSave when Save button is clicked
                  >
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
};

export default LibOne;
