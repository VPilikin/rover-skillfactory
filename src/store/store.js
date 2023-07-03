import { makeAutoObservable } from 'mobx'
import AuthService from '../services/AuthService'
import UserService from '../services/UserService'

export default class Store {
  user = {}
  isAuth = false
  isLoading = false
  message = ''

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool) {
    this.isAuth = bool
  }

  setUser(user) {
    this.user = user
  }

  setLoading(bool) {
    this.isLoading = bool
  }

  setMessage(message) {
    this.message = message
  }

  async login(email, password) {
    try {
      const response = await AuthService.login(email, password)

      localStorage.setItem('token', response.data.data.token)

      this.setAuth(true)
      this.setUser(response.data.data.user)
    } catch (e) {
      this.setMessage(e.response.data.message)
    }
  }

  async registration(email, password, firstName, lastName) {
    try {
      const response = await AuthService.registration(
        email,
        password,
        firstName,
        lastName
      )
      this.login(email, password)
    } catch (e) {
      this.setMessage(e.response.data.message)
    }
  }

  logout() {
    localStorage.removeItem('token')
    this.setAuth(false)
    this.setUser({})
  }

  async checkAuth() {
    this.setLoading(true)
    try {
      const response = await AuthService.checkAuth()
      localStorage.setItem('token', response.data.data.token)
      this.setAuth(true)
      this.setUser(response.data.data.user)
    } catch (e) {
      this.setMessage(e.response.data.message)
    } finally {
      this.setLoading(false)
    }
  }

  async newCase(
    licenseNumber,
    ownerFullName,
    type,
    color,
    date,
    description,
    officer
  ) {
    try {
      const response = await UserService.newCase(
        licenseNumber,
        ownerFullName,
        type,
        color,
        date,
        description,
        officer
      )
      this.setMessage('Заявление отправлено')
    } catch (e) {
      this.setMessage(e.response.data.message)
    }
  }

  async newCasePublic(
    licenseNumber,
    ownerFullName,
    type,
    color,
    date,
    description
  ) {
    try {
      const response = await UserService.newCasePublic(
        licenseNumber,
        ownerFullName,
        type,
        color,
        date,
        description
      )
      this.setMessage('Заявление отправлено')
    } catch (e) {
      this.setMessage(e.response.data.message)
    }
  }
}
