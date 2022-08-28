export const API_URL: string = 'https://norma.nomoreparties.space/api'
export const API_WS_URL: string = 'wss://norma.nomoreparties.space'

export const checkResponse = async (res: Response) => {

  const isJson: boolean = res.headers.get('content-type')?.includes('application/json') as boolean
  const data = isJson ? await res.json() : null

  if (res.ok) {
    return data
  }

  const error: string = (data && data.message) || res.status
  return Promise.reject(error)
}

export const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

const setCookie = (name: string, value: string | null, props?) => {
  props = props || {}
  let exp = props.expires
  if (typeof exp == 'number' && exp) {
    const d = new Date()
    d.setTime(d.getTime() + exp * 60 * 1000);
    exp = props.expires = d
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString()
  }
  value = encodeURIComponent(value as string)
  let updatedCookie = name + '=' + value
  for (const propName in props) {
    updatedCookie += '; ' + propName
    const propValue = props[propName]
    if (propValue !== true) {
      updatedCookie += '=' + propValue
    }
  }
  document.cookie = updatedCookie
}

export const deleteCookie = (name: string): void => {
  setCookie(name, null, { expires: -1 })
}

export const saveTokens = (refreshToken: string, accessToken: string): void => {
  setCookie('accessToken', accessToken)
  setCookie('refreshToken', refreshToken)
}