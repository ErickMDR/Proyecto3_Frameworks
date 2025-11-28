import React, { useState } from 'react';
import styles from './ProjectGallery.module.css';

const ProjectGallery = ({ project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('images'); 

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevVideo = () => {
    setCurrentVideoIndex(prev => 
      prev === 0 ? project.videos.length - 1 : prev - 1
    );
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex(prev => 
      prev === project.videos.length - 1 ? 0 : prev + 1
    );
  };

  if (!project.images && !project.videos) {
    return (
      <div className={styles.galleryContainer}>
        <p className={styles.noMedia}>No hay medios disponibles para este proyecto.</p>
      </div>
    );
  }

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.tabs}>
        {project.images && project.images.length > 0 && (
          <button
            className={`${styles.tab} ${activeTab === 'images' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('images')}
          >
            Imágenes
          </button>
        )}
        
        {project.videos && project.videos.length > 0 && (
          <button
            className={`${styles.tab} ${activeTab === 'videos' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            Videos
          </button>
        )}
      </div>

      <div className={styles.mediaContent}>
        {activeTab === 'images' && project.images && project.images.length > 0 && (
          <>
            <div className={styles.mainImageContainer}>
              <button 
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={handlePrevImage}
                disabled={project.images.length <= 1}
              >
                &#10094;
              </button>
              
              <div className={styles.mainImage}>
                <img 
                  src={project.images[currentImageIndex]} 
                  alt={`${project.title} - Imagen ${currentImageIndex + 1}`}
                  className={styles.image}
                />
              </div>
              
              <button 
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={handleNextImage}
                disabled={project.images.length <= 1}
              >
                &#10095;
              </button>
            </div>
            
            <div className={styles.imageCounter}>
              {currentImageIndex + 1} / {project.images.length}
            </div>
            
            {project.images.length > 1 && (
              <div className={styles.thumbnails}>
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    className={`${styles.thumbnail} ${index === currentImageIndex ? styles.activeThumbnail : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`Miniatura ${index + 1}`}
                      className={styles.thumbnailImage}
                    />
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'videos' && project.videos && project.videos.length > 0 && (
          <>
            <div className={styles.mainVideoContainer}>
              <button 
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={handlePrevVideo}
                disabled={project.videos.length <= 1}
              >
                &#10094;
              </button>
              
              <div className={styles.mainVideo}>
                <video 
                  src={project.videos[currentVideoIndex]} 
                  controls
                  className={styles.video}
                >
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>
              
              <button 
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={handleNextVideo}
                disabled={project.videos.length <= 1}
              >
                &#10095;
              </button>
            </div>
            
            <div className={styles.videoCounter}>
              {currentVideoIndex + 1} / {project.videos.length}
            </div>
            
            {project.videos.length > 1 && (
              <div className={styles.videoThumbnails}>
                {project.videos.map((video, index) => (
                  <button
                    key={index}
                    className={`${styles.videoThumbnail} ${index === currentVideoIndex ? styles.activeVideoThumbnail : ''}`}
                    onClick={() => setCurrentVideoIndex(index)}
                  >
                    <div className={styles.videoThumbnailIcon}>
                      <span>▶</span>
                    </div>
                    <span className={styles.videoThumbnailText}>Video {index + 1}</span>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectGallery;