import { http, HttpResponse, delay } from 'msw';
import { users as initialUsers } from './data/users'; // Rename import to avoid conflict
import { UserType } from '@/features/users/validation/user.schema';

// Create a mutable copy of the users array
let mockUsers = [...initialUsers];

export const handlers = [
  // ==========================================
  // 🟢 1. READ ALL Users (GET) with Pagination & Search
  // ==========================================
  http.get('*/users', async ({ request }) => {
    // Simulate network delay (optional, for realism)
    await delay(300);

    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || 1);
    const limit = Number(url.searchParams.get('limit') || 10);
    const q = url.searchParams.get('q')?.toLowerCase();

    // Filter
    let filteredData = mockUsers;
    if (q) {
      filteredData = mockUsers.filter((user) =>
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        (user.code && user.code.toLowerCase().includes(q)) // Filter by code
      );
    }

    // Paginate
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = filteredData.slice(start, end);

    return HttpResponse.json({
      data: paginatedData,
      meta: {
        total: filteredData.length,
        page,
        limit,
        lastPage: Math.ceil(filteredData.length / limit),
      },
    });
  }),

  // ==========================================
  // 🟢 2. READ ONE User (GET /:id)
  // ==========================================
  http.get('*/users/:id', async ({ params }) => {
    const { id } = params;
    const user = mockUsers.find((u) => u.id === id);

    if (!user) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(user);
  }),

  // ==========================================
  // 🟡 3. CREATE User (POST)
  // ==========================================
  http.post('*/users', async ({ request }) => {
    await delay(500); // Simulate saving time

    const newUser = (await request.json()) as Partial<UserType>;

    const createdUser: UserType = {
      // Generate fake ID and Metadata
      id: Math.floor(Math.random() * 100000).toString(),
      code: Math.random().toString(36).substring(2, 8).toUpperCase(), // Generate unique code
      photo: undefined, // Use undefined instead of null
      name: newUser.name || 'Unknown',
      email: newUser.email || '',
      role: newUser.role || 'User',
      status: newUser.status || 'active',
      phone: newUser.phone || '',
      country: newUser.country || '',
      lastActive: new Date(),
    };

    // Add to the TOP of the array
    mockUsers.unshift(createdUser);

    return HttpResponse.json(createdUser, { status: 201 });
  }),

  // ==========================================
  // 🔵 4. UPDATE User (PUT /:id)
  // ==========================================
  http.put('*/users/:id', async ({ request, params }) => {
    await delay(500);

    const { id } = params;
    const updates = (await request.json()) as Partial<UserType>;

    const userIndex = mockUsers.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    // Merge existing user with updates
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };

    return HttpResponse.json(mockUsers[userIndex]);
  }),

  // ==========================================
  // 🔴 5. DELETE User (DELETE /:id)
  // ==========================================
  http.delete('*/users/:id', async ({ params }) => {
    await delay(400);

    const { id } = params;
    
    // Check if exists
    const exists = mockUsers.some((u) => u.id === id);
    if (!exists) {
      return new HttpResponse(null, { status: 404 });
    }

    // Remove from array
    mockUsers = mockUsers.filter((u) => u.id !== id);

    return HttpResponse.json({ success: true, id });
  }),
];