import { http, HttpResponse, delay } from 'msw';

// 1. Define the User Interface (matching your schema)
interface UserType {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  phone: string;
  country: string;
  lastActive: string;
  photo?: string | null;
}

// 2. Initial Mock Data (The "Database")
// We use 'let' so we can modify it (Delete/Update)
let users: UserType[] = Array.from({ length: 50 }).map((_, i) => ({
  id: (i + 1).toString(),
  name: `User ${i + 1}`,
  email: `user${i + 1}@company.com`,
  role: i % 3 === 0 ? 'Admin' : 'User',
  status: i % 2 === 0 ? 'active' : 'inactive',
  phone: `+1 555 01${i.toString().padStart(2, '0')}`,
  country: 'USA',
  lastActive: new Date().toISOString(),
  photo: null,
}));

export const handlers = [
  // ==========================================
  // 🟢 1. READ ALL (GET) with Pagination & Search
  // ==========================================
  http.get('*/users', async ({ request }) => {
    // Simulate network delay (optional, for realism)
    await delay(300);

    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || 1);
    const limit = Number(url.searchParams.get('limit') || 10);
    const q = url.searchParams.get('q')?.toLowerCase();

    // Filter
    let filteredData = users;
    if (q) {
      filteredData = users.filter((user) =>
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q)
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
  // 🟢 2. READ ONE (GET /:id)
  // ==========================================
  http.get('*/users/:id', async ({ params }) => {
    const { id } = params;
    const user = users.find((u) => u.id === id);

    if (!user) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(user);
  }),

  // ==========================================
  // 🟡 3. CREATE (POST)
  // ==========================================
  http.post('*/users', async ({ request }) => {
    await delay(500); // Simulate saving time

    const newUser = (await request.json()) as Partial<UserType>;

    const createdUser: UserType = {
      // Generate fake ID and Metadata
      id: Math.floor(Math.random() * 100000).toString(),
      lastActive: new Date().toISOString(),
      photo: null,
      name: newUser.name || 'Unknown',
      email: newUser.email || '',
      role: newUser.role || 'User',
      status: newUser.status || 'active',
      phone: newUser.phone || '',
      country: newUser.country || '',
    };

    // Add to the TOP of the array
    users.unshift(createdUser);

    return HttpResponse.json(createdUser, { status: 201 });
  }),

  // ==========================================
  // 🔵 4. UPDATE (PUT /:id)
  // ==========================================
  http.put('*/users/:id', async ({ request, params }) => {
    await delay(500);

    const { id } = params;
    const updates = (await request.json()) as Partial<UserType>;

    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    // Merge existing user with updates
    users[userIndex] = { ...users[userIndex], ...updates };

    return HttpResponse.json(users[userIndex]);
  }),

  // ==========================================
  // 🔴 5. DELETE (DELETE /:id)
  // ==========================================
  http.delete('*/users/:id', async ({ params }) => {
    await delay(400);

    const { id } = params;
    
    // Check if exists
    const exists = users.some((u) => u.id === id);
    if (!exists) {
      return new HttpResponse(null, { status: 404 });
    }

    // Remove from array
    users = users.filter((u) => u.id !== id);

    return HttpResponse.json({ success: true, id });
  }),
];