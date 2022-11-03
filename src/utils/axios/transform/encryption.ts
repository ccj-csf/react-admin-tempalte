import JsEncrypt from 'jsencrypt'
import type { AxiosRequestConfig } from 'axios'
const pubKey =
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsylsppOLQVbzq29pMiykeVhFLOSLvKlbq88fdBHnMJ/eNGdbOkNM2DfR+aUYppo7dqn2tBVWsS4s58KRMKv9fE/3Ae0ytg2ZTgx3S+s8qEWEcG3r7J13CYplHYhfkosqon4NyiHToChnBqbn2t1qEslxZoIFkHeRDR9fTgZiLGmPCBXCHeG48Ybq/7eBRciORcRg071NnL/tuIySvOL4ULHsjhcsLkCdNKr3jyIXq7kWOP6rjDT7KbtGadsJbiIdVuSfuoBCZpROCj1E86vWdz8ZgX8/zhVJf377lAIJMXM74yDzjCiYEOyaiEI4ruh/f1ViNJmpv2dIJ/zhhD29ZwIDAQAB'
// 单次最大加密长度
const MAX_ENCRYPT_BLOCK = 245
//将字符串进行分组
const splitData = (str: string, num: number) => {
  if (str == null || str == undefined) return null
  if (!/^[0-9]*[1-9][0-9]*$/.test(num + '')) return null
  const array: any[] = []
  const len = str.length
  for (let i = 0; i < len / num; i++) {
    if ((i + 1) * num > len) {
      array.push(str.substring(i * num, len))
    } else {
      array.push(str.substring(i * num, (i + 1) * num))
    }
  }
  return array
}

//分段加密
const decryptLong = (data: string) => {
  const encrypt = new JsEncrypt()
  encrypt.setPublicKey(pubKey)
  if (data.length > MAX_ENCRYPT_BLOCK) {
    const array = splitData(data, MAX_ENCRYPT_BLOCK) || []
    let encryptStr = ''
    for (let i = 0; i < array.length; i++) {
      encryptStr += encrypt.encrypt(array[i]) + ','
    }
    return encryptStr
  }
  return encrypt.encrypt(data)
}

export const encryptData = (config: AxiosRequestConfig) => {
  const { method, data } = config
  if (method === 'POST') {
    return decryptLong(JSON.stringify(data))
  }
}
