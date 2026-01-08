import data from '@/public/data.json'

export const fetchProducts = async () => {
  // Simulate an API call delay
  console.log(typeof data.products)
  return data.products;
}

export const fetchProductById = async (id: number) => {
  // Simulate an API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return data.products.find((product) => product.id === id);
}
