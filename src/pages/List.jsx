import React from 'react'
import './List.less'
import { Space, Table, Button ,Modal,Form, Input ,message,Drawer,Popconfirm  } from 'antd';
// api 
import { articleListApi,baseInfoEditApi,deleteUserInfoApi } from '../api/api' 
import { useEffect } from 'react';
import { useState } from 'react';
export default function List() {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
      render: (text) => <Button type='link'>{text}</Button>,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      render: (sex) => (
          <div>
          <span>{sex===1?'男':'女'}</span>       
          </div>
      )
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '地址',
      dataIndex: 'city',
      key: 'city',
      width: '40%',

    },
    {
      title: 'Action',
      key: 'action',
      width: '10%',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={()=>{editArticle(record)}} >编辑</Button>
          <Button type="link" onClick={()=>{showDrawer(record)}} >查看</Button>
          <Popconfirm title="确定要删除本条个人信息?" okText="确定" cancelText="取消" onConfirm={deleteInfo}>
          <Button type="link" onClick={()=>{goDeleteInfo(record)}}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const editArticle=(e)=>{
    form.setFieldsValue({
      name: e.name,
      sex: e.sex,
      age: e.age,
      city: e.city
    });
    setIsModalOpen(true);
  }
  const [dataList,setDataList]=useState([])
  const getArticleList=async()=>{
    try {
      const {data:{list}}= await articleListApi()
      let temporaryArr=JSON.parse(JSON.stringify(list))
      let newArr=[]
      temporaryArr.map((item) => {
        let obj={
          key: item.id,
          name: item.name,
          sex: item.sex,
          city: item.city,
          age: item.age,
        }
        newArr.push(obj)
        return null
      })
      setDataList(newArr)
    }catch(e){
      console.log(e);
    }
  }
  useEffect(()=>{
    getArticleList()
  },[])
  // 编辑弹窗
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 弹窗表单数据
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk=async() => {
  setIsModalOpen(false);
  const res=  await baseInfoEditApi(form.getFieldValue())
  if(res.code==="0"){
    messageApi.open({
      type: 'success',
      content: '编辑成功',
    });
  }
  }
  // 查看个人信息
  const [open, setOpen] = useState(false);
  const [drawerData,setDawerData] = useState({});
  const showDrawer = (e) => {
    setDawerData({
      title:`${e.name}的个人信息`,
      city:e.city,
    })
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  // 删除当前项信息
  const [deleteUserName, setDeleteUserName]=useState()
  const goDeleteInfo=(e) => {
    setDeleteUserName(e.name)
  }
  const deleteInfo=async(e) => {
 const  res=await   deleteUserInfoApi(deleteUserName)
    if(res.code==="0"){
      messageApi.open({
        type: 'success',
        content: '删除成功',
      });}
      getArticleList()
  }
  return (
    <div className='list'>
       <Table columns={columns} dataSource={dataList} scroll={{x:'max-content',y:'calc(100vh - 250px)'}} />
       {/* 编辑弹窗  */}
       <Modal title="编辑个人信息" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  okText="确认"
                cancelText="取消" forceRender>
              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
               
                autoComplete="off"
                form={form}
              >
                <Form.Item
                  label="姓名"
                  name="name"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="性别"
                  name="sex"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="年龄"
                  name="age"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="地址"
                  name="city"
                >
                  <Input />
                </Form.Item>
            </Form>
      </Modal>
      {/* 查看个人信息抽屉 */}
      <Drawer
        title={drawerData.title}
        placement="right" 
        closable={false}
        onClose={onClose}
        open={open}
        getContainer={false}
      >
          <h2>
          来自:{drawerData.city}
          </h2>
      </Drawer>
      {contextHolder}
    </div>
  )
}
