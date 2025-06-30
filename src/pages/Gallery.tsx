import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { galleryPhotos, GalleryPhoto } from '@/data/gallery';

const Gallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Sort photos in reverse chronological order
  const sortedPhotos = [...galleryPhotos].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <Layout>
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              Photo Gallery
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Explore moments from our research group, team events, and collaborations
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPhotos.map((photo) => (
              <Card 
                key={photo.path} 
                className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={photo.path}
                    alt={photo.description}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {formatDate(photo.date)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{photo.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for enlarged photo */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedPhoto.path}
              alt={selectedPhoto.description}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {formatDate(selectedPhoto.date)}
                </span>
              </div>
              <p className="text-gray-600">{selectedPhoto.description}</p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Gallery; 