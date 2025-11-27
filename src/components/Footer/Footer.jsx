import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Contacto</h3>
          <p>erickdiaz.rdgz@gmail.com</p>
          <p>+584246233802</p>
        </div>
        
        <div className={styles.footerSection}>
          <h3>Redes Sociales</h3>
          <div className={styles.socialLinks}>
            <a href="https://github.com/ErickMDR" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              GitHub
            </a>
            <a href="https://www.instagram.com/erimdr?igsh=Nmw0d24ybDRycmJv" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              Instagram
            </a>
            <a href="https://x.com/Erikuz22?s=09" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              X/Twitter
            </a>
          </div>
        </div>
        
        <div className={styles.footerSection}>
          <h3>Enlaces Rápidos</h3>
          <div className={styles.quickLinks}>
            <a href="/" className={styles.quickLink}>Inicio</a>
            <a href="/projects" className={styles.quickLink}>Proyectos</a>
            <a href="/about" className={styles.quickLink}>Sobre Mí</a>
          </div>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Erick Díaz. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;