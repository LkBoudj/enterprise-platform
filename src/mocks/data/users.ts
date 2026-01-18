import { faker } from '@faker-js/faker';

export interface UserType {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Manager';
  status: 'active' | 'inactive';
  phone: string;
  country: string;
  lastActive: string;
}

const roles: ('Admin' | 'User' | 'Manager')[] = ['Admin', 'User', 'Manager'];
const statuses: ('active' | 'inactive')[] = ['active', 'inactive'];

export const users: UserType[] = Array.from({ length: 50 }, (_, index) => ({
  id: `${index + 1}`,
  code: faker.string.alphanumeric({ length: 6 }).toUpperCase(), // Generate a unique code
  name: faker.person.fullName(),
  email: faker.internet.email(),
  role: faker.helpers.arrayElement(roles),
  status: faker.helpers.arrayElement(statuses),
  phone: faker.phone.number(),
  country: faker.location.country(),
  lastActive: faker.date.recent().toISOString(),
}));
