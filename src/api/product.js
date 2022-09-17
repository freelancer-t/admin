import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/products',
    method: 'get',
    params
  })
}

export function fetchProduct(id) {
  return request({
    url: `/products/${id}`,
    method: 'get'
  })
}

export function updateProduct(id, data) {
  return request({
    url: `/products/${id}`,
    method: 'post',
    data
  })
}

export function createProduct(data) {
  return request({
    url: `/products`,
    method: 'post',
    data
  })
}

export function deleteProduct(id) {
  return request({
    url: `/products/${id}`,
    method: 'delete'
  })
}

export function updateOrder(data) {
  return request({
    url: `/products/update-order`,
    method: 'patch',
    data
  })
}

export function loadProduct(params) {
  return request({
    url: '/products/load-product',
    method: 'get',
    params
  })
}
