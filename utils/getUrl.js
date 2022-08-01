export default function getUrl(route) {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000/' + route
  } else {
    return ''
  }
}