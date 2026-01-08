"use client";
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'

import {ProductCard} from "@/components/ProductCard";
import {Filters} from "@/components/Filters";
import Header from "@/components/Header";
import { Product } from '@/types';

export default function ProductsPage (){
    const queryClient = useQueryClient();
    const {data, isLoading, error} = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            return fetch('/api/products').then(res => res.json())
        },
    });

    const selectCategoryMutation = useMutation({
        mutationFn: async (categoryId: number|null) => {
            return fetch('/api/products' + (categoryId ? `?category=${categoryId}` : '')).then(res => res.json());
        },

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onMutate: async (_categoryId) => {
            await queryClient.cancelQueries({ queryKey: ['products'] });

            const previousProducts = queryClient.getQueryData(['products']);

            queryClient.setQueryData(['products'], []);

            return { previousProducts };
        },

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSuccess: (data, _categoryId) => {
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
    const products = data?.map((product: Product) => {
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