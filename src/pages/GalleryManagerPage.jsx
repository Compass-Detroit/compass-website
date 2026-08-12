import React, { useState, useEffect } from 'react';
import { PageLayout } from '@/layouts/PageLayout';
import { FaUpload, FaTrash, FaStar, FaTags, FaFilter, FaCheckSquare, FaSquare, FaImage, FaCamera, FaCalendarAlt } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const initialGalleryData = [
  { id: 1, url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop', tags: ['keynote', 'audience'], photographer: 'Jane Smith', event: 'COMPASS 2025', year: '2025', track: 'Main Stage', featured: true, uploadedAt: new Date().toISOString() },
  { id: 2, url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop', tags: ['networking', 'break'], photographer: 'John Doe', event: 'COMPASS 2025', year: '2025', track: 'Lounge', featured: false, uploadedAt: new Date().toISOString() },
  { id: 3, url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop', tags: ['workshop', 'coding'], photographer: 'Alex Kim', event: 'COMPASS 2024', year: '2024', track: 'Web', featured: false, uploadedAt: new Date().toISOString() },
];

const GalleryManagerPage = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  
  // Filters
  const [filterYear, setFilterYear] = useState('All');
  const [filterTag, setFilterTag] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('compass_gallery_data');
    if (stored) {
      setPhotos(JSON.parse(stored));
    } else {
      setPhotos(initialGalleryData);
      localStorage.setItem('compass_gallery_data', JSON.stringify(initialGalleryData));
    }
  }, []);

  const savePhotos = (updatedPhotos) => {
    setPhotos(updatedPhotos);
    localStorage.setItem('compass_gallery_data', JSON.stringify(updatedPhotos));
  };

  const toggleSelection = (id) => {
    setSelectedPhotos(prev => 
      prev.includes(id) ? prev.filter(photoId => photoId !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedPhotos.length === filteredPhotos.length) {
      setSelectedPhotos([]);
    } else {
      setSelectedPhotos(filteredPhotos.map(p => p.id));
    }
  };

  const toggleFeatured = (id) => {
    const updated = photos.map(p => p.id === id ? { ...p, featured: !p.featured } : p);
    savePhotos(updated);
  };

  const deletePhoto = (id) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      const updated = photos.filter(p => p.id !== id);
      savePhotos(updated);
      setSelectedPhotos(prev => prev.filter(photoId => photoId !== id));
    }
  };

  const bulkDelete = () => {
    if (window.confirm(`Delete ${selectedPhotos.length} selected photos?`)) {
      const updated = photos.filter(p => !selectedPhotos.includes(p.id));
      savePhotos(updated);
      setSelectedPhotos([]);
    }
  };

  const updatePhoto = (id, field, value) => {
    const updated = photos.map(p => p.id === id ? { ...p, [field]: value } : p);
    savePhotos(updated);
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!newPhotoUrl.trim()) return;
    
    const newPhoto = {
      id: Date.now(),
      url: newPhotoUrl,
      tags: [],
      photographer: '',
      event: 'COMPASS 2026',
      year: '2026',
      track: '',
      featured: false,
      uploadedAt: new Date().toISOString()
    };
    
    savePhotos([newPhoto, ...photos]);
    setNewPhotoUrl('');
    setIsUploadModalOpen(false);
  };

  const filteredPhotos = photos.filter(p => {
    if (filterYear !== 'All' && p.year !== filterYear) return false;
    if (filterTag && !p.tags.some(t => t.toLowerCase().includes(filterTag.toLowerCase()))) return false;
    return true;
  });

  const uniqueYears = ['All', ...new Set(photos.map(p => p.year))].sort().reverse();
  const uniquePhotographers = [...new Set(photos.map(p => p.photographer).filter(Boolean))];

  return (
    <PageLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        
        {/* Top Toolbar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FaImage className="text-primary" /> Gallery Manager
              </h1>
            </div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <select 
                value={filterYear} 
                onChange={(e) => setFilterYear(e.target.value)}
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm focus:ring-primary focus:border-primary dark:text-white"
              >
                {uniqueYears.map(year => <option key={year} value={year}>{year} Events</option>)}
              </select>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400">
                  <FaFilter className="text-xs" />
                </div>
                <input 
                  type="text" 
                  placeholder="Filter by tag..." 
                  value={filterTag}
                  onChange={(e) => setFilterTag(e.target.value)}
                  className="rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 pl-8 pr-3 py-2 text-sm focus:ring-primary focus:border-primary dark:text-white w-32 sm:w-48"
                />
              </div>

              <button 
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-primary text-gray-900 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary/90 transition-colors shrink-0"
              >
                <FaUpload /> <span className="hidden sm:inline">Upload</span>
              </button>
            </div>
          </div>

          {/* Bulk Actions Bar */}
          {selectedPhotos.length > 0 && (
            <div className="bg-indigo-50 dark:bg-indigo-900/30 border-t border-indigo-100 dark:border-indigo-800 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between animate-fade-in">
              <div className="flex items-center gap-3">
                <button onClick={selectAll} className="text-indigo-600 dark:text-indigo-400 font-medium text-sm flex items-center gap-1">
                  <FaCheckSquare /> {selectedPhotos.length} Selected
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">
                  Bulk Tag
                </button>
                <button onClick={bulkDelete} className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 px-3 py-1 bg-red-50 dark:bg-red-900/20 rounded-md flex items-center gap-1">
                  <FaTrash /> Delete Selected
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
            <span>Total Photos: <strong className="text-gray-900 dark:text-white">{photos.length}</strong></span>
            <span>Photographers: <strong className="text-gray-900 dark:text-white">{uniquePhotographers.length}</strong></span>
          </div>
        </div>

        {/* Photo Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredPhotos.map((photo) => (
              <div key={photo.id} className="break-inside-avoid relative group rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
                
                {/* Image */}
                <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-700">
                  <img src={photo.url} alt="Event photo" className="w-full h-full object-cover" loading="lazy" />
                  
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                    <div className="flex justify-between items-start">
                      <button 
                        onClick={() => toggleSelection(photo.id)}
                        className="text-white hover:text-primary transition-colors"
                      >
                        {selectedPhotos.includes(photo.id) ? <FaCheckSquare className="text-xl text-primary" /> : <FaSquare className="text-xl" />}
                      </button>
                      <button 
                        onClick={() => toggleFeatured(photo.id)}
                        className={`transition-colors ${photo.featured ? 'text-primary' : 'text-white/70 hover:text-primary'}`}
                        title="Toggle Featured"
                      >
                        <FaStar className="text-xl" />
                      </button>
                    </div>
                    <div className="flex justify-end">
                      <button 
                        onClick={() => deletePhoto(photo.id)}
                        className="text-white/70 hover:text-red-500 transition-colors p-1"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  
                  {/* Persistent Selection Indicator */}
                  {selectedPhotos.includes(photo.id) && (
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <FaCheckSquare className="text-xl text-primary bg-white/50 rounded-sm" />
                    </div>
                  )}
                  {/* Persistent Featured Indicator */}
                  {photo.featured && !selectedPhotos.includes(photo.id) && (
                    <div className="absolute top-3 right-3 pointer-events-none">
                      <FaStar className="text-xl text-primary drop-shadow-md" />
                    </div>
                  )}
                </div>

                {/* Metadata Editor */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <FaTags className="text-gray-400 text-xs shrink-0" />
                    <input 
                      type="text" 
                      value={photo.tags.join(', ')} 
                      onChange={(e) => updatePhoto(photo.id, 'tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                      placeholder="Add tags (comma separated)"
                      className="w-full text-sm bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary focus:outline-none dark:text-gray-200 dark:hover:border-gray-600 transition-colors px-1"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCamera className="text-gray-400 text-xs shrink-0" />
                    <input 
                      type="text" 
                      value={photo.photographer} 
                      onChange={(e) => updatePhoto(photo.id, 'photographer', e.target.value)}
                      placeholder="Photographer credit"
                      className="w-full text-sm bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary focus:outline-none dark:text-gray-200 dark:hover:border-gray-600 transition-colors px-1"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-400 text-xs shrink-0" />
                    <select 
                      value={photo.track} 
                      onChange={(e) => updatePhoto(photo.id, 'track', e.target.value)}
                      className="w-full text-sm bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary focus:outline-none dark:text-gray-200 dark:hover:border-gray-600 transition-colors px-1 appearance-none cursor-pointer"
                    >
                      <option value="">Select Track/Area</option>
                      <option value="Main Stage">Main Stage</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Lounge">Lounge</option>
                      <option value="Web">Web Track</option>
                      <option value="AI">AI Track</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredPhotos.length === 0 && (
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
              <FaImage className="mx-auto text-4xl text-gray-300 dark:text-gray-600 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">No photos found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or upload some new photos.</p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal Mockup */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200 dark:border-gray-700 animate-fade-in-up">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Upload Photos</h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <IoClose size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                <FaUpload className="mx-auto text-3xl text-gray-400 dark:text-gray-500 mb-3" />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Drag & drop images here</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">or click to browse files (Mockup)</p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-2 bg-white dark:bg-gray-800 text-xs text-gray-500">OR PASTE URL</span>
                </div>
              </div>

              <form onSubmit={handleUploadSubmit}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                <input 
                  type="url" 
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary dark:text-white" 
                  placeholder="https://..."
                  required
                />
                <button type="submit" className="mt-4 w-full bg-primary text-gray-900 font-bold py-2.5 rounded-lg hover:bg-primary/90 transition-colors">
                  Add to Gallery
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </PageLayout>
  );
};

export default GalleryManagerPage;
