'use client';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'

import {ProductCard} from "@/components/ProductCard";
import {fetchProducts, fetchProductById} from "@/app/api/product";
import {Filters} from "@/components/Filters";
import Header from "@/components/Header";
import {useSearchParams} from "next/navigation";
import * as querystring from "node:querystring";
import {useState} from "react";

export default function ProductsPage (){
    const searchParams = useSearchParams();
    let querystring = searchParams.get('category')
    const [categoryId, setCategoryId] = useState<number|null>(null);
    const queryClient = useQueryClient();
    const {data, isLoading, error} = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const resData = await fetch('/api/products' + (querystring ? `?category=${querystring}` : '')).then(res => res.json())
            return resData;
        },
    });

    const selectCategoryMutation = useMutation({
        mutationFn: async (categoryId: number) => {
            return fetch('/api/products' + (categoryId ? `?category=${categoryId}` : '')).then(res => res.json());
        },

        onMutate: async (categoryId) => {
            // Cancel outgoing product queries
            await queryClient.cancelQueries({ queryKey: ['products'] });

            // Snapshot previous products
            const previousProducts = queryClient.getQueryData(['products']);

            // Optimistically update UI
            queryClient.setQueryData(['products'], []);

            return { previousProducts };
        },

        onSuccess: (data, categoryId) => {
            // Replace optimistic data with real data
            queryClient.setQueryData(['products'], data);
        },

        onError: (_err, _categoryId, context) => {
            // Rollback on error
            queryClient.setQueryData(['products'], context?.previousProducts);
        },
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {(error as Error).message}</div>;
    }
    const products = data?.map((product) => {
        return <ProductCard key={product.id} product={product} />
    });
    return <div className={`w-full p-1`}>
        <Header />
        <Filters updateData={selectCategoryMutation}/>
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6`}>
            {products}
        </div>
    </div>
    ;
}