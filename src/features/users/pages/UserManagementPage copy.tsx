import { IconDownload, IconPlus, IconUpload } from '@tabler/icons-react';
import { Button, Group } from '@mantine/core';
import DataTablePage from '@/components/ui/globaDataTable/DataTablePage';
import { GlobalFilterBar } from '@/components/ui/globaDataTable/GlobalFilterBar';
import { UserEditModal } from '../components/components/UserEditModal';
import { UserCreateModal } from '../components/UserCreateModal';
import { useUserPageController } from '../hooks/useUserPageController';

export function UserManagementPage() {
  const {
    columns,
    allColumns,
    actions,
    visibleColumns,
    internalSelected,
    records,
    total,
    isLoading,
    filters, // 1️⃣ يجب استدعاء filters لقراءة الصفحة الحالية
    createModal,
    editModal,
  } = useUserPageController();

  return (
    <>
      <DataTablePage
        title={'User Management ' + filters.sortBy}
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

            <Button
              onClick={createModal.open}
              size="sm"
              leftSection={<IconPlus size={18} />}
              variant="light"
              color="teal"
            >
              Add New
            </Button>
          </Group>
        }
        setSearch={actions.setSearch}
        records={records}
        columns={columns}
        fetching={isLoading}
        total={total}
        page={filters.page}
        setPage={actions.setPage}
        limit={filters.limit} // العدد الحالي (10, 20...)
        setLimit={actions.setLimit} // دالة تغيير العدد
        visibleColumns={visibleColumns}
        setVisibleColumns={actions.setVisibleColumns}
        allColumns={allColumns}
        selectedRecords={internalSelected}
        onSelectedRecordsChange={actions.setInternalSelected}
        order={filters.order}
        sortBy={filters.sortBy}
        onSortingChange={actions.setOrder}
        renderFilterBar={(p) => <GlobalFilterBar {...p} />}
      />

      <UserCreateModal opened={createModal.opened} onClose={createModal.close} />
      {editModal.user && (
        <UserEditModal
          key={editModal.user.id}
          opened={editModal.opened}
          onClose={editModal.close}
          user={editModal.user}
        />
      )}
    </>
  );
}
