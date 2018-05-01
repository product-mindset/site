import * as auth0 from 'auth0-js'
import { navigateTo } from 'gatsby-link'

export default class UserAuth {
  auth0 = new auth0.WebAuth({
    audience: 'https://product-mindset.auth0.com/api/v2/',
    clientID: 'dQyBO6WzKfWj9PEEq8LZNIjeJvpRmXau',
    domain: 'product-mindset.auth0.com',
    redirectUri: 'http://localhost:8000/callback',
    responseType: 'token id_token',
    scope: 'openid profile email',
  })

  constructor() {
    this.userlogin = this.userlogin.bind(this)
    this.userlogout = this.userlogout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  userlogin() {
    this.auth0.authorize()
  }

  userlogout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('user')
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
      } else if (err) {
        console.log(err)
      }

      // Return to the homepage after authentication.
      navigateTo('/')
    })
  }

  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}')
    return new Date().getTime() < expiresAt
  }

  setSession(authResult) {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)

    this.auth0.client.userInfo(authResult.accessToken, (err, user) => {
      if (!err) {
        localStorage.setItem('user', JSON.stringify(user))
      }
    })
  }

  getUser() {
    if (localStorage.getItem('user') !== 'undefined') {
      return JSON.parse(localStorage.getItem('user') || '{}')
    }
  }

  getUserName() {
    if (this.getUser()) {
      return this.getUser().name
    }
  }
}
