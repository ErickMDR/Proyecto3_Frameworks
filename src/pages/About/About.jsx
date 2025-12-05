import React, { useState, useEffect } from 'react';
import Accordion from '../../components/Accordion/Accordion';
import styles from './About.module.css';

const About = () => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    average: "0.00",
    honorCertificates: "0",
    certificationCount: "0",
    englishLevel: "N/A"
  });

  useEffect(() => {
    const loadPersonalInfo = async () => {
      try {
        const response = await import('../../data/personalInfo.json');
        const data = response.default || response;
        
        let average = "0.00";
        let honorCertificates = "0";
        
        if (data.education) {
          for (const edu of data.education) {
            if (edu.details) {
              edu.details.forEach(detail => {
                if (detail.includes("Promedio")) {
                  const match = detail.match(/[\d.]+/);
                  if (match) average = match[0];
                }
                if (detail.includes("cuadro de honor")) {
                  const match = detail.match(/\d+/);
                  if (match) honorCertificates = match[0];
                }
              });
            }
          }
        }

        const englishLevel = data.languages?.find(lang => lang.name === "Inglés")?.level || "N/A";
        const certificationCount = data.certifications?.length?.toString() || "0";
        
        setStats({
          average,
          honorCertificates,
          certificationCount,
          englishLevel
        });
        
        setInfo(data);
      } catch (error) {
        console.error('Error loading personal info:', error);
        setInfo(null);
      } finally {
        setLoading(false);
      }
    };

    loadPersonalInfo();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Cargando información...</div>;
  }

  if (!info) {
    return <div className={styles.error}>No se pudo cargar la información personal.</div>;
  }

  return (
    <div className={styles.about}>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{info.name}</h1>
          <h2 className={styles.heroSubtitle}>{info.title}</h2>
          <p className={styles.heroDescription}>
            {info.about}
          </p>
          
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📧</span>
              <span>{info.contact.email}</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📱</span>
              <span>{info.contact.phone}</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📍</span>
              <span>{info.contact.location}</span>
            </div>
          </div>
        </div>
        
        <div className={styles.heroStats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{stats.average}</span>
            <span className={styles.statLabel}>Promedio Académico</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{stats.honorCertificates}</span>
            <span className={styles.statLabel}>Cuadros de Honor</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{stats.certificationCount}</span>
            <span className={styles.statLabel}>Certificaciones</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{stats.englishLevel}</span>
            <span className={styles.statLabel}>Nivel de Inglés</span>
          </div>
        </div>
      </div>

      <div className={styles.contentSections}>
        <div className={styles.mainContent}>
          <Accordion title="Datos Personales" isOpen={true}>
            <div className={styles.personalData}>
              <div className={styles.dataGrid}>
                <div className={styles.dataItem}>
                  <strong>Fecha de nacimiento:</strong>
                  <span>{info.birthDate}</span>
                </div>
                <div className={styles.dataItem}>
                  <strong>Nacionalidad:</strong>
                  <span>{info.nationality}</span>
                </div>
                <div className={styles.dataItem}>
                  <strong>Estado civil:</strong>
                  <span>{info.civilStatus}</span>
                </div>
                <div className={styles.dataItem}>
                  <strong>Cédula de identidad:</strong>
                  <span>{info.idNumber}</span>
                </div>
              </div>
            </div>
          </Accordion>

          <Accordion title="Competencias">
            <div className={styles.competenciesSection}>
              {info.competencies && info.competencies.length > 0 ? (
                <ul className={styles.competenciesList}>
                  {info.competencies.map((competency, index) => (
                    <li key={index} className={styles.competencyItem}>
                      {competency}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay competencias registradas.</p>
              )}
            </div>
          </Accordion>

          <Accordion title="Experiencia Laboral">
            <div className={styles.experienceList}>
              {info.experience && info.experience.length > 0 ? (
                info.experience.map((exp, index) => (
                  <div key={index} className={styles.experienceItem}>
                    <div className={styles.experienceHeader}>
                      <div>
                        <h4>{exp.role}</h4>
                        <div className={styles.experienceCompany}>
                          {exp.company} {exp.location ? `- ${exp.location}` : ''}
                        </div>
                      </div>
                      <span className={styles.experiencePeriod}>{exp.period}</span>
                    </div>
                    
                    {exp.subjects && exp.subjects.length > 0 && (
                      <div className={styles.experienceSubjects}>
                        <strong>Materias impartidas:</strong>
                        <ul>
                          {exp.subjects.map((subject, idx) => (
                            <li key={idx}>{subject}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {exp.description && (
                      <p className={styles.experienceDescription}>{exp.description}</p>
                    )}
                  </div>
                ))
              ) : (
                <p>No hay experiencia registrada.</p>
              )}
            </div>
          </Accordion>

          <Accordion title="Formación Académica">
            <div className={styles.educationList}>
              {info.education && info.education.length > 0 ? (
                info.education.map((edu, index) => (
                  <div key={index} className={styles.educationItem}>
                    <div className={styles.educationHeader}>
                      <div>
                        <h4>{edu.degree}</h4>
                        <div className={styles.educationInstitution}>
                          {edu.institution} {edu.location ? `- ${edu.location}` : ''}
                        </div>
                      </div>
                      <span className={styles.educationPeriod}>{edu.period}</span>
                    </div>
                    
                    {edu.status && (
                      <div className={styles.educationStatus}>
                        <strong>Estado:</strong> {edu.status}
                      </div>
                    )}
                    
                    {edu.details && edu.details.length > 0 && (
                      <div className={styles.educationDetails}>
                        {edu.details.map((detail, idx) => (
                          <p key={idx} className={styles.educationDetail}>• {detail}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>No hay información educativa registrada.</p>
              )}
            </div>
          </Accordion>

          <Accordion title="Certificaciones y Cursos">
            <div className={styles.certificationsList}>
              {info.certifications && info.certifications.length > 0 ? (
                info.certifications.map((cert, index) => (
                  <div key={index} className={styles.certificationItem}>
                    <h4>{cert.name}</h4>
                    <div className={styles.certificationMeta}>
                      <span>{cert.hours}</span>
                      <span>{cert.date}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hay certificaciones registradas.</p>
              )}
            </div>
          </Accordion>

          <Accordion title="Habilidades">
            <div className={styles.skillsSection}>
              {info.skills && (
                <>
                  {info.skills.technical && info.skills.technical.length > 0 && (
                    <div className={styles.skillsCategory}>
                      <h5>Técnicas</h5>
                      <div className={styles.skillsList}>
                        {info.skills.technical.map((skill, index) => (
                          <span key={index} className={styles.skillTag}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {info.skills.personal && info.skills.personal.length > 0 && (
                    <div className={styles.skillsCategory}>
                      <h5>Personales</h5>
                      <div className={styles.skillsList}>
                        {info.skills.personal.map((skill, index) => (
                          <span key={index} className={styles.skillTag}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </Accordion>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.languagesCard}>
            <h3>Idiomas</h3>
            {info.languages && info.languages.length > 0 ? (
              info.languages.map((lang, index) => (
                <div key={index} className={styles.languageItem}>
                  <span className={styles.languageName}>{lang.name}</span>
                  <span className={styles.languageLevel}>{lang.level}</span>
                </div>
              ))
            ) : (
              <p>No hay idiomas registrados.</p>
            )}
          </div>

          <div className={styles.socialCard}>
            <h3>Redes Sociales</h3>
            <div className={styles.socialLinks}>
              {info.social.github && (
                <a href={info.social.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <span className={styles.socialIcon}>🐙</span>
                  <span>GitHub</span>
                </a>
              )}
              {info.social.instagram && (
                <a href={info.social.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <span className={styles.socialIcon}>💼</span>
                  <span>Instagram</span>
                </a>
              )}
              {info.social.twitter && (
                <a href={info.social.twitter} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <span className={styles.socialIcon}>🐦</span>
                  <span>Twitter</span>
                </a>
              )}
            </div>
          </div>

          <div className={styles.downloadCard}>
            <h3>Descargar Curriculum</h3>
            <a 
              href="/CV Erick Diaz.pdf" 
              download 
              className={styles.downloadButton}
            >
              📄 Descargar CV
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;