import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/comments',
    method: 'get',
    params
  })
}

export function fetchComment(id) {
  return request({
    url: `/comments/${id}`,
    method: 'get'
  })
}

export function updateComment(id, data) {
  return request({
    url: `/comments/${id}`,
    method: 'post',
    data
  })
}

export function createComment(data) {
  return request({
    url: `/comments`,
    method: 'post',
    data
  })
}

export function deleteComment(id) {
  return request({
    url: `/comments/${id}`,
    method: 'delete'
  })
}

