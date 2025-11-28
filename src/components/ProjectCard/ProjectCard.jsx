import React from 'react';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project }) => {
  return (
    <div className={styles.projectCard}>
      <div className={styles.cardHeader}>
        <div className={styles.headerTop}>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <span className={styles.projectYear}>{project.year}</span>
        </div>
        <div className={styles.projectCategory}>
          {project.category}
        </div>
      </div>
      
      <div className={styles.cardBody}>
        <p className={styles.projectDescription}>{project.description}</p>
        
        <div className={styles.collaborationInfo}>
          <span className={`${styles.collabBadge} ${project.collaboration.solo ? styles.solo : styles.team}`}>
            {project.collaboration.solo ? 'Proyecto Individual' : 'Proyecto en Equipo'}
          </span>
          {!project.collaboration.solo && project.collaboration.developers.length > 0 && (
            <span className={styles.teamSize}>
              +{project.collaboration.developers.length} colaboradores
            </span>
          )}
        </div>
        
        <div className={styles.technologiesSection}>
          <h4>Tecnologías Utilizadas:</h4>
          <div className={styles.technologiesList}>
            {project.technologies.map((tech, index) => (
              <span key={index} className={styles.techTag}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;