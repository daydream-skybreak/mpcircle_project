import Image from "next/image";

export const ProductCard = ({
  name,
  price,
  imageUrl,
}: {
  name: string;
  price: number;
  imageUrl: string;
}) => {
  return (
    <div className="border p-4 rounded-lg shadow-md hover:scale-105 transition duration-200">
      <Image
        src={imageUrl}
        alt={name}
        width={200}
        height={200}
        className="object-cover mb-4 self-center"
      />
      <h2 className="text-lg font-semibold mb-2">{name}</h2>
      <p className="text-gray-700">${price.toFixed(2)}</p>
    </div>
  );
}