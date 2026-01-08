// Shared types derived from Prisma schema

export type Product = {
  id: number;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  price: number;
  inventory: number;
  createdAt: string;
  updatedAt: string;
  categoryId?: number | null;
};

