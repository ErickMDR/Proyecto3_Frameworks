import React, { useState, useEffect } from 'react';
import ProjectCarousel from '../../components/Carousel/ProjectCarousel';
import TechPieChart from '../../components/Charts/TechPieChart';
import CategoryPieChart from '../../components/Charts/CategoryPieChart';
import styles from './Home.module.css';

const Home = () => {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    completedProjects: 0,
    yearsOfExperience: 0,
    masteredTechnologies: 0,
    certificationsCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const personalResponse = await import('../../data/personalInfo.json');
        const personalData = personalResponse.default || personalResponse;
        setPersonalInfo(personalData);
        const projectsResponse = await import('../../data/projects.json');
        const projectsData = projectsResponse.default || projectsResponse;
        setProjects(projectsData);

        const calculateExperienceYears = () => {
          if (!personalData.experience || personalData.experience.length === 0) return 0;
          
          const earliestDate = personalData.experience.reduce((earliest, exp) => {
            const period = exp.period.toLowerCase();
            const match = period.match(/(\d{4})/);
            if (match) {
              const year = parseInt(match[1]);
              return year < earliest ? year : earliest;
            }
            return earliest;
          }, new Date().getFullYear());
          
          const currentYear = new Date().getFullYear();
          return Math.max(currentYear - earliestDate, 1); 
        };

        const calculateUniqueTechnologies = () => {
          const allTechnologies = projectsData.flatMap(project => project.technologies || []);
          const uniqueTechnologies = [...new Set(allTechnologies)];
          return uniqueTechnologies.length;
        };

        setStats({
          completedProjects: projectsData.length,
          yearsOfExperience: calculateExperienceYears(),
          masteredTechnologies: calculateUniqueTechnologies(),
          certificationsCount: personalData.certifications?.length || 0
        });

      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Cargando información...</div>;
  }

  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Hola Soy Erick Díaz!
        </h1>
        <p className={styles.heroSubtitle}>
          {personalInfo?.title || 'Ingeniero de Telecomunicaciones'} y estudiante de Ingeniería de Computación
        </p>
        <p className={styles.heroDescription}>
          Bienvenido a mi portafolio personal. Aquí muestro mis proyectos más relevantes 
          en el área de desarrollo de software.
        </p>
      </div>

      <div className={styles.carouselWrapper}>
        <ProjectCarousel />
      </div>

      <div className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{stats.completedProjects}+</span>
            <span className={styles.statLabel}>Proyectos Completados</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{stats.yearsOfExperience}+</span>
            <span className={styles.statLabel}>Años de Experiencia</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{stats.masteredTechnologies}+</span>
            <span className={styles.statLabel}>Tecnologías Dominadas</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{stats.certificationsCount}</span>
            <span className={styles.statLabel}>Certificaciones CCNA</span>
          </div>
        </div>
      </div>

      <div className={styles.chartsSection}>
        <h2 className={styles.sectionTitle}>Estadísticas de Proyectos</h2>
        
        <div className={styles.chartsGrid}>
          <div className={styles.chartItem}>
            <TechPieChart projects={projects} />
          </div>
          <div className={styles.chartItem}>
            <CategoryPieChart projects={projects} />
          </div>
        </div>
      </div>

      <div className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>¿Interesado en colaborar?</h2>
        <p className={styles.ctaDescription}>
          Estoy siempre abierto a discutir nuevos proyectos, oportunidades de colaboración 
          o simplemente charlar sobre tecnología.
        </p>
        <div className={styles.ctaButtons}>
          <a href="/projects" className={styles.ctaButtonPrimary}>
            Ver Proyectos
          </a>
          <a href="/about" className={styles.ctaButtonSecondary}>
            Sobre Mí
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;