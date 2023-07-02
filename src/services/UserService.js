import $api from '../http'
import { clientId } from './AuthService'

export default class UserService {
  static fetchOfficers() {
    return $api.get('/officers')
  }

  static fetchCases() {
    return $api.get('/cases')
  }

  static newCasePublic(
    licenseNumber,
    ownerFullName,
    type,
    color,
    date,
    description
  ) {
    return $api.post('/public/report', {
      licenseNumber,
      ownerFullName,
      type,
      clientId,
      color,
      date,
      description,
    })
  }

  static newCase(
    licenseNumber,
    ownerFullName,
    type,
    color,
    date,
    description,
    officer
  ) {
    return $api.post('/cases', {
      licenseNumber,
      ownerFullName,
      type,
      color,
      date,
      description,
      officer,
    })
  }

  static deleteCase(id) {
    return $api.delete(`/cases/${id}`)
  }

  static fetchCase(id) {
    return $api.get(`/cases/${id}`)
  }

  static editCase(id, data) {
    return $api.put(`/cases/${id}`, data)
  }

  static deleteOfficer(id) {
    return $api.delete(`/officers/${id}`)
  }

  static fetchOfficer(id) {
    return $api.get(`/officers/${id}`)
  }

  static editOfficer(id, data) {
    return $api.put(`/officers/${id}`, data)
  }
}
