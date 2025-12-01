import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import projectsData from '../../data/projects.json';
import styles from './Charts.module.css';

const CustomTooltip = ({ active, payload, total }) => {
  if (active && payload && payload.length && total > 0) {
    const percentage = ((payload[0].value / total) * 100).toFixed(1);
    return (
      <div className={styles.customTooltip}>
        <p>{`${payload[0].name}`}</p>
        <p>{`${payload[0].value} proyectos (${percentage}%)`}</p>
      </div>
    );
  }
  return null;
};

const CategoryPieChart = () => {
  const { categoryData, total } = useMemo(() => {
    const categoryCount = {};
    
    projectsData.forEach(project => {
      categoryCount[project.category] = (categoryCount[project.category] || 0) + 1;
    });

    const categoryArray = Object.entries(categoryCount)
      .map(([name, value]) => ({ name, value }));

    const totalProjects = categoryArray.reduce((sum, item) => sum + item.value, 0);

    return { categoryData: categoryArray, total: totalProjects };
  }, []);

  const CATEGORY_COLORS = [
    '#60A679', '#1f4c1f', '#4CAF50', '#67d46dff', 
    '#27842aff', '#355f37ff', '#18d227ff', '#8ebb5aff'
  ];

  return (
    <div className={styles.chartContainer}>
      <h3>Distribución por Categorías</h3>
      {categoryData.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip total={total} />} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className={styles.noData}>No hay datos disponibles</p>
      )}
    </div>
  );
};

export default CategoryPieChart;