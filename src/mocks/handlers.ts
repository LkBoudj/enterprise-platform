import { http, HttpResponse, delay } from 'msw';
import { users } from './data/users';
import { mockProducts } from './data/products';
import { ProductType } from '@/features/products/validation/product.schema';
import { UserType } from '@/features/users/validation/user.schema'; // Import UserType

// 2. Initial Mock Data (The "Database") for Products
let products: ProductType[] = [...mockProducts];

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
    let filteredData = users;
    if (q) {
      filteredData = users.filter((user) =>
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
  // 🟢 2. READ ONE User (GET /:code)
  // ==========================================
  http.get('*/users/:code', async ({ params }) => {
    const { code } = params;
    const user = users.find((u) => u.code === code);

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
  // 🔵 4. UPDATE User (PUT /:code)
  // ==========================================
  http.put('*/users/:code', async ({ request, params }) => {
    await delay(500);

    const { code } = params;
    const updates = (await request.json()) as Partial<UserType>;

    const userIndex = users.findIndex((u) => u.code === code);

    if (userIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    // Merge existing user with updates
    users[userIndex] = { ...users[userIndex], ...updates };

    return HttpResponse.json(users[userIndex]);
  }),

  // ==========================================
  // 🔴 5. DELETE User (DELETE /:code)
  // ==========================================
  http.delete('*/users/:code', async ({ params }) => {
    await delay(400);

    const { code } = params;
    
    // Check if exists
    const exists = users.some((u) => u.code === code);
    if (!exists) {
      return new HttpResponse(null, { status: 404 });
    }

    // Remove from array
    users = users.filter((u) => u.code !== code);

    return HttpResponse.json({ success: true, code });
  }),

  // ==========================================
  // PRODUCTS API HANDLERS
  // ==========================================

  // 🟢 READ ALL Products (GET) with Pagination & Search
  http.get('*/products', async ({ request }) => {
    await delay(300);

    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || 1);
    const limit = Number(url.searchParams.get('limit') || 10);
    const title = url.searchParams.get('title')?.toLowerCase();
    const code = url.searchParams.get('code')?.toLowerCase(); // Filter by code

    let filteredProducts = products;
    if (title) {
      filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(title)
      );
    }
    if (code) {
      filteredProducts = filteredProducts.filter((product) =>
        product.code.toLowerCase().includes(code)
      );
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedProducts = filteredProducts.slice(start, end);

    return HttpResponse.json({
      data: paginatedProducts,
      meta: {
        total: filteredProducts.length,
        page,
        limit,
        lastPage: Math.ceil(filteredProducts.length / limit),
      },
    });
  }),

  // 🟢 READ ONE Product (GET /:code)
  http.get('*/products/:code', async ({ params }) => {
    const { code } = params;
    const product = products.find((p) => p.code === code);

    if (!product) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(product);
  }),

  // 🟡 CREATE Product (POST)
  http.post('*/products', async ({ request }) => {
    await delay(500);
    const newProduct = (await request.json()) as ProductType; // Expecting a full product without ID
    const createdProduct: ProductType = {
      ...newProduct,
      id: Math.random().toString(36).substring(2, 15), // Simple unique ID
      code: Math.random().toString(36).substring(2, 8).toUpperCase(), // Generate unique code
    };
    products.unshift(createdProduct); // Add to the top
    return HttpResponse.json(createdProduct, { status: 201 });
  }),

  // 🔵 UPDATE Product (PUT /:code)
  http.put('*/products/:code', async ({ request, params }) => {
    await delay(500);
    const { code } = params;
    const updates = (await request.json()) as Partial<ProductType>;

    const productIndex = products.findIndex((p) => p.code === code);
    if (productIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    products[productIndex] = { ...products[productIndex], ...updates };
    return HttpResponse.json(products[productIndex]);
  }),

  // 🔴 DELETE Product (DELETE /:code)
  http.delete('*/products/:code', async ({ params }) => {
    await delay(400);
    const { code } = params;
    const exists = products.some((p) => p.code === code);
    if (!exists) {
      return new HttpResponse(null, { status: 404 });
    }

    products = products.filter((p) => p.code !== code);
    return HttpResponse.json({ success: true, code });
  }),
];