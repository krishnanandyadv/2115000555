import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [company, setCompany] = useState('AMZ');
    const [category, setCategory] = useState('Laptop');
    const [topN, setTopN] = useState(10);
    const [minPrice, setMinPrice] = useState(1);
    const [maxPrice, setMaxPrice] = useState(10000);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, [company, category, topN, minPrice, maxPrice]);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `http://20.244.56.144/test/companies/${company}/categories/${category}/products/top-${topN}&minPrice=${minPrice}&maxPrice=${maxPrice}`
            );
            setProducts(response.data.products);
        } catch (err) {
            setError('Error fetching products');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Top {topN} Products</h1>
            <div>
                <label>
                    Company:
                    <select value={company} onChange={(e) => setCompany(e.target.value)}>
                        <option value="AMZ">AMZ</option>
                        <option value="FLP">FLP</option>
                        <option value="SNP">SNP</option>
                        <option value="HYN">HYN</option>
                        <option value="420">420</option>
                    </select>
                </label>
                <label>
                    Category:
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Laptop">Laptop</option>
                        <option value="Phone">Phone</option>
                        <option value="TV">TV</option>
                        <option value="Earphone">Earphone</option>
                        <option value="Tablet">Tablet</option>
                        <option value="Charger">Charger</option>
                        <option value="House">House</option>
                        <option value="Keypad">Keypad</option>
                        <option value="Bluetooth">Bluetooth</option>
                        <option value="Pendrive">Pendrive</option>
                        <option value="Remote">Remote</option>
                        <option value="Speaker">Speaker</option>
                        <option value="Headset">Headset</option>
                        <option value="PC">PC</option>
                    </select>
                </label>
                <label>
                    Top N:
                    <input
                        type="number"
                        value={topN}
                        onChange={(e) => setTopN(e.target.value)}
                    />
                </label>
                <label>
                    Min Price:
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                </label>
                <label>
                    Max Price:
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </label>
            </div>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>
                        <Link to={`/product/${index}`}>{product.name}</Link>
                        <p>Company: {product.company}</p>
                        <p>Category: {product.category}</p>
                        <p>Price: {product.price}</p>
                        <p>Rating: {product.rating}</p>
                        <p>Discount: {product.discount}</p>
                        <p>Availability: {product.availability}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
