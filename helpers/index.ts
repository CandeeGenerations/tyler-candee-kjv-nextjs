import dayjs from 'dayjs'
import {parseCookies, setCookie as sCookie} from 'nookies'

const advancedFormat = require('dayjs/plugin/advancedFormat')

dayjs.extend(advancedFormat)

export const getPaths = (source) => {
  const paths = []

  source.forEach((x) => {
    paths.push({params: {slug: [x.slug]}})

    const pages = Math.ceil(x.postCount / 6)

    for (let i = 2; i <= pages; i++) {
      paths.push({params: {slug: [x.slug, 'page', `${i}`]}})
    }
  })

  return paths
}

export const getCookie = (name) => {
  const cookies = parseCookies()

  if (cookies && cookies[name]) {
    return cookies[name]
  }

  return null
}

export const setCookie = (name, value) => {
  sCookie(null, name, value, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })
}

export const getDate = (date) => {
  const dayjsDate = dayjs(date)

  return dayjsDate.format('MMMM Do, YYYY')
}

export const getImageUrl = (imageUri) => `${process.env.serverUrl}${imageUri}`

export const range = (start: number, len: number, step: number = 1) =>
  len
    ? new Array(len)
        .fill(undefined)
        .map((_, i) => +(start + i * step).toFixed(4))
    : []

export const clamp = (value: number, min: number, max: number) =>
  value < min ? min : value > max ? max : value

export const debounce = (fn: () => any, time = 100) => {
  let timeout: ReturnType<typeof setTimeout>

  return function () {
    const functionCall = () => fn.apply(this)

    clearTimeout(timeout)
    timeout = setTimeout(functionCall, time)
  }
}

export const getWindowDimensions = (): {height: number; width: number} => {
  if (typeof window !== 'undefined') {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth

    const height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight

    return {
      height,
      width,
    }
  }

  return {
    width: 0,
    height: 0,
  }
}

export function copyToClipboard(toCopy: string) {
  const el = document.createElement(`textarea`)
  el.value = toCopy
  el.setAttribute(`readonly`, ``)
  el.style.position = `absolute`
  el.style.left = `-9999px`
  document.body.appendChild(el)
  el.select()
  document.execCommand(`copy`)
  document.body.removeChild(el)
}
