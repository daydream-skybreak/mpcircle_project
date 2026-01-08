import data from '@/public/data.json'

const base_url = process.env.BASE_URL || 'http://localhost:3000/';
export const fetchProducts = async (category=null) => {
  // Simulate an API call delay
    let url = 'http://localhost:3000/' + 'products' + category? `?category=${category}`: ''
    const data = await fetch(url).then(res => {
        return res.json()
    });
    return data;
}

export const fetchProductById = async (id: number) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return data.products.find((product) => product.id === id);
}
