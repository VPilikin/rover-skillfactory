import { useState, useContext, useEffect } from 'react'
import { Context } from '..'
import UserService from '../services/UserService'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'

const Officers = () => {
  const [officers, setOfficers] = useState([])
  const { store } = useContext(Context)

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
    <table className="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Имя</th>
          <th scope="col">Фамилия</th>
          <th scope="col">Email</th>
          <th scope="col">Одобрен</th>
          <th scope="col btn"></th>
        </tr>
      </thead>
      <tbody>
        {officers.map((el) => (
          <tr key={el._id}>
            <Link to={`/officers/${el._id}`}>
              <th className=" btn-link" scope="row">
                {el._id}
              </th>
            </Link>
            <th>{el.firstName}</th>
            <th>{el.lastName}</th>
            <th>{el.email}</th>
            <th>
              <input
                disabled
                className="form-check-input"
                type="checkbox"
                checked={el.approved}
              />
            </th>
            <th
              className=" btn-link"
              onClick={(e) => {
                e.preventDefault()
                UserService.deleteOfficer(el._id)
                setOfficers(
                  officers.filter((filterCase) => filterCase._id !== el._id)
                )
              }}
            >
              Удалить
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default observer(Officers)
