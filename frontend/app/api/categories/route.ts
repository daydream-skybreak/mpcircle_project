import {NextResponse} from "next/server";

export async function GET() {
    const backendUrl = process.env.API_BASEURL + 'categories';

    const res = await fetch(backendUrl);

    const data = await res.json();
    return new NextResponse(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}