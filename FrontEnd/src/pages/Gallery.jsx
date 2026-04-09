import React, { useState, useEffect } from 'react';
import api, { BASE_URL } from '../services/api';
import './Gallery.css';

const Gallery = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const { data } = await api.get('/api/upload/gallery');
                if (data.success) {
                    setPhotos(data.data);
                }
            } catch (error) {
                console.error("Error fetching gallery:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPhotos();
    }, []);

    const getFullUrl = (url) => {
        return url.startsWith('http') ? url : `${BASE_URL}${url}`;
    };

    return (
        <div className="gallery-page">
            {/* Dynamic Background Blobs */}
            <div className="bg-blob blob-1"></div>
            <div className="bg-blob blob-2"></div>
            
            <section className="gallery-hero">
                <div className="container">
                    <h1 className="serif fade-in">Customer Gallery</h1>
                    <p className="subtitle fade-in">Real People. Real Stories. Real Results.</p>
                </div>
            </section>

            <section className="gallery-grid-section">
                <div className="container">
                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Loading beautiful stories...</p>
                        </div>
                    ) : photos.length > 0 ? (
                        <div className="gallery-grid">
                            {photos.map((photo) => (
                                <div 
                                    key={photo._id} 
                                    className="gallery-item glass fade-in"
                                    onClick={() => setSelectedImage(getFullUrl(photo.url))}
                                >
                                    <div className="image-wrapper">
                                        <img src={getFullUrl(photo.url)} alt="Customer Story" loading="lazy" />
                                        <div className="image-overlay">
                                            <span className="view-text">View Full Story</span>
                                        </div>
                                    </div>
                                    {photo.caption && <p className="photo-caption">{photo.caption}</p>}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state glass">
                            <h3 className="serif">No stories shared yet</h3>
                            <p>Be the first to share your journey with us!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            {selectedImage && (
                <div className="gallery-lightbox" onClick={() => setSelectedImage(null)}>
                    <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setSelectedImage(null)}>✕</button>
                        <img src={selectedImage} alt="Full view" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
