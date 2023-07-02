import { useState, useEffect } from 'react'
import UserService from '../services/UserService'
import { useParams } from 'react-router-dom'

const Case = () => {
  const id = useParams().id
  const [targetCase, setCase] = useState({})
  const [officers, setOfficers] = useState([])

  async function getCase() {
    try {
      const response = await UserService.fetchCase(id)
      setCase(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  async function getOfficers() {
    try {
      const response = await UserService.fetchOfficers()
      setOfficers(response.data.officers)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCase()
    getOfficers()
  }, [])

  async function handleEditCase(e) {
    e.preventDefault()
    try {
      const response = await UserService.editCase(id, targetCase)
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="container">
      <div className="row mb-3">
        <label className="col-sm-4 col-form-label col-form-label-sm">
          № Лицензии
        </label>
        <div className="col-sm-8">
          <input
            value={targetCase.licenseNumber}
            onChange={(e) =>
              setCase({ ...targetCase, licenseNumber: e.target.value })
            }
            type="text"
            className="form-control form-control-sm"
          />
        </div>
      </div>
      <div className="row mb-4">
        <label className="col-sm-4 col-form-label col-form-label-sm">
          ФИО арендатора
        </label>
        <div className="col-sm-8">
          <input
            value={targetCase.ownerFullName}
            onChange={(e) =>
              setCase({ ...targetCase, ownerFullName: e.target.value })
            }
            type="text"
            className="form-control form-control-sm"
          />
        </div>
      </div>
      <div className="row mb-4">
        <label className="col-sm-4 col-form-label col-form-label-sm">
          Цвет
        </label>
        <div className="col-sm-8">
          <input
            value={targetCase.color}
            onChange={(e) => setCase({ ...targetCase, color: e.target.value })}
            type="text"
            className="form-control form-control-sm"
          />
        </div>
      </div>
      <div className="row mb-4">
        <label className="col-sm-4 col-form-label col-form-label-sm">Тип</label>
        <div className="col-sm-8">
          <select
            onChange={(e) => setCase({ ...targetCase, type: e.target.value })}
            type="text"
            className="form-control form-control-sm"
          >
            <option value="sport">Спортивный</option>
            <option value="general">Горный</option>
          </select>
        </div>
      </div>
      <div className="row mb-4">
        <label className="col-sm-4 col-form-label col-form-label-sm">
          Дата кражи
        </label>
        <div className="col-sm-8">
          <input
            value={targetCase.date}
            onChange={(e) => setCase({ ...targetCase, date: e.target.value })}
            type="date"
            className="form-control form-control-sm"
          />
        </div>
      </div>
      <div className="row mb-4">
        <label className="col-sm-4 col-form-label col-form-label-sm">
          Дата заявления
        </label>
        <div className="col-sm-8">
          <input
            disabled
            value={targetCase.createdAt?.slice(0, 10)}
            type="text"
            className="form-control form-control-sm"
          />
        </div>
      </div>
      <div className="row mb-4">
        <label className="col-sm-4 col-form-label col-form-label-sm">
          Дата изменения
        </label>
        <div className="col-sm-8">
          <input
            disabled
            value={targetCase.updatedAt?.slice(0, 10)}
            type="text"
            className="form-control form-control-sm"
          />
        </div>
      </div>
      <div className="row mb-4">
        <label className="col-sm-4 col-form-label col-form-label-sm">
          Ответственный сотрудник
        </label>
        <div className="col-sm-8">
          <select
            onChange={(e) =>
              setCase({ ...targetCase, officer: e.target.value })
            }
            id="inputState"
            className="form-select"
          >
            {officers
              .filter((officer) => officer.approved)
              .map((officer) => (
                <option key={officer._id} value={officer._id}>
                  {officer.firstName} {officer.lastName} ({officer._id})
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-4 col-form-label col-form-label-sm">
          Доп. информация
        </label>
        <div className="col-sm-8">
          <textarea
            value={targetCase.description}
            onChange={(e) =>
              setCase({ ...targetCase, description: e.target.value })
            }
            type="text"
            className="form-control form-control-sm"
          ></textarea>
        </div>
      </div>
      <div className="row mb-4">
        <label className="col-sm-4 col-form-label col-form-label-sm">
          Статус заявления
        </label>
        <div className="col-sm-8">
          <select
            onChange={(e) => setCase({ ...targetCase, status: e.target.value })}
            type="text"
            className="form-control form-control-sm"
          >
            <option value="new">Новый</option>
            <option value="in_progress">В работе</option>
            <option value="done">Исполнен</option>
          </select>
        </div>
      </div>
      {targetCase.status === 'done' && (
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label col-form-label-sm">
            Доп. информация
          </label>
          <div className="col-sm-8">
            <textarea
              value={targetCase.resolution}
              onChange={(e) =>
                setCase({ ...targetCase, resolution: e.target.value })
              }
              type="text"
              className="form-control form-control-sm"
            ></textarea>
          </div>
        </div>
      )}
      <button
        onClick={handleEditCase}
        className="btn btn-primary btn-lg btn-block"
      >
        Внести изменения
      </button>
    </div>
  )
}

export default Case
