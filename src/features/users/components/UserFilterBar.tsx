import React from 'react';
import {
  GlobalFilterBar,
  GlobalFilterBarProps,
} from '@/components/ui/globaDataTable/GlobalFilterBar';

export interface UserFilterBarProps extends GlobalFilterBarProps {}

const UserFilterBar: React.FC<UserFilterBarProps> = ({ ...restProps }) => {
  return <GlobalFilterBar {...restProps} />;
};

export default UserFilterBar;
