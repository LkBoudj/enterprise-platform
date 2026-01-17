import { GlobalFilterBarProps, IBaseFilter, GlobalFilterBar } from '@/components/ui/globaDataTable/GlobalFilterBar'
import React from 'react'

export interface UserFilterBarProps extends GlobalFilterBarProps<IBaseFilter>{
    
}

const UserFilterBar:React.FC<UserFilterBarProps> = ({...restProps}) => {
  return (
    <GlobalFilterBar {...restProps} />
  )
}

export default UserFilterBar