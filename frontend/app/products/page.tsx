'use client';
import {useQuery} from '@tanstack/react-query'

import {ProductCard} from "@/components/ProductCard";
import {fetchProducts, fetchProductById} from "@/app/api/product";
import {Filters} from "@/components/Filters";
import Header from "@/components/Header";
import {useSearchParams} from "next/navigation";
import * as querystring from "node:querystring";

export default function ProductsPage (){
    const searchParams = useSearchParams();
    let querystring = searchParams.get('category')
    const {data, isLoading, error} = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const resData = await fetch('/api/products' + (querystring ? `?category=${querystring}` : '')).then(res => res.json())
            return resData;
        },
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {(error as Error).message}</div>;
    }
    console.log(typeof data)
    const products = data?.map((product) => {
        return <ProductCard key={product.id} name={product.name} price={product.price} imageUrl={`/productImages/wireless headphones.webp`} />
    });
    return <div className={`w-full p-1`}>
        <Header />
        <Filters />
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6`}>
            {products}
        </div>
    </div>
    ;
}