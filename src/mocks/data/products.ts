import { faker } from '@faker-js/faker';
import { ProductType, ProductStatusEnum } from '@/features/products/validation/product.schema';

const productCache = new Map<string, ProductType>();

export const generateProducts = (count: number): ProductType[] => {
  if (productCache.has(`products-${count}`)) {
    return productCache.get(`products-${count}`) as ProductType[];
  }

  const products: ProductType[] = Array.from({ length: count }, () => {
    const status = faker.helpers.arrayElement(ProductStatusEnum.options);
    return {
      id: faker.string.uuid(),
      code: faker.commerce.productAdjective().substring(0,3).toUpperCase() + faker.number.int({min:100, max:999}), // Unique product code
      title: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      stock: status === 'In Stock' ? faker.number.int({ min: 1, max: 100 }) : 0,
      category: faker.commerce.department(),
      status,
    };
  });

  productCache.set(`products-${count}`, products);
  return products;
};

export const mockProducts = generateProducts(50);
