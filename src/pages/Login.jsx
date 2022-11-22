import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
// api 
import { loginApi } from '../api/api'
// 组件
import './Login.less'
import { Button, Checkbox, Form, Input } from 'antd';
export default function Login() {
  const navigate=useNavigate()
  const onFinish = async (values) => {
    try {
  const {data:{userInfo}}=    await   loginApi({
        username:values.username,
        password:values.password
      })
      // 存储用户个人信息
      localStorage.setItem('avatar',userInfo.avatar)
      localStorage.setItem('token',userInfo.token)
      localStorage.setItem('username',userInfo.username)
      navigate('/')
    }catch(err){
      console.log(err);
    }
 
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='login'>
      <div className="login_box">
        <h2 style={{fontWeight:'600',textAlign:'center'}}>后台管理</h2>
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
                name="remember"
                valuePropName="checked"
              
              >
                <div>

                <Checkbox>记住密码</Checkbox>
                <Link to='/register'>还没账号?去注册!</Link>
                </div>
             

              </Form.Item>
               <Button type="primary"  block htmlType="submit">
                  Primary
                </Button>
            </Form>
      </div>
      
    </div>
  )
}
