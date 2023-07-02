import { useState, useEffect } from 'react'
import UserService from '../services/UserService'
import { useParams } from 'react-router-dom'

const Officer = () => {
  const id = useParams().id
  const [officer, setOfficer] = useState({})

  async function getOfficer() {
    try {
      const response = await UserService.fetchOfficer(id)
      setOfficer(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getOfficer()
  }, [])

  async function handleEditOfficer(e) {
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
    } catch (e) {
      console.log(e)
    }
  }
  console.log(officer)

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
      <div class=" mb-3 btn-group">
        <input
          type="radio"
          className="btn-check"
          name="options-outlined"
          id="success-outlined"
          autocomplete="off"
          checked={true}
          onClick={(e) => {
            setOfficer({ ...officer, approved: e.target.value === 'on' })
          }}
        />
        <label class="btn btn-outline-success" for="success-outlined">
          Одобрен
        </label>

        <input
          type="radio"
          className="btn-check"
          name="options-outlined"
          id="danger-outlined"
          autocomplete="off"
          checked={!officer.approved}
          onClick={(e) => {
            setOfficer({ ...officer, approved: e.target.value !== 'on' })
          }}
        />
        <label class="btn btn-outline-danger" for="danger-outlined">
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
    </div>
  )
}

export default Officer
