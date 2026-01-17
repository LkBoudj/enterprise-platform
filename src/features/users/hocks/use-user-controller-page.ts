import { useNavigate } from 'react-router-dom';
import { IBaseFilter, INITIAL_FILTERS } from '@/components/ui/globaDataTable/GlobalFilterBar';
import { useDataTableState } from '@/hooks/use-dataTableState';
import { userColumns } from '../components/userColumns';
import { UserType } from '../validation/read.user.validation';

export const defaultVisibleColumns = [
  'name',
  'email',
  'role',
  'phone',
  'status',
  'country',
  'lastActive',
];
interface IUserFilter extends IBaseFilter {}

const INITIAL_USER_FILTERS = {
  ...INITIAL_FILTERS,
};
const useUserControllerPage = () => {
  const navigate = useNavigate();
  const { internalSelected, visibleColumns, filters, debouncedFilters, actions } =
    useDataTableState<UserType, IUserFilter, any>({
      initialFilters: INITIAL_USER_FILTERS,
      defaultVisibleColumns,
    });
  const { columns, allColumns } = userColumns({
    visibleColumns,
    onView: (user) => navigate(`/users/${user.id}`),
  });

  return {
    columns,
    allColumns,
    internalSelected,
    visibleColumns,
    filters,
    debouncedFilters,
    actions,
  };
};

export default useUserControllerPage;
