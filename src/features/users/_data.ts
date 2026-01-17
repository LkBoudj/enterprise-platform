import { UserType } from './validation/read.user.validation';



export const mockUserData: UserType[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    phone: '555-1234',
    status: 'active',
    country: 'USA',
    photo: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    lastActive: new Date(2026, 0, 8, 10, 30),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    phone: '555-5678',
    status: 'inactive',
    country: 'Canada',
    photo: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    lastActive: new Date(2026, 0, 5, 14, 0),
  },
  {
    id: '3',
    name: 'Peter Jones',
    email: 'peter.jones@example.com',
    role: 'Manager',
    phone: '555-9012',
    status: 'active',
    country: 'UK',
    photo: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
    lastActive: new Date(2026, 0, 7, 20, 15),
  },
  {
    id: '4',
    name: 'Mary Williams',
    email: 'mary.williams@example.com',
    role: 'User',
    phone: '555-3456',
    status: 'suspended',
    country: 'Australia',
    photo: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
    lastActive: new Date(2026, 0, 1, 9, 45),
  },
];

