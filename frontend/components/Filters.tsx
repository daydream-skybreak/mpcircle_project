export const Filters = () => {
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
                            console.log(e.target.value);
                        }}
                    >
                        <option value="all">All</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="books">Books</option>
                    </select>
                </div>
            </div>
        </div>
    );
};
