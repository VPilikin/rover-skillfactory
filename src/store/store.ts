import { IUser } from '../models/IUser'
import { makeAutoObservable } from 'mobx'
import AuthService from '../services/AuthService'
import axios from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'
import { API_URL } from '../http'

export default class Store {
  user = {} as IUser
  isAuth = false
  isLoading = false
  error = ''

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool: boolean) {
    this.isAuth = bool
  }

  setUser(user: IUser) {
    this.user = user
  }

  setLoading(bool: boolean) {
    this.isLoading = bool
  }

  setError(error: string) {
    this.error = error
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password)
      console.log(this.user, this)
      localStorage.setItem('token', response.data.data.token)

      this.setAuth(true)
      this.setUser(response.data.data.user)
    } catch (e: any) {
      console.log(e.response?.data?.data?.message)
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password)
      console.log(response)
      this.login(email, password)
      console.log(this)
    } catch (e: any) {
      console.log(e.response?.data?.data?.message)
      this.setError('Введены неверные данные')
      console.log(this)
    }
  }
  logout() {
    localStorage.removeItem('token')
    this.setAuth(false)
    this.setUser({} as IUser)
  }

  async checkAuth() {
    this.setLoading(true)
    try {
      const response = await AuthService.checkAuth()
      localStorage.setItem('token', response.data.data.token)
      console.log(response)
      this.setAuth(true)
      this.setUser(response.data.data.user)
    } catch (e: any) {
      console.log(e.response?.data?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }
}
