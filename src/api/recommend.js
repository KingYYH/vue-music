import jsonp from '../common/js/jsonp'
import {commonParams, options} from './config.js'
import axios from 'axios'

export function getRecommend() {
  // https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=486186461&uin=231842070&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1505662058719
  // 从浏览器地址栏获取的 实际的url就是包括.fcg 后面那部分都是data
  // data部分也就是 Query String Parameters
  // 而实际上每个部分获取的 data 的参数部分基本上是不变的
  // 所以就可以把这些 data 统一弄进一个 config.js 中
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    // 该请求自有参数
    platform: 'h5',
    // 登陆后的QQ号信息
    uin: 0,
    needNewCode: 1
  })
  // 带有 Promise 的封装
  return jsonp(url, data, options)
}

// 从手机网页版抓的歌单
// https://y.qq.com/portal/playlist.html
export function getDiscList() {
  // 从jsonp请求变成ajax请求 url也要有相应的变化
  // const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  const url = '/api/getDiscList'

  // 接口参数尽量和抓取网页的保持一致
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSongList(disstid) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })

  return jsonp(url, data, options)
}
