import { useState, useContext, useEffect } from 'react'
import { Context } from '..'
import UserService from '../services/UserService'
import { observer } from 'mobx-react-lite'

const NewCase = () => {
  const { store } = useContext(Context)
  const [licenseNumber, setLicenseNumber] = useState('')
  const [ownerFullName, setOwnerFullName] = useState('')
  const [type, setType] = useState('')
  const [color, setColor] = useState('')
  const [date, setDate] = useState('')
  const [officer, setOfficer] = useState('')
  const [description, setDescription] = useState('')
  const [officers, setOfficers] = useState([])
  const [message, setMessage] = useState('')

  async function handlePostNewCase(e) {
    e.preventDefault()
    store.isAuth
      ? await store.newCase(
          licenseNumber,
          ownerFullName,
          type,
          color,
          date,
          description,
          officer
        )
      : await store.newCasePublic(
          licenseNumber,
          ownerFullName,
          type,
          color,
          date,
          description
        )
    setMessage(store.message)
    setColor('')
    setDate('')
    setDescription('')
    setLicenseNumber('')
    setOwnerFullName('')
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
    if (store.isAuth) getOfficers()
  }, [])

  return (
    <form className="container row g-3">
      <h4>Новое заявление о краже велосипеда</h4>
      <div className="col-md-6">
        <label htmlFor="inputEmail4" className="form-label">
          Номер лицензии
        </label>
        <input
          onChange={(e) => setLicenseNumber(e.target.value)}
          value={licenseNumber}
          type="text"
          className="form-control"
          id="inputEmail4"
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputState" className="form-label">
          Тип велосипеда
        </label>
        <select
          onChange={(e) => setType(e.target.value)}
          id="inputState"
          className="form-select"
        >
          <option value="">Выберите тип</option>
          <option value="sport">Спортивный</option>
          <option value="general">Горный</option>
        </select>
      </div>

      <div className="col-12">
        <label htmlFor="inputAddress" className="form-label">
          ФИО Клиента
        </label>
        <input
          onChange={(e) => setOwnerFullName(e.target.value)}
          value={ownerFullName}
          type="text"
          className="form-control"
          id="inputAddress"
          placeholder="Иванов Иван Иванович"
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="inputCity" className="form-label">
          Цвет
        </label>
        <input
          onChange={(e) => setColor(e.target.value)}
          value={color}
          type="text"
          className="form-control"
          id="inputCity"
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputCity" className="form-label">
          Дата кражи
        </label>
        <input
          onChange={(e) => setDate(e.target.value)}
          value={date}
          type="date"
          className="form-control"
          id="inputCity"
        />
      </div>
      {store.isAuth && (
        <div className="col-12">
          <label htmlFor="inputState" className="form-label">
            Ответственный сотрудник
          </label>
          <select
            onChange={(e) => setOfficer(e.target.value)}
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
      )}

      <div className="input-group col-md-2">
        <span className="input-group-text">Доп. информация</span>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="form-control"
          aria-label="With textarea"
        ></textarea>
      </div>
      <div className="col-12">
        <button onClick={handlePostNewCase} className="btn btn-primary">
          Заявить о краже
        </button>
        <p className="container">{message}</p>
      </div>
    </form>
  )
}
export default observer(NewCase)
