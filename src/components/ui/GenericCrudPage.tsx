import { ReactNode } from 'react';
import { IconDownload, IconPlus, IconUpload } from '@tabler/icons-react';
import { Button, Group, Modal } from '@mantine/core';
import { ICrudController } from '@/types/crud.types';
import DataTablePage from './globaDataTable/DataTablePage';
import { GlobalFilterBar } from './globaDataTable/GlobalFilterBar';
import { IRowContextExpansionProps } from '@/types';

interface GenericCrudPageProps<T> {
  title: string;
  controller: ICrudController<T>;
  CreateForm: React.ComponentType<{ onClose: () => void }>;
  EditForm: React.ComponentType<{ item: T; onClose: () => void }>;
  headerRight?: ReactNode;
  statsGroup?: React.ReactNode;
   rowExceptionContent?: (params: IRowContextExpansionProps<T>) => React.ReactNode;

}

export function GenericCrudPage<T extends { id: string | number }>({
  title,
  controller,
  CreateForm,
  EditForm,
  headerRight,
  statsGroup,
  rowExceptionContent

}: GenericCrudPageProps<T>) {
  const {
    records,
    total,
    isLoading,
    page,
    limit,
    actions,
    filters,
    visibleColumns,
    internalSelected,
    columns,
    allColumns,
    createModal,
    editModal,

  } = controller;

  return (
    <>
      <DataTablePage
        title={title}
        headerRight={headerRight}
        records={records}
        columns={columns}
        allColumns={allColumns}
        fetching={isLoading}
        total={total}
        page={page}
        setPage={actions.setPage}
        limit={limit}
        setLimit={actions.setLimit}
        setSearch={actions.setSearch}
        visibleColumns={visibleColumns}
        setVisibleColumns={actions.setVisibleColumns}
        selectedRecords={internalSelected}
        onSelectedRecordsChange={actions.setInternalSelected}
        // Sorting & Filtering
        order={filters.order}
        sortBy={filters.sortBy}
        onSortingChange={actions.setOrder}
        renderFilterBar={(p) => <GlobalFilterBar {...p} />}
        rowExceptionContent={rowExceptionContent}
      >
        {statsGroup && statsGroup}
      </DataTablePage>
      <Modal
        opened={createModal.opened}
        onClose={createModal.close}
        title={`Create New ${title}`} // مثال: Create New Product
        centered
        closeOnClickOutside={false}
      >
        <CreateForm onClose={createModal.close} />
      </Modal>

      {/* Edit Modal Container */}
      {editModal.item && (
        <Modal
          opened={editModal.opened}
          onClose={editModal.close}
          title={`Edit ${title}`}
          centered
          closeOnClickOutside={false}
          key={String(editModal.item.id)} // Force re-render
        >
          <EditForm item={editModal.item} onClose={editModal.close} />
        </Modal>
      )}
    </>
  );
}
