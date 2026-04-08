import React, { useState, useEffect, useRef } from 'react';
import api, { BASE_URL } from '../../services/api';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Plus, Trash2, X, Upload, Image as ImageIcon } from 'lucide-react';
import ConfirmModal from '../../components/admin/common/ConfirmModal';
import styles from './BannersPage.module.css';

const BannersPage = () => {
    const { token } = useAdminAuth();
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const getImageUrl = (img) => {
        if (!img) return null;
        img = img.replace(/\\/g, '/');
        if (img.startsWith('http')) return img;
        const BASE = BASE_URL;
        return img.startsWith('/') ? `${BASE}${img}` : `${BASE}/${img}`;
    };

    const fetchBanners = async () => {
        try {
            setLoading(true);
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const res = await api.get('/api/banners/admin/all', { headers });
            if (res.data.success) {
                setBanners(res.data.data || []);
            }
        } catch (err) {
            console.error('Failed to fetch banners', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await api.get('/api/products/admin/all', {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            if (res.data.success) {
                setProducts(res.data.data || []);
            }
        } catch (err) {
            console.error('Failed to fetch products', err);
        }
    };

    useEffect(() => {
        fetchBanners();
        fetchProducts();
    }, [token]);

    const handleSave = async (formData) => {
        try {
            setSaving(true);
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            };

            await api.post('/api/banners', formData, { headers });
            setShowForm(false);
            fetchBanners();
        } catch (err) {
            console.error('Failed to save banner', err);
            alert(err.response?.data?.message || 'Failed to save banner');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            const headers = { Authorization: `Bearer ${token}` };
            await api.delete(`/api/banners/${deleteTarget._id}`, { headers });
            setDeleteTarget(null);
            fetchBanners();
        } catch (err) {
            console.error('Failed to delete banner', err);
        }
    };

    const handleToggleStatus = async (banner) => {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            await api.patch(`/api/banners/${banner._id}/toggle`, {}, { headers });
            fetchBanners();
        } catch (err) {
            console.error('Failed to toggle status', err);
        }
    };

    return (
        <div className={`${styles.bannersPage} admin-fade-in-up`}>
            <div className={styles.header}>
                <div className={styles.titleInfo}>
                    <h2>Hero Banners</h2>
                    <p>Manage promotional cards for the home page carousel.</p>
                </div>
                <div className={styles.headerActions}>
                    <button className={styles.btnPrimary} onClick={() => setShowForm(true)}>
                        <Plus size={18} />
                        Add Banner
                    </button>
                </div>
            </div>

            <div className={styles.tableCard}>
                {loading ? (
                    <div className={styles.loading}>Loading banners...</div>
                ) : banners.length === 0 ? (
                    <div className={styles.emptyState}>
                        <ImageIcon size={48} />
                        <h3>No banners found</h3>
                        <p>Upload your first hero banner card.</p>
                    </div>
                ) : (
                    <table className={styles.bannerTable}>
                        <thead>
                            <tr>
                                <th>Banner</th>
                                <th>Link</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {banners.map(banner => (
                                <tr key={banner._id}>
                                    <td>
                                        <div className={styles.bannerCell}>
                                            <img
                                                src={getImageUrl(banner.image)}
                                                alt={banner.title}
                                                className={styles.bannerThumb}
                                            />
                                            <div className={styles.bannerInfo}>
                                                <span className={styles.bannerTitle}>{banner.title || 'Untitled Banner'}</span>
                                                {banner.description && (
                                                    <span className={styles.bannerDesc}>{banner.description}</span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.linkCell}>
                                        {banner.link}
                                    </td>
                                    <td>
                                        <span
                                            className={`${styles.statusBadge} ${banner.isActive ? styles.statusActive : styles.statusInactive}`}
                                            onClick={() => handleToggleStatus(banner)}
                                            title="Click to toggle status"
                                        >
                                            <span className={styles.statusDot}></span>
                                            {banner.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actionBtns}>
                                            <button
                                                className={`${styles.actionBtn} ${styles.actionBtnDanger}`}
                                                onClick={() => setDeleteTarget(banner)}
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

            {/* Banner Form Modal */}
            {showForm && (
                <BannerFormModal
                    products={products}
                    saving={saving}
                    onSave={handleSave}
                    onClose={() => setShowForm(false)}
                />
            )}

            {/* Delete Confirmation */}
            <ConfirmModal
                isOpen={!!deleteTarget}
                title="Delete Banner"
                message="Are you sure you want to delete this banner? This action cannot be undone."
                onConfirm={handleDelete}
                onClose={() => setDeleteTarget(null)}
                isDanger={true}
                confirmText="Delete"
            />
        </div>
    );
};

// Banner Form Modal Component
const BannerFormModal = ({ products, saving, onSave, onClose }) => {
    const fileInputRef = useRef(null);
    const [form, setForm] = useState({
        title: '',
        description: '',
        link: '',
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isCustomLink, setIsCustomLink] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleLinkChange = (val) => {
        if (val === 'custom') {
            setIsCustomLink(true);
            setForm({ ...form, link: '' });
        } else {
            setIsCustomLink(false);
            setForm({ ...form, link: val });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedFile) {
            alert('Please select an image');
            return;
        }

        const fd = new FormData();
        fd.append('title', form.title);
        fd.append('description', form.description);
        fd.append('link', form.link);
        fd.append('image', selectedFile);

        onSave(fd);
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>Add New Hero Banner</h2>
                    <button className={styles.modalCloseBtn} onClick={onClose}>
                        <X size={22} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.modalForm}>
                    <div className={styles.modalBody}>
                        <div className={styles.formGroup}>
                            <label>Banner Image *</label>
                            {!previewUrl ? (
                                <div
                                    className={styles.imageUploadArea}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Upload size={24} />
                                    <p>Click to upload banner image</p>
                                    <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Recommended: 1200x600px</p>
                                </div>
                            ) : (
                                <div className={styles.previewContainer}>
                                    <img src={previewUrl} alt="Preview" />
                                    <button
                                        type="button"
                                        className={styles.removeImage}
                                        onClick={() => { setSelectedFile(null); setPreviewUrl(null); }}
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Title</label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={e => setForm({ ...form, title: e.target.value })}
                                placeholder="e.g. Summer Sale 20% Off"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Description</label>
                            <textarea
                                value={form.description}
                                onChange={e => setForm({ ...form, description: e.target.value })}
                                placeholder="Optional short description"
                                rows={2}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Redirect Link *</label>
                            <select
                                value={isCustomLink ? 'custom' : form.link}
                                onChange={e => handleLinkChange(e.target.value)}
                                required
                            >
                                <option value="">Select a product or enter manual link</option>
                                <optgroup label="Products">
                                    {products.map(p => (
                                        <option key={p._id} value={`/product/${p._id}`}>
                                            {p.name}
                                        </option>
                                    ))}
                                </optgroup>
                                <option value="/">Home Page</option>
                                <option value="/about">About Page</option>
                                <option value="/contact">Contact Page</option>
                                <option value="custom">Custom Link...</option>
                            </select>

                            {isCustomLink && (
                                <input
                                    type="text"
                                    style={{ marginTop: '0.5rem' }}
                                    placeholder="Enter custom URL (e.g. /product/123)"
                                    value={form.link}
                                    onChange={e => setForm({ ...form, link: e.target.value })}
                                    required
                                />
                            )}
                        </div>
                    </div>

                    <div className={styles.modalFooter}>
                        <button type="button" className={styles.btnCancel} onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className={styles.btnSave} disabled={saving || !selectedFile}>
                            {saving ? 'Creating...' : 'Create Banner'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BannersPage;
