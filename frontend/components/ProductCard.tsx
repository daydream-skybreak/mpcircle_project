import Image from "next/image";

type Product = {
    id: number;
    name: string;
    imageUrl?: string | null;
    price: number;
    inventory: number;
}

export const ProductCard = ({product, onAddToCart}: { product: Product, onAddToCart?: (p: Product) => void }) => {
    const handleAdd = () => {
        if (onAddToCart && product.inventory > 0) onAddToCart(product)
    }

    return (
        <div className="border p-4 rounded-lg shadow-md hover:scale-105 transition duration-200">
            <Image
                src={product.imageUrl || '/next.svg'}
                alt={product.name}
                width={200}
                height={200}
                className="object-cover mb-4 self-center"
            />
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-700">${product.price.toFixed(2)}</p>
            <p className="text-gray-700">{product.inventory > 0 ? `${product.inventory} in stock` : 'Out of stock'}</p>

            <div className="mt-4">
                <button
                    onClick={handleAdd}
                    disabled={product.inventory <= 0}
                    className={`w-full py-2 px-3 rounded-lg text-white ${product.inventory > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'}`}
                    aria-disabled={product.inventory <= 0}
                >
                    Add to cart
                </button>
            </div>
        </div>
    );
}
