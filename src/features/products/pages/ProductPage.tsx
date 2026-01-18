import { GenericCrudPage } from '@/components/ui/GenericCrudPage';
import { ProductCreateForm } from '../components/ProductCreateForm';
import { ProductEditForm } from '../components/ProductEditForm';
import { useProductPageController } from '../hooks/useProductPageController';
import { ProductType } from '../validation/product.schema';
import { useCreateProduct, useUpdateProduct } from '../hooks/useProductQuery';
import { notifications } from '@mantine/notifications';

export function ProductPage() {
  const controller = useProductPageController();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();

  const handleCreateProduct = (values: ProductType) => {
    createProductMutation.mutate(values, {
      onSuccess: () => {
        notifications.show({
          title: 'Product Created',
          message: `Product "${values.title}" has been created successfully.`,
          color: 'green',
        });
        controller.createModal.close();
      },
      onError: (error) => {
        notifications.show({
          title: 'Creation Failed',
          message: `Failed to create product: ${error.message}`,
          color: 'red',
        });
      },
    });
  };

  const handleUpdateProduct = (values: ProductType) => {
    if (!controller.editModal.item) return;

    updateProductMutation.mutate(
      { id: controller.editModal.item.id, data: values },
      {
        onSuccess: () => {
          notifications.show({
            title: 'Product Updated',
            message: `Product "${values.title}" has been updated successfully.`,
            color: 'green',
          });
          controller.editModal.close();
        },
        onError: (error) => {
          notifications.show({
            title: 'Update Failed',
            message: `Failed to update product: ${error.message}`,
            color: 'red',
          });
        },
      }
    );
  };

  return (
    <GenericCrudPage<ProductType>
      title="Product Management"
      controller={controller}
      CreateForm={({ onClose }) => (
        <ProductCreateForm
          onSubmit={handleCreateProduct}
          onCancel={onClose}
          isLoading={createProductMutation.isLoading}
        />
      )}
      EditForm={({ item, onClose }) => (
        <ProductEditForm
          initialValues={item}
          onSubmit={handleUpdateProduct}
          onCancel={onClose}
          isLoading={updateProductMutation.isLoading}
        />
      )}
    />
  );
}
