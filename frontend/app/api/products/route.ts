import {NextResponse} from "next/server";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const category = searchParams.get('category');

    const backendUrl =
        `http://localhost:3000/products` +
        (category ? `?category=${category}` : '');

    const res = await fetch(backendUrl);

    const data = await res.json();
    return NextResponse.json(data);
}