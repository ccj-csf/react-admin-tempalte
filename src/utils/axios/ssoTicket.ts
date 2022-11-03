// @ts-ignore
import UrlParse from 'fast-url-parser'
import qs from 'qs'
import { setGallopsTicket } from '../storage/index'

export const KeyTicket = 'gallopsTicket'

/**
 * Gallops SSO Ticket 读取器
 * @returns {*}
 */
function getTicketFromUrl() {
  const url = document.location.toString()
  const parsed = UrlParse.parse(url, true)
  // 检测jquery是否包含ticket
  if (parsed._query[KeyTicket]) {
    return parsed._query[KeyTicket]
  }
  // 检测hash是否包含ticket
  if (parsed.hash && parsed.hash.indexOf(KeyTicket) > -1) {
    const queryObj = qs.parse(parsed.hash.substring(parsed.hash.indexOf(KeyTicket)))
    return queryObj[KeyTicket]
  }
  return null
}

export function consumeTicket(url: string) {
  const ticket = getTicketFromUrl()
  const parsed = UrlParse.parse(url, true)
  if (ticket) {
    cleanTicket()
    setGallopsTicket(ticket)
    parsed._query[KeyTicket] = ticket
  }
  return UrlParse.format(parsed)
}

export function cleanTicket() {
  const url = window.location.href
  const parsed = UrlParse.parse(url, true)
  let withoutQueryTicketHref = url
  if (parsed._query[KeyTicket]) {
    delete parsed._query[KeyTicket]
    Object.keys(parsed._query).forEach((key) => {
      if (parsed._query[key] === '') {
        delete parsed._query[key]
      }
    })
    parsed.search = qs.stringify(parsed._query, {
      addQueryPrefix: true,
      skipNulls: true,
    })
    withoutQueryTicketHref = UrlParse.format(parsed)
  }

  const parsedWithoutQueryTicket = UrlParse.parse(withoutQueryTicketHref, true)

  if (parsedWithoutQueryTicket.hash && parsedWithoutQueryTicket.hash.indexOf(KeyTicket) > -1) {
    // 示例地址如： #/system/role-setting?&gallopsTicket=e365b22503e741ababb7f204caad178a
    const pathArr = parsedWithoutQueryTicket.hash.split('?')
    const queryPath = qs.parse(pathArr[1])
    delete queryPath[KeyTicket]

    Object.keys(queryPath).forEach((key) => {
      if (queryPath[key] === '') {
        delete queryPath[key]
      }
    })
    parsedWithoutQueryTicket.hash = `${pathArr[0]}${qs.stringify(queryPath, {
      addQueryPrefix: true,
      skipNulls: true,
    })}`
    const _url = UrlParse.format(parsedWithoutQueryTicket)
    window.history.replaceState({}, document.title, _url)
    return
  }
  if (url !== withoutQueryTicketHref) {
    window.history.replaceState({}, document.title, withoutQueryTicketHref)
  }
}
