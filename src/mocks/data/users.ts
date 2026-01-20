import { faker } from '@faker-js/faker';

export interface UserType {
  id: string;
  code: string;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Manager';
  status: 'active' | 'inactive' | 'suspended';
  phone?: string | null;
  country: string;
  photo?: string | null;
  lastActive?: Date;
}

const roles: ('Admin' | 'User' | 'Manager')[] = ['Admin', 'User', 'Manager'];
const statuses: ('active' | 'inactive' | 'suspended')[] = ['active', 'inactive', 'suspended'];

export const users: UserType[] = Array.from({ length: 50 }, (_, index) => ({
  id: `${index + 1}`,
  code: faker.string.alphanumeric({ length: 6 }).toUpperCase(), // Generate a unique code
  name: faker.person.fullName(),
  email: faker.internet.email(),
  role: faker.helpers.arrayElement(roles),
  status: faker.helpers.arrayElement(statuses),
  phone: faker.phone.number(),
  country: faker.location.country(),
  photo: faker.image.avatar(),
  lastActive: faker.date.recent(),
}));
