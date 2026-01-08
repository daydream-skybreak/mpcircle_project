import Image from "next/image";

export default function Header() {
    return (
        <div className={`w-full p-4 bg-blue-800 text-white flex justify-between items-center`}>
            <Image src={'/next.svg'} alt={'next logo'} width={50} height={50} />
            <h1 className="text-3xl font-bold underline">Welcome to the Product App</h1>

        </div>
    )
}

