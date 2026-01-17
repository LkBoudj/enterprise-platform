import { IconDownload, IconPlus, IconUpload } from '@tabler/icons-react';
import { Button, Group } from '@mantine/core';
import DataTablePage from '@/components/ui/globaDataTable/DataTablePage';
import { GlobalFilterBar } from '@/components/ui/globaDataTable/GlobalFilterBar';
import { mockUserData } from '../_data';
import useUserControllerPage from '../hocks/use-user-controller-page';
import { useGetUsers } from '../hocks/useUserQuery';

const useUsers = (page: number, pageSize: number) => {
  const data = [...mockUserData];

  // Pagination
  const totalRecords = data.length;
  const records = data.slice((page - 1) * pageSize, page * pageSize);

  return {
    records,
    totalRecords,
    isFetching: false, // Simulate no loading time for this example
  };
};

export function UserManagementPage() {

  const { columns, allColumns, actions, filters, visibleColumns, internalSelected } =
    useUserControllerPage();
  
  const {data:records,isFetching} = useGetUsers()
   

  return (
    <DataTablePage
      title={'User Management'}
      headerRight={
        <Group>
          <Button
            leftSection={<IconUpload size={18} />}
            variant="light"
            color="gray"
            size="sm"
            onClick={() => alert('Import coming soon!')}
          >
            Import
          </Button>

          <Button size="sm" leftSection={<IconDownload size={18} />} variant="light" color="blue">
            Export
          </Button>

          {/* Add New User Button */}

          <Button size="sm" leftSection={<IconPlus size={18} />} variant="light" color="teal">
            Add New
          </Button>
        </Group>
      }
      records={records??[]}
      columns={columns}
      fetching={isFetching}
      total={records?.length}
      visibleColumns={visibleColumns}
      setVisibleColumns={actions.setVisibleColumns}
      selectedRecords={internalSelected}
      onSelectedRecordsChange={actions.setInternalSelected}
      allColumns={allColumns}
      sortBy="name"
      onSortingChange={actions.setOrder}
      renderFilterBar={(p) => <GlobalFilterBar {...p} />}
    />
  );
}
