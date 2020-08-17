import React from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { withTheme } from 'styled-components';

/**
 * Render daily logs as doughnut graph.
 */
const LogDoughnut = (props) => {
  const { log, theme } = props;
  const { veg_count, fruit_count, protein_count, grain_count } = log;

  const data = [
    { name: 'Vegetables', value: veg_count, fill: `${theme.colors.green}` },
    { name: 'Fruits', value: fruit_count, fill: `${theme.colors.pink}` },
    { name: 'Protein', value: protein_count, fill: `${theme.colors.darkBlue}` },
    { name: 'Grains', value: grain_count, fill: `${theme.colors.yellow}` },
  ];

  return (
    <ResponsiveContainer>
      <PieChart width={56} height={56}>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={24}
          isAnimationActive={false}
          outerRadius={28}
          stroke="none"
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

LogDoughnut.propTypes = {
  /** A log object */
  log: PropTypes.shape({
    veg_count: PropTypes.number.isRequired,
    fruit_count: PropTypes.number.isRequired,
    protein_count: PropTypes.number.isRequired,
    grain_count: PropTypes.number.isRequired,
  }),
};

export default withTheme(LogDoughnut);
