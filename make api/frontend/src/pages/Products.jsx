import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, Edit2, Trash2, Package } from 'lucide-react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/products');
            setProducts(data.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Product Management</h1>
                <button className="btn btn-primary" style={{ width: 'auto', padding: '0.75rem 1.5rem' }}>
                    <Plus size={18} />
                    <span>Add New Product</span>
                </button>
            </div>

            <div className="card" style={{ marginBottom: '2rem' }}>
                <div style={{ position: 'relative', maxWidth: '400px' }}>
                    <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
                    <input
                        type="text"
                        className="form-input"
                        style={{ paddingLeft: '3rem' }}
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="card">
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>Loading products...</td></tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No products found</td></tr>
                            ) : filteredProducts.map((product) => (
                                <tr key={product._id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '8px',
                                                background: '#f1f5f9',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                overflow: 'hidden'
                                            }}>
                                                {product.image && product.image !== 'no-image.jpg' ? (
                                                    <img src={`/${product.image}`} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <Package size={20} color="#94a3b8" />
                                                )}
                                            </div>
                                            <span style={{ fontWeight: '600' }}>{product.name}</span>
                                        </div>
                                    </td>
                                    <td>{product.category}</td>
                                    <td style={{ fontWeight: '600' }}>${product.price.toFixed(2)}</td>
                                    <td>
                                        <span style={{
                                            color: product.stock < 10 ? '#ef4444' : 'inherit',
                                            fontWeight: product.stock < 10 ? '700' : '400'
                                        }}>
                                            {product.stock} units
                                        </span>
                                    </td>
                                    <td style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="btn" style={{ padding: '0.5rem', background: '#f1f5f9', color: '#6366f1' }}>
                                            <Edit2 size={16} />
                                        </button>
                                        <button className="btn" style={{ padding: '0.5rem', background: '#f1f5f9', color: '#ef4444' }}>
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Products;
