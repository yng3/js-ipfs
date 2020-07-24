'use strict'

const CID = require('cids')
const configure = require('../lib/configure')
const toUrlSearchParams = require('../lib/to-url-search-params')

module.exports = configure(api => {
  return async (peerId, options = {}) => {
    peerId = typeof peerId === 'string' ? peerId : new CID(peerId).toString()

    const res = await (await api.post('bitswap/wantlist', {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        ...options,
        peer: peerId
      }),
      headers: options.headers
    })).json()

    return (res.Keys || []).map(k => new CID(k['/']))
  }
})
