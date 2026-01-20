
import { UserType } from '../validation/user.schema'
import { IRowContextExpansionProps } from '@/types'



function UserRowExceptionContent({collapse,record,index}: IRowContextExpansionProps<UserType>) {
  return (
    <div>UserRowExceptionContent === {index}</div>
  )
}

export default UserRowExceptionContent