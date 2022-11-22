import React from 'react'
import { Link } from 'react-router-dom'
import './register.less'
import { Button, Checkbox, Form, Input } from 'antd';
export default function register() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='register'>
      <div className="register_box">
        <h2 style={{fontWeight:'600',textAlign:'center'}}>后台管理-账号注册</h2>
        <Form
              name="basic"
       
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 20,
              }}
            >
              <Form.Item
                label="用户名:"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="密码:"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="确认密码:"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password again!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
              
              >
                <Link to='/login'>已有账号?去登录!</Link>

              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
      </div>
      
    </div>
  )
}

