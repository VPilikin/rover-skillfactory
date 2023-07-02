import $api from '../http'

export const clientId = 'd41ac83e-663b-4e38-9999-db93e0888c91'

export default class AuthService {
  static async login(email, password) {
    return $api.post('/auth/sign_in', { email, password })
  }

  static async registration(email, password, firstName, lastName) {
    return $api.post('/auth/sign_up', {
      email,
      password,
      clientId,
      firstName,
      lastName,
    })
  }

  static async checkAuth() {
    return $api.get('/auth')
  }
}
