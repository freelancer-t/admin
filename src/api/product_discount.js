import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/product_discounts',
    method: 'get',
    params
  })
}

export function fetchProductDiscount(id) {
  return request({
    url: `/product_discounts/${id}`,
    method: 'get'
  })
}

export function updateProductDiscount(id, data) {
  return request({
    url: `/product_discounts/${id}`,
    method: 'put',
    data
  })
}

export function createProductDiscount(data) {
  return request({
    url: `/product_discounts`,
    method: 'post',
    data
  })
}

export function deleteProductDiscount(id) {
  return request({
    url: `/coupons/${id}`,
    method: 'delete'
  })
}

