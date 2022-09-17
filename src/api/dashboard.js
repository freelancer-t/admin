import request from '@/utils/request'

export function analytics(params) {
  return request({
    url: '/dashboard',
    method: 'get',
    params
  })
}

export function fetchRecentOrder() {
  return request({
    url: '/orders/recent-order',
    method: 'get'
  })
}
