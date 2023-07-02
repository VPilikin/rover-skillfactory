import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import UserService from '../services/UserService'
import { Link } from 'react-router-dom'

const Cases = () => {
  const [cases, setCases] = useState([])

  async function getCases() {
    try {
      const response = await UserService.fetchCases()
      setCases(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCases()
  }, [])

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">№ лицензии</th>
          <th scope="col">ФИО</th>
          <th scope="col">Тип</th>
          <th scope="col">Цвет</th>
          <th scope="col">Дата</th>
          <th scope="col">Решение</th>
          <th scope="col">Статус</th>
          <th scope="col btn"></th>
        </tr>
      </thead>
      <tbody>
        {cases.map((el) => (
          <tr key={el._id}>
            <Link to={`/cases/${el._id}`}>
              <th className=" btn-link" scope="row">
                {el.licenseNumber}
              </th>
            </Link>
            <th>{el.ownerFullName}</th>
            <th>{el.type === 'sport' ? 'Спортивный' : 'Горный'}</th>
            <th>{el.color}</th>
            <th>{el.date?.slice(0, 10)}</th>
            <th>{el.resolution}</th>
            <th>{el.status}</th>
            <th
              className=" btn-link"
              onClick={(e) => {
                e.preventDefault()
                UserService.deleteCase(el._id)
                setCases(
                  cases.filter((filterCase) => filterCase._id !== el._id)
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

export default observer(Cases)
