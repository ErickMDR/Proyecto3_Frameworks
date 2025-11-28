import React, { useState } from 'react';
import styles from './Accordion.module.css';

const Accordion = ({ title, children, isOpen = false }) => {
  const [open, setOpen] = useState(isOpen);

  const toggleAccordion = () => {
    setOpen(!open);
  };

  return (
    <div className={`${styles.accordion} ${open ? styles.open : ''}`}>
      <div className={styles.accordionHeader} onClick={toggleAccordion}>
        <h3 className={styles.accordionTitle}>{title}</h3>
        <span className={styles.accordionIcon}>
          {open ? '−' : '+'}
        </span>
      </div>
      
      <div className={`${styles.accordionContent} ${open ? styles.show : ''}`}>
        <div className={styles.accordionBody}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;