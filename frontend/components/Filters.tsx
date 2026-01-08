import {useEffect, useState} from "react";

type Category = { id: number; name: string };

// @ts-ignore
export const Filters = ({updateData}) => {
    const [filterList, setFilterList] = useState<Category[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        const fetchCategories = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await fetch('/api/categories')
                if (!res.ok) {
                    const msg = `Failed to load categories (${res.status})`
                    if (!cancelled) setError(msg)
                    return
                }
                const data: Category[] = await res.json()
                if (!cancelled) setFilterList(data)
            } catch (err) {
                if (!cancelled) setError(err instanceof Error ? err.message : String(err))
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        fetchCategories()

        return () => {
            cancelled = true
        }
    }, [])

    return (
        <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg shadow m-2">
            <div className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="w-full sm:max-w-xs">
                    <label
                        htmlFor="category"
                        className="block mb-2 text-sm font-medium text-gray-200"
                    >
                        Category
                    </label>
                    <select
                        id="category"
                        className="bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e) => {
                            // handle category change via state
                            updateData.mutate(e.target.value === 'all' ? null : Number(e.target.value))
                        }}
                        disabled={loading}
                    >
                        <option value="all">All</option>
                        {filterList.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                </div>
            </div>
        </div>
    );
};
