import {NextResponse} from "next/server";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const category = searchParams.get('category');

    const backendUrl =
        process.env.API_BASEURL + 'products' +
        (category ? `?category=${category}` : '');

    const res = await fetch(backendUrl);

    const data = await res.json();
    return NextResponse.json(data);
}