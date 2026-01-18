import { ReactNode } from 'react';
import { Button, Group, Modal, LoadingOverlay } from '@mantine/core';
import { IconPlus, IconDownload, IconUpload } from '@tabler/icons-react';
import DataTablePage from './globaDataTable/DataTablePage';
import { GlobalFilterBar } from './globaDataTable/GlobalFilterBar';
import { ICrudController } from '@/types/crud.types';

interface GenericCrudPageProps<T> {
  title: string;
  controller: ICrudController<T>;
  
  // نمرر مكونات الفورم كـ Props
  CreateForm: React.ComponentType<{ onClose: () => void }>;
  EditForm: React.ComponentType<{ item: T; onClose: () => void }>;
  
  // اختياري: أزرار إضافية
  extraHeaderActions?: ReactNode;
}

export function GenericCrudPage<T extends { id: string | number }>({
  title,
  controller,
  CreateForm,
  EditForm,
  extraHeaderActions
}: GenericCrudPageProps<T>) {
  
  const { 
    records, total, isLoading, page, limit, 
    actions, filters, visibleColumns, internalSelected, 
    columns, allColumns, createModal, editModal 
  } = controller;

  return (
    <>
      <DataTablePage
        title={title}
        // 1. Header Standard Buttons
        headerRight={
          <Group>
            {extraHeaderActions}
            
            <Button leftSection={<IconUpload size={18} />} variant="light" color="gray" size="sm">
              Import
            </Button>
            <Button size="sm" leftSection={<IconDownload size={18} />} variant="light" color="blue">
              Export
            </Button>
            
            {/* زر الإضافة السحري */}
            <Button onClick={createModal.open} size="sm" leftSection={<IconPlus size={18} />} variant="light" color="teal">
              Add New
            </Button>
          </Group>
        }

        // 2. ربط البيانات تلقائياً
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
      />

      
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