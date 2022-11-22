import request from '../request/request'
// 登录
export const loginApi=(params)=>request.post("/myApi/login",params)
// 文章列表
export const articleListApi=(params)=>request.get("/myApi/articleList",params)
// 个人信息编辑
export const baseInfoEditApi=(params)=>request.post("/myApi/edit",params)
// 删除个人信息
export const deleteUserInfoApi=(params)=>request.post("/myApi/edit",params)