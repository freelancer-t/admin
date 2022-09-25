import request from '@/utils/request'

export function fetchSetting() {
  return request({
    url: `/settings`,
    method: 'get'
  })
}

export function updateSetting(data) {
  return request({
    url: `/settings`,
    method: 'post',
    data
  })
}

