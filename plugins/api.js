export default function ({ $axios }, inject) {
  // Create a custom axios instance
  if (process.browser) {
    const token = localStorage.getItem('token')
    const api = $axios.create({
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    // Set baseURL to something different
    api.setBaseURL('http://localhost:8080')

    // Inject to context as $api
    inject('api', api)
  }
}
