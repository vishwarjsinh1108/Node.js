import { useState, useEffect } from 'react';
import { X, Upload, Loader2, Package } from 'lucide-react';
import API from '../services/api';
import { toast } from 'react-toastify';

const ProductModal = ({ isOpen, onClose, fetchProducts, product }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState('');
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setStock(product.stock);
            setImage(product.image);
        } else {
            setName('');
            setPrice('');
            setDescription('');
            setCategory('');
            setStock('');
            setImage('');
        }
    }, [product, isOpen]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await API.post('/upload', formData, config);
            setImage(data);
            setUploading(false);
            toast.success('Image uploaded successfully');
        } catch (error) {
            console.error(error);
            setUploading(false);
            toast.error('Image upload failed');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const productData = {
            name,
            price,
            description,
            category,
            stock,
            image,
        };

        try {
            if (product) {
                await API.put(`/products/${product._id}`, productData);
                toast.success('Product updated successfully');
            } else {
                await API.post('/products', productData);
                toast.success('Product added successfully');
            }
            fetchProducts();
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100 dark:border-slate-700 animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between bg-gray-50/50 dark:bg-slate-800/50">
                    <h2 className="text-xl font-bold dark:text-white uppercase tracking-tight">
                        {product ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-xl transition-colors">
                        <X size={20} className="dark:text-white" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Product Name</label>
                            <input
                                type="text"
                                className="input-field"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Category</label>
                            <select
                                className="input-field"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Price ($)</label>
                            <input
                                type="number"
                                className="input-field"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Stock Level</label>
                            <input
                                type="number"
                                className="input-field"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Description</label>
                        <textarea
                            className="input-field h-32 resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Product Image</label>
                        <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-2xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-slate-600">
                                {image ? (
                                    <img src={image.startsWith('http') ? image : `http://localhost:5000${image}`} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <Package size={32} className="text-gray-300" />
                                )}
                            </div>
                            <div className="flex-1">
                                <label className="btn btn-secondary cursor-pointer inline-flex">
                                    {uploading ? <Loader2 className="animate-spin" /> : <><Upload size={18} /> Choose File</>}
                                    <input type="file" className="hidden" onChange={uploadFileHandler} />
                                </label>
                                <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest font-bold">JPG, PNG or GIF. Max 2MB.</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 dark:border-slate-700 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="btn btn-secondary uppercase tracking-widest text-xs font-bold px-6">Cancel</button>
                        <button
                            disabled={loading || uploading}
                            type="submit"
                            className="btn btn-primary uppercase tracking-widest text-xs font-bold px-8"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : (product ? 'Update Product' : 'Add Product')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;
