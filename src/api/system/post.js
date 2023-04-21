import request from '@/utils/request'

// 查询岗位列表
export function listPost(data) {
  return request({
    url: '/system/post/list',
    method: 'post',
    data
  })
}

// 查询岗位详细
export function getPost(postId) {
  return request({
    url: '/system/post/getById/' + postId,
    method: 'get'
  })
}

// 新增岗位
export function addPost(data) {
  return request({
    url: '/system/post/add',
    method: 'post',
    data: data
  })
}

// 修改岗位
export function updatePost(data) {
  return request({
    url: '/system/post/update',
    method: 'post',
    data: data
  })
}

// 删除岗位
export function delPost(data) {
  return request({
    url: '/system/post/remove' ,
    method: 'delete',
    data
  })
}
