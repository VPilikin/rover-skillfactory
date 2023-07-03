import { useState, useEffect } from 'react'
import UserService from '../services/UserService'
import { useParams } from 'react-router-dom'

const Officer = () => {
  const id = useParams().id
  const [officer, setOfficer] = useState({})
  const [message, setMessage] = useState('')

  async function getOfficer() {
    try {
      const response = await UserService.fetchOfficer(id)
      setOfficer(response.data.data)
    } catch (e) {
      setMessage(e.response.data.message)
    }
  }

  useEffect(() => {
    getOfficer()
  }, [])

  async function handleEditOfficer(e) {
    setMessage('')
    e.preventDefault()
    const data = {
      firstName: officer.firstName,
      lastName: officer.lastName,
      approved: officer.approved,
    }
    if (officer.password.length <= 20 && officer.password.length > 2) {
      data.password = officer.password
    }
    try {
      const response = await UserService.editOfficer(id, data)
      setMessage('Данные успешно отправлены')
    } catch (e) {
      setMessage(e.response.data.message)
    }
  }

  return (
    <div className="container">
      <div className="row mb-3">
        <label className="col-sm-4 col-form-label col-form-label-sm">Имя</label>
        <div className="col-sm-8">
          <input
            value={officer.firstName}
            onChange={(e) =>
              setOfficer({ ...officer, firstName: e.target.value })
            }
            type="text"
            className="form-control form-control-sm"
          />
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-4 col-form-label col-form-label-sm">
          Фамилия
        </label>
        <div className="col-sm-8">
          <input
            value={officer.lastName}
            onChange={(e) =>
              setOfficer({ ...officer, lastName: e.target.value })
            }
            type="text"
            className="form-control form-control-sm"
          />
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-4 col-form-label col-form-label-sm">
          Email
        </label>
        <div className="col-sm-8">
          <input
            disabled
            value={officer.email}
            type="email"
            className="form-control form-control-sm"
          />
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-4 col-form-label col-form-label-sm">
          Изменить пароль
        </label>
        <div className="col-sm-8">
          <input
            value={officer.password?.length > 20 ? '' : officer.password}
            onChange={(e) =>
              setOfficer({ ...officer, password: e.target.value })
            }
            type="password"
            className="form-control form-control-sm"
          />
        </div>
      </div>
      <div className=" mb-3 btn-group">
        <input
          type="radio"
          className="btn-check"
          name="options-outlined"
          id="success-outlined"
          checked={officer.approved}
          onChange={(e) => {
            setOfficer({ ...officer, approved: e.target.value === 'on' })
          }}
        />
        <label className="btn btn-outline-success" htmlFor="success-outlined">
          Одобрен
        </label>

        <input
          type="radio"
          className="btn-check"
          name="options-outlined"
          id="danger-outlined"
          checked={!officer.approved}
          onChange={(e) => {
            setOfficer({ ...officer, approved: e.target.value !== 'on' })
          }}
        />
        <label className="btn btn-outline-danger" htmlFor="danger-outlined">
          Не подтвержден
        </label>
      </div>
      <div className="row mb-3">
        <button
          onClick={handleEditOfficer}
          className="btn btn-primary btn-lg btn-block"
        >
          Внести изменения
        </button>
      </div>
      <p>{message}</p>
    </div>
  )
}

export default Officer
