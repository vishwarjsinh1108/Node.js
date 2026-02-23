import { useState, useEffect } from 'react';
import API from '../services/api';
import { Search, Plus, Edit2, Trash2, Tag, Package } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import ProductModal from '../components/ProductModal';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await API.get('/products');
            setProducts(data);
        } catch (error) {
            toast.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const handleAddClick = () => {
        setSelectedProduct(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await API.delete(`/products/${id}`);
                toast.success('Product deleted successfully');
                fetchProducts();
            } catch (error) {
                toast.error('Failed to delete product');
            }
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold dark:text-white uppercase tracking-tight">Product Management</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your inventory and stock</p>
                </div>
                <button
                    onClick={handleAddClick}
                    className="btn btn-primary"
                >
                    <Plus size={18} /> Add Product
                </button>
            </div>

            <div className="card">
                <div className="p-4 border-b border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="input-field pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-slate-800">
                                <th className="th">Product</th>
                                <th className="th">Category</th>
                                <th className="th">Price</th>
                                <th className="th">Stock</th>
                                <th className="th">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                            {loading ? (
                                <tr><td colSpan="5" className="p-8 text-center text-gray-500 uppercase tracking-widest font-bold">Loading inventory...</td></tr>
                            ) : filteredProducts.length > 0 ? (
                                filteredProducts.map((p) => (
                                    <tr key={p._id} className="tr">
                                        <td className="td">
                                            <div className="flex items-center gap-3">
                                                {p.image ? (
                                                    <img
                                                        src={p.image.startsWith('http') ? p.image : `http://localhost:5000${p.image}`}
                                                        alt={p.name}
                                                        className="w-12 h-12 rounded-lg object-cover bg-gray-100 shadow-sm"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-400">
                                                        <Package size={20} />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-bold dark:text-white uppercase text-xs tracking-tight">{p.name}</p>
                                                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight line-clamp-1">{p.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="td">
                                            <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
                                                <Tag size={12} /> {p.category}
                                            </span>
                                        </td>
                                        <td className="td font-bold dark:text-white text-xs">${p.price.toFixed(2)}</td>
                                        <td className="td">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter ${p.stock < 10 ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                                {p.stock} IN STOCK
                                            </span>
                                        </td>
                                        <td className="td">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleEditClick(p)}
                                                    className="p-2 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/10 rounded-lg transition-colors"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(p._id)}
                                                    className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/10 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="5" className="p-8 text-center text-gray-500 uppercase tracking-widest font-bold text-xs">No products found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                fetchProducts={fetchProducts}
                product={selectedProduct}
            />
        </div>
    );
};

export default ProductList;

