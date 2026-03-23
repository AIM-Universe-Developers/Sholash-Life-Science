import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Plus, Search, Edit2, Trash2, X, Upload, Package, Image as ImageIcon } from 'lucide-react';
import ConfirmModal from '../../components/Admin/common/ConfirmModal';
import styles from './ProductsPage.module.css';

const ProductsPage = () => {
    const { token } = useAdminAuth();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [saving, setSaving] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const statusTabs = ['All', 'Active', 'Inactive'];

    // ─── Fetch Data ──────────────────────────────────────────────────────
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const res = await axios.get('/api/products/admin/all', { headers });
            if (res.data.success) {
                setProducts(res.data.data || []);
            }
        } catch (err) {
            console.error('Failed to fetch products', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get('/api/categories');
            if (res.data.success) {
                setCategories(res.data.data || []);
            }
        } catch (err) {
            console.error('Failed to fetch categories', err);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [token]);

    // ─── Filter Logic ────────────────────────────────────────────────────
    const filteredProducts = products.filter(p => {
        const matchesSearch = !searchQuery.trim() ||
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand?.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesTab =
            activeTab === 'All' ||
            (activeTab === 'Active' && p.isActive) ||
            (activeTab === 'Inactive' && !p.isActive);

        return matchesSearch && matchesTab;
    });

    // ─── CRUD Handlers ───────────────────────────────────────────────────
    const handleSave = async (formData) => {
        try {
            setSaving(true);
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            };

            if (editingProduct) {
                await axios.put(`/api/products/${editingProduct._id}`, formData, { headers });
            } else {
                await axios.post('/api/products', formData, { headers });
            }

            setShowForm(false);
            setEditingProduct(null);
            fetchProducts();
        } catch (err) {
            console.error('Failed to save product', err);
            alert(err.response?.data?.message || 'Failed to save product');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            const headers = { Authorization: `Bearer ${token}` };
            await axios.delete(`/api/products/${deleteTarget._id}`, { headers });
            setDeleteTarget(null);
            fetchProducts();
        } catch (err) {
            console.error('Failed to delete product', err);
        }
    };

    const openEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const openAdd = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    // ─── Image URL helper ────────────────────────────────────────────────
    const getImageUrl = (img) => {
        if (!img) return null;
        img = img.replace(/\\/g, '/');
        if (img.startsWith('http')) return img;
        return img.startsWith('/') ? img : `/${img}`;
    };

    // ─── Render ──────────────────────────────────────────────────────────
    return (
        <div className={`${styles.productsPage} admin-fade-in-up`}>
            <div className={styles.header}>
                <div className={styles.titleInfo}>
                    <h2>Products</h2>
                    <p>Manage your product catalog.</p>
                </div>
                <div className={styles.headerActions}>
                    <button className={styles.btnPrimary} onClick={openAdd}>
                        <Plus size={18} />
                        Add Product
                    </button>
                </div>
            </div>

            <div className={styles.controls}>
                <div className={styles.searchWrap}>
                    <Search size={18} className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className={styles.tabs}>
                    {statusTabs.map(tab => (
                        <button
                            key={tab}
                            className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.tableCard}>
                {loading ? (
                    <div className={styles.loading}>Loading products...</div>
                ) : filteredProducts.length === 0 ? (
                    <div className={styles.emptyState}>
                        <Package size={48} />
                        <h3>No products found</h3>
                        <p>Try adjusting your search or add a new product.</p>
                    </div>
                ) : (
                    <table className={styles.productTable}>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map(product => (
                                <tr key={product._id}>
                                    <td>
                                        <div className={styles.productCell}>
                                            {product.images?.[0] ? (
                                                <img
                                                    src={getImageUrl(product.images[0])}
                                                    alt={product.name}
                                                    className={styles.productThumb}
                                                />
                                            ) : (
                                                <div className={styles.productThumb} style={{
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                }}>
                                                    <ImageIcon size={18} style={{ color: 'var(--admin-text-muted)' }} />
                                                </div>
                                            )}
                                            <div className={styles.productNameWrap}>
                                                <span className={styles.productName}>{product.name}</span>
                                                {product.brand && (
                                                    <span className={styles.productBrand}>{product.brand}</span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={styles.categoryBadge}>
                                            {product.category?.name || '—'}
                                        </span>
                                    </td>
                                    <td className={styles.priceCell}>₹{product.price}</td>
                                    <td className={`${styles.stockCell} ${product.stock < 10 ? styles.stockLow : ''}`}>
                                        {product.stock}
                                    </td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${product.isActive ? styles.statusActive : styles.statusInactive}`}>
                                            <span className={styles.statusDot}></span>
                                            {product.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actionBtns}>
                                            <button
                                                className={styles.actionBtn}
                                                onClick={() => openEdit(product)}
                                                title="Edit"
                                            >
                                                <Edit2 size={14} />
                                            </button>
                                            <button
                                                className={`${styles.actionBtn} ${styles.actionBtnDanger}`}
                                                onClick={() => setDeleteTarget(product)}
                                                title="Delete"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* ─── Product Form Modal ──────────────────────────────────── */}
            {showForm && (
                <ProductFormModal
                    product={editingProduct}
                    categories={categories}
                    saving={saving}
                    onSave={handleSave}
                    onClose={() => { setShowForm(false); setEditingProduct(null); }}
                    getImageUrl={getImageUrl}
                />
            )}

            {/* ─── Delete Confirmation ─────────────────────────────────── */}
            <ConfirmModal
                isOpen={!!deleteTarget}
                title="Delete Product"
                message={`Are you sure you want to delete "${deleteTarget?.name}"? This will deactivate the product.`}
                onConfirm={handleDelete}
                onClose={() => setDeleteTarget(null)}
                isDanger={true}
                confirmText="Delete"
            />
        </div>
    );
};

// ═══════════════════════════════════════════════════════════════════════════
// Product Form Modal Component
// ═══════════════════════════════════════════════════════════════════════════
const ProductFormModal = ({ product, categories, saving, onSave, onClose, getImageUrl }) => {
    const fileInputRef = useRef(null);
    const [form, setForm] = useState({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        category: product?.category?._id || product?.category || '',
        stock: product?.stock || 0,
        brand: product?.brand || '',
        tagline: product?.tagline || '',
        color: product?.color || '#f0f0f0',
        target: product?.target || [],
        features: product?.features || [],
    });
    const [newFiles, setNewFiles] = useState([]);
    const [existingImages, setExistingImages] = useState(product?.images || []);

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    // ─── List Field Helpers ──────────────────────────────────────────
    const addListItem = (field) => {
        setForm(prev => ({ ...prev, [field]: [...prev[field], ''] }));
    };

    const updateListItem = (field, index, value) => {
        setForm(prev => {
            const arr = [...prev[field]];
            arr[index] = value;
            return { ...prev, [field]: arr };
        });
    };

    const removeListItem = (field, index) => {
        setForm(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index),
        }));
    };

    // ─── Image Handling ──────────────────────────────────────────────
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setNewFiles(prev => [...prev, ...files]);
    };

    const removeNewFile = (index) => {
        setNewFiles(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (index) => {
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    };

    // ─── Submit ──────────────────────────────────────────────────────
    const handleSubmit = (e) => {
        e.preventDefault();

        const fd = new FormData();
        fd.append('name', form.name);
        fd.append('description', form.description);
        fd.append('price', form.price);
        fd.append('category', form.category);
        fd.append('stock', form.stock);
        fd.append('brand', form.brand);
        fd.append('tagline', form.tagline);
        fd.append('color', form.color);
        fd.append('target', JSON.stringify(form.target.filter(Boolean)));
        fd.append('features', JSON.stringify(form.features.filter(Boolean)));

        // For editing, pass existing images that weren't removed
        if (product) {
            // We'll keep the existing images array in the backend update
            // by not passing images field if no new files and same existing images
        }

        newFiles.forEach(file => {
            fd.append('images', file);
        });

        onSave(fd);
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
                    <button className={styles.modalCloseBtn} onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.modalBody}>
                        <div className={styles.formGrid}>
                            {/* Name */}
                            <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                                <label>Product Name *</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={e => handleChange('name', e.target.value)}
                                    placeholder="e.g. Ceramois™ – Ultra Nourishing Lotion"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                                <label>Description *</label>
                                <textarea
                                    value={form.description}
                                    onChange={e => handleChange('description', e.target.value)}
                                    placeholder="Product description..."
                                    required
                                    rows={3}
                                />
                            </div>

                            {/* Price & Stock */}
                            <div className={styles.formGroup}>
                                <label>Price (₹) *</label>
                                <input
                                    type="number"
                                    value={form.price}
                                    onChange={e => handleChange('price', e.target.value)}
                                    placeholder="499"
                                    min="0"
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Stock *</label>
                                <input
                                    type="number"
                                    value={form.stock}
                                    onChange={e => handleChange('stock', e.target.value)}
                                    placeholder="100"
                                    min="0"
                                    required
                                />
                            </div>

                            {/* Category & Brand */}
                            <div className={styles.formGroup}>
                                <label>Category *</label>
                                <select
                                    value={form.category}
                                    onChange={e => handleChange('category', e.target.value)}
                                    required
                                >
                                    <option value="">Select category</option>
                                    {categories.map(cat => (
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Brand</label>
                                <input
                                    type="text"
                                    value={form.brand}
                                    onChange={e => handleChange('brand', e.target.value)}
                                    placeholder="Sholash"
                                />
                            </div>

                            {/* Tagline & Color */}
                            <div className={styles.formGroup}>
                                <label>Tagline</label>
                                <input
                                    type="text"
                                    value={form.tagline}
                                    onChange={e => handleChange('tagline', e.target.value)}
                                    placeholder="Short product tagline"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Card Color</label>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <input
                                        type="color"
                                        value={form.color}
                                        onChange={e => handleChange('color', e.target.value)}
                                        style={{ width: 40, height: 36, padding: 2, borderRadius: 8, cursor: 'pointer' }}
                                    />
                                    <input
                                        type="text"
                                        value={form.color}
                                        onChange={e => handleChange('color', e.target.value)}
                                        style={{ flex: 1 }}
                                    />
                                </div>
                            </div>

                            {/* Images */}
                            <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                                <label>Product Images</label>
                                <div
                                    className={styles.imageUploadArea}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Upload size={24} />
                                    <p style={{ margin: '0.5rem 0 0' }}>Click to upload images (max 5)</p>
                                    <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>JPEG, PNG, WebP — 5MB each</p>
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />

                                <div className={styles.imagePreviewGrid}>
                                    {/* Existing images (edit mode) */}
                                    {existingImages.map((img, idx) => (
                                        <div key={`ex-${idx}`} className={styles.imagePreviewItem}>
                                            <img src={getImageUrl(img)} alt={`existing-${idx}`} />
                                            <button
                                                type="button"
                                                className={styles.imageRemoveBtn}
                                                onClick={() => removeExistingImage(idx)}
                                            >×</button>
                                        </div>
                                    ))}
                                    {/* New file previews */}
                                    {newFiles.map((file, idx) => (
                                        <div key={`new-${idx}`} className={styles.imagePreviewItem}>
                                            <img src={URL.createObjectURL(file)} alt={`new-${idx}`} />
                                            <button
                                                type="button"
                                                className={styles.imageRemoveBtn}
                                                onClick={() => removeNewFile(idx)}
                                            >×</button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Features */}
                            <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                                <label>Features</label>
                                <div className={styles.listInput}>
                                    {form.features.map((feat, idx) => (
                                        <div key={idx} className={styles.listInputRow}>
                                            <input
                                                value={feat}
                                                onChange={e => updateListItem('features', idx, e.target.value)}
                                                placeholder={`Feature ${idx + 1}`}
                                            />
                                            <button
                                                type="button"
                                                className={styles.listRemoveBtn}
                                                onClick={() => removeListItem('features', idx)}
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                    <button type="button" className={styles.listAddBtn} onClick={() => addListItem('features')}>
                                        <Plus size={14} /> Add Feature
                                    </button>
                                </div>
                            </div>

                            {/* Target */}
                            <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                                <label>Target Audience</label>
                                <div className={styles.listInput}>
                                    {form.target.map((t, idx) => (
                                        <div key={idx} className={styles.listInputRow}>
                                            <input
                                                value={t}
                                                onChange={e => updateListItem('target', idx, e.target.value)}
                                                placeholder={`Target ${idx + 1}`}
                                            />
                                            <button
                                                type="button"
                                                className={styles.listRemoveBtn}
                                                onClick={() => removeListItem('target', idx)}
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                    <button type="button" className={styles.listAddBtn} onClick={() => addListItem('target')}>
                                        <Plus size={14} /> Add Target
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.modalFooter}>
                        <button type="button" className={styles.btnCancel} onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className={styles.btnSave} disabled={saving}>
                            {saving ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductsPage;
