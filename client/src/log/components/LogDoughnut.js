import React from 'react';
import PropTypes from 'prop-types';
import { Label, PieChart, Pie, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { withTheme } from 'styled-components';

const LogDoughnutContainer = styled.div`
  height: 44px;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    height: 64px;
  }
`;

/**
 * Render daily logs as doughnut graph
 */
const LogDoughnut = (props) => {
  const { log, theme, innerFillColor = 'none' } = props;
  const { veg_count, fruit_count, protein_count, grain_count } = log;

  const innerRadius = '87%';

  //get log data
  const data = [
    { name: 'Vegetables', value: veg_count, fill: `${theme.colors.green}` },
    { name: 'Fruits', value: fruit_count, fill: `${theme.colors.pink}` },
    { name: 'Protein', value: protein_count, fill: `${theme.colors.darkBlue}` },
    { name: 'Grains', value: grain_count, fill: `${theme.colors.yellow}` },
  ];

  const total_count = veg_count + fruit_count + protein_count + grain_count;

  const data01 = [{ name: 'test', value: 100 }];

  //don't return a log doughnut if there are no values
  if (total_count === 0) return <span>{props.children}</span>;

  return (
    <LogDoughnutContainer>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data01}
            dataKey="value"
            isAnimationActive={false}
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={innerRadius}
            fill={innerFillColor}
            stroke="none"
          />
          <Pie
            data={data}
            dataKey="value"
            isAnimationActive={false}
            innerRadius={innerRadius}
            outerRadius="100%"
            stroke="none"
          >
            <Label
              fill={`${theme.colors.darkBrown}`}
              position="center"
              width={30}
            >
              {`${props.children}`}
            </Label>
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </LogDoughnutContainer>
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
