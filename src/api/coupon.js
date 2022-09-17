import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/coupons',
    method: 'get',
    params
  })
}

export function fetchCoupon(id) {
  return request({
    url: `/coupons/${id}`,
    method: 'get'
  })
}

export function updateCoupon(id, data) {
  return request({
    url: `/coupons/${id}`,
    method: 'put',
    data
  })
}

export function createCoupon(data) {
  return request({
    url: `/coupons`,
    method: 'post',
    data
  })
}

export function deleteCoupon(id) {
  return request({
    url: `/coupons/${id}`,
    method: 'delete'
  })
}

