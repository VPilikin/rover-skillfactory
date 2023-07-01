import { AxiosResponse } from 'axios'
import $api from '../http'
import { AuthResponse } from '../models/response/AuthResponse'

const clientId = 'd41ac83e-663b-4e38-9999-db93e0888c91'

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/sign_in', { email, password })
  }

  static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/sign_up', {
      email,
      password,
      clientId,
    })
  }

  static async checkAuth(): Promise<AxiosResponse<AuthResponse>> {
    return $api.get<AuthResponse>('/auth')
  }
}
