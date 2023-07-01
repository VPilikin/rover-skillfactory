import { IUser } from '../IUser'

export interface Data {
  token: string
  user: IUser
  officers: IUser[]
}
