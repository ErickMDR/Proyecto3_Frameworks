import React, { useState, useMemo } from 'react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import ProjectGallery from '../../components/ProjectGallery/ProjectGallery';
import Accordion from '../../components/Accordion/Accordion';
import projectsData from '../../data/projects.json';
import styles from './Projects.module.css';

const Projects = () => {
  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [collaborationFilter, setCollaborationFilter] = useState('all');
  const [selectedProjectId, setSelectedProjectId] = useState(projectsData[0]?.id || null);

  const selectedProject = useMemo(() => 
    projectsData.find(project => project.id === selectedProjectId) || projectsData[0],
    [selectedProjectId]
  );

  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      // Filtrar por búsqueda
      const matchesSearch = searchTerm === '' || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Filtrar por categoría
      const matchesCategory = selectedCategory === 'all' || 
        project.category === selectedCategory;

      // Filtrar por colaboración
      const matchesCollaboration = collaborationFilter === 'all' ||
        (collaborationFilter === 'solo' && project.collaboration.solo) ||
        (collaborationFilter === 'team' && !project.collaboration.solo);

      return matchesSearch && matchesCategory && matchesCollaboration;
    });
  }, [searchTerm, selectedCategory, collaborationFilter]);

  React.useEffect(() => {
    if (!filteredProjects.some(p => p.id === selectedProjectId) && filteredProjects.length > 0) {
      setSelectedProjectId(filteredProjects[0].id);
    }
  }, [filteredProjects, selectedProjectId]);

  const categories = useMemo(() => 
    [...new Set(projectsData.map(p => p.category))], 
    []
  );
  
  const handleProjectSelect = (projectId) => {
    setSelectedProjectId(projectId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setCollaborationFilter('all');
  };

  return (
    <div className={styles.projects}>

      <div className={styles.projectsLayout}>
        {/* Sidebar de filtros */}
        <div className={styles.projectsSidebar}>
          <div className={styles.searchSection}>
            <h3>Buscar Proyectos</h3>
            <input
              type="text"
              placeholder="título, descripción..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={styles.filtersSection}>
            <h3>Filtros</h3>
            
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Categoría:</label>
              <select
                className={styles.filterSelect}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">Todas las categorías</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Colaboración:</label>
              <div className={styles.filterOptions}>
                <button
                  className={`${styles.filterButton} ${collaborationFilter === 'all' ? styles.activeFilter : ''}`}
                  onClick={() => setCollaborationFilter('all')}
                >
                  Todos
                </button>
                <button
                  className={`${styles.filterButton} ${collaborationFilter === 'solo' ? styles.activeFilter : ''}`}
                  onClick={() => setCollaborationFilter('solo')}
                >
                  Individual
                </button>
                <button
                  className={`${styles.filterButton} ${collaborationFilter === 'team' ? styles.activeFilter : ''}`}
                  onClick={() => setCollaborationFilter('team')}
                >
                  En equipo
                </button>
              </div>
            </div>

            {(searchTerm || selectedCategory !== 'all' || collaborationFilter !== 'all') && (
              <button className={styles.clearFiltersButton} onClick={clearFilters}>
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {/* Contenido principal */}
        <div className={styles.projectsContent}>
          {selectedProject && filteredProjects.length > 0 ? (
            <div className={styles.selectedProject}>
              <div className={styles.selectedProjectHeader}>
                <h2>{selectedProject.title}</h2>
                <div className={styles.selectedProjectMeta}>
                  <span className={styles.projectYear}>{selectedProject.year}</span>
                  <span className={styles.projectCategory}>{selectedProject.category}</span>
                  <span className={`${styles.collabBadge} ${selectedProject.collaboration.solo ? styles.solo : styles.team}`}>
                    {selectedProject.collaboration.solo ? 'Individual' : 'Colaborativo'}
                  </span>
                </div>
              </div>

              <div className={styles.projectGalleryContainer}>
                <ProjectGallery project={selectedProject} />
              </div>

              <div className={styles.projectDetails}>
                <Accordion title="Descripción Detallada" isOpen={true}>
                  <div className={styles.detailSection}>
                    <p>{selectedProject.description}</p>
                    
                    <h4>Duración:</h4>
                    <p>{selectedProject.duration}</p>
                    
                    {selectedProject.features && selectedProject.features.length > 0 && (
                      <>
                        <h4>Características principales:</h4>
                        <ul className={styles.featuresList}>
                          {selectedProject.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </>
                    )}
                    
                    {selectedProject.collaboration.developers.length > 0 && (
                      <>
                        <h4>Colaboradores:</h4>
                        <ul className={styles.collaboratorsList}>
                          {selectedProject.collaboration.developers.map((dev, index) => (
                            <li key={index}>{dev}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </Accordion>

                <Accordion title="Tecnologías Utilizadas">
                  <div className={styles.technologiesSection}>
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className={styles.techTag}>{tech}</span>
                    ))}
                  </div>
                </Accordion>

                <Accordion title="Enlaces y Recursos">
                  <div className={styles.linksSection}>
                    {selectedProject.codeLink && (
                      <a 
                        href={selectedProject.codeLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.resourceLink}
                      >
                        🔗 Ver código en GitHub
                      </a>
                    )}
                  </div>
                </Accordion>
              </div>
            </div>
          ) : (
            <div className={styles.noSelectedProject}>
              <p>Selecciona un proyecto para ver los detalles.</p>
            </div>
          )}

          {/* Grid de todos los proyectos */}
          <div className={styles.projectsGridSection}>
            <h3>
              Proyectos {filteredProjects.length !== projectsData.length ? 
                `(${filteredProjects.length} de ${projectsData.length})` : 
                `(${projectsData.length})`
              }
            </h3>
            
            {filteredProjects.length > 0 ? (
              <div className={styles.projectsGrid}>
                {filteredProjects.map(project => (
                  <div 
                    key={project.id} 
                    className={`${styles.projectCardWrapper} ${selectedProjectId === project.id ? styles.selectedCard : ''}`}
                    onClick={() => handleProjectSelect(project.id)}
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>
                <p>No se encontraron proyectos con los filtros seleccionados.</p>
                <button 
                  className={styles.resetButton}
                  onClick={clearFilters}
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;