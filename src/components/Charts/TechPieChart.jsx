import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import projectsData from '../../data/projects.json';
import styles from './Charts.module.css';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltip}>
        <p>{`${payload[0].name}: ${payload[0].value} proyectos`}</p>
      </div>
    );
  }
  return null;
};

const TechPieChart = () => {
  const techData = useMemo(() => {
    const techCount = {};
    
    projectsData.forEach(project => {
      project.technologies.forEach(tech => {
        techCount[tech] = (techCount[tech] || 0) + 1;
      });
    });

    return Object.entries(techCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, []);

  const COLORS = [
    '#60A679', '#4CAF50', '#81C784', '#67d46dff', 
    '#27842aff', '#355f37ff', '#18d227ff', '#8ebb5aff'
  ];

  return (
    <div className={styles.chartContainer}>
      <h3>Tecnologías Utilizadas</h3>
      {techData.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={techData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {techData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className={styles.noData}>No hay datos disponibles</p>
      )}
    </div>
  );
};

export default TechPieChart;