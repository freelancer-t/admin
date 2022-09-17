import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/categories',
    method: 'get',
    params
  })
}

export function fetchCategory(id) {
  return request({
    url: `/categories/${id}`,
    method: 'get'
  })
}

export function updateCategory(id, data) {
  return request({
    url: `/categories/${id}`,
    method: 'put',
    data
  })
}

export function createCategory(data) {
  return request({
    url: `/categories`,
    method: 'post',
    data
  })
}

export function deleteCategory(id) {
  return request({
    url: `/categories/${id}`,
    method: 'delete'
  })
}

export function updateOrder(data) {
  return request({
    url: `/categories/update-order`,
    method: 'patch',
    data
  })
}
