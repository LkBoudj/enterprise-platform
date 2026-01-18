import { Button, NumberInput, Select, TextInput, Box } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { UpdateProductSchema, UpdateProductDto, ProductType, ProductStatusEnum } from '../validation/product.schema';
import { useEffect } from 'react';

interface ProductEditFormProps {
  initialValues: ProductType;
  onSubmit: (values: UpdateProductDto) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function ProductEditForm({ initialValues, onSubmit, onCancel, isLoading }: ProductEditFormProps) {
  const form = useForm<UpdateProductDto>({
    initialValues: {
      title: '',
      price: 0,
      stock: 0,
      category: '',
      status: ProductStatusEnum.enum['In Stock'],
    },
    validate: zodResolver(UpdateProductSchema),
  });

  useEffect(() => {
    if (initialValues) {
      form.setValues(initialValues);
    }
  }, [initialValues]);

  return (
    <Box component="form" onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        label="Title"
        placeholder="Enter product title"
        {...form.getInputProps('title')}
        required
      />
      <NumberInput
        label="Price"
        placeholder="Enter product price"
        mt="md"
        min={0}
        precision={2}
        {...form.getInputProps('price')}
        required
      />
      <NumberInput
        label="Stock"
        placeholder="Enter stock quantity"
        mt="md"
        min={0}
        step={1}
        {...form.getInputProps('stock')}
        required
      />
      <TextInput
        label="Category"
        placeholder="Enter product category"
        mt="md"
        {...form.getInputProps('category')}
        required
      />
      <Select
        label="Status"
        placeholder="Select status"
        mt="md"
        data={ProductStatusEnum.options}
        {...form.getInputProps('status')}
        required
      />

      <Box mt="xl" style={{ display: 'flex', justifyContent: 'flex-end', gap: 'md' }}>
        <Button variant="default" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={isLoading}>
          Update Product
        </Button>
      </Box>
    </Box>
  );
}
