import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/orders',
    method: 'get',
    params
  })
}

export function fetchOrder(id) {
  return request({
    url: `/orders/${id}`,
    method: 'get'
  })
}

export function updateStatus(id, status) {
  return request({
    url: `/orders/update-status/${id}`,
    method: 'put',
    data: { status }
  })
}

export function deleteOrder(id) {
  return request({
    url: `/orders/${id}`,
    method: 'delete'
  })
}
