import React, { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './ProjectCarousel.module.css';
import projectsData from '../../data/projects.json';

const ProjectCarousel = () => {
  const projects = useMemo(() => {
    const sortedProjects = [...projectsData].sort((a, b) => b.year - a.year);
    return sortedProjects.slice(0, 5);
  }, []); 

  return (
    <div className={styles.carouselContainer}>
      <h2 className={styles.carouselTitle}>Proyectos Destacados</h2>
      {projects.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className={styles.swiper}
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <div className={styles.slideContent}>
                <div className={styles.slideImage}>
                  {project.images && project.images.length > 0 ? (
                    <img 
                      src={project.images[0]} 
                      alt={project.title}
                      className={styles.projectImage}
                    />
                  ) : (
                    <div className={styles.placeholderImage}>
                      <span>📁</span>
                      <p>Sin imagen disponible</p>
                    </div>
                  )}
                </div>
                
                <div className={styles.slideInfo}>
                  <div className={styles.projectMeta}>
                    <span className={styles.projectYear}>{project.year}</span>
                    <span className={`${styles.collabBadge} ${project.collaboration.solo ? styles.solo : styles.team}`}>
                      {project.collaboration.solo ? 'Individual' : 'Colaborativo'}
                    </span>
                  </div>
                  
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                  
                  <div className={styles.technologies}>
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <span key={index} className={styles.techTag}>{tech}</span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className={styles.moreTechs}>+{project.technologies.length - 4} más</span>
                    )}
                  </div>
                  
                  <div className={styles.projectActions}>
                    <a 
                      href={`/projects#project-${project.id}`} 
                      className={styles.viewDetailsBtn}
                    >
                      Ver Detalles
                    </a>
                    {project.codeLink && (
                      <a 
                        href={project.codeLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.codeLinkBtn}
                      >
                        Ver Código
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className={styles.noProjects}>
          <p>No hay proyectos disponibles para mostrar en el carrusel.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectCarousel;