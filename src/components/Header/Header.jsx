import React from 'react'
import { Avatar, Image,Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';
export default function Header() {
  // 路由
  const navigate=useNavigate()
  const logout=()=>{
    localStorage.clear()
    navigate('/login')
  }
  const logoUrl="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fstatic.forwardpathway.com%2Fwp-content%2Fuploads%2F2020%2F06%2F03144900%2FElon-Musk%25E5%25A4%25B4%25E5%2583%258F-min.jpg&refer=http%3A%2F%2Fstatic.forwardpathway.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671262413&t=270e02f269b52ba3956056a3ecc3a36e"
  const items=[
   {
    key:0,
    label:'查看资料'
   },
   {
    key:1,
    label:(
      <span onClick={logout}>退出登录</span>
    )
   }
  ]
  const [username,setUsername]=useState('刘德华')
  const [logo,setLogo]=useState(logoUrl)
  useEffect(()=>{
    let yourName=localStorage.getItem('username')
    let yourLogo=localStorage.getItem('avatar')
    if(yourName){
      setUsername(yourName)
      setLogo(yourLogo)
    }
  },[])
  return (
    <div className='header'>
          <Dropdown menu={{ items }}>
      <div className="userInfo">
            <Avatar
             size="large"
              src={
                <Image
                  src={logo}
                />
              } 
            />
            <span>{username}</span>
      </div>
          </Dropdown>
    </div>
  )
}
