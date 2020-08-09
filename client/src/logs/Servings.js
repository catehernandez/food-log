import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Checkbox from './Checkbox';
import * as logActions from './logRedux';

//Exported for managing layout in logStyles
export const ServingsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, fit-content(1.5rem));
  grid-template-rows: repeat(2, auto);
  grid-row-gap: 0.5rem;
`;

export const ServingsLabel = styled.span`
  text-align: right;
  text-transform: capitalize;
`;

/**
 * Renders the user's goals as compared to the number of completed servings for
 * the current day.
 */
class Servings extends React.Component {
  constructor(props) {
    super(props);

    //Colors for rendered checkboxes. Colors defined in theme.js
    this.servingStyles = {
      veg_count: 'green',
      fruit_count: 'pink',
      protein_count: 'darkBlue',
      grain_count: 'yellow',
    };

    this.state = {
      checkedItems: this.defineCheckedItems(this.props.completed),
    };
  }

  //handles intial rendering--subsequent renderings handled by state
  defineCheckedItems = (completed) => {
    let checkedItems = new Map();

    for (let i = 0; i < this.props.goals; i++) {
      let itemName = i.toString();

      if (i < completed) {
        checkedItems.set(itemName, true);
      }
      //not yet completed
      else {
        checkedItems.set(itemName, false);
      }
    }

    return checkedItems;
  };

  handleChange = (event) => {
    const itemName = event.target.name;
    const isChecked = event.target.checked;
    const { field } = this.props;

    //update checkbox state
    this.setState((prevState) => ({
      checkedItems: prevState.checkedItems.set(itemName, isChecked),
    }));

    //update item count on backend
    let newCount;

    if (isChecked) {
      newCount = this.props.completed + 1;
    }
    //decrement completed count
    else {
      newCount = this.props.completed - 1;
    }

    this.props.updateCurrentLog(field, newCount);
  };

  renderCheckboxes() {
    const boxes = [];
    const { field } = this.props;
    const checkboxColor = this.servingStyles[field];

    for (let i = 0; i < this.props.goals; i++) {
      let name = i.toString();
      let isChecked = this.state.checkedItems.get(name);

      if (i === this.props.completed || i === this.props.completed - 1) {
        boxes.push(
          <Checkbox
            checked={isChecked}
            color={checkboxColor}
            key={name}
            name={name}
            onChange={this.handleChange}
          />
        );
      }
      //all other checkboxes are readOnly
      else {
        boxes.push(
          <Checkbox
            checked={isChecked}
            color={checkboxColor}
            key={name}
            name={name}
            readOnly={true}
          />
        );
      }
    }

    return boxes;
  }

  render() {
    if (this.props.goals === 0) return '';

    return (
      <React.Fragment>
        <ServingsLabel>{this.props.foodGroup}</ServingsLabel>
        <ServingsContainer>{this.renderCheckboxes()}</ServingsContainer>
      </React.Fragment>
    );
  }
}

Servings.propTypes = {
  /** Determines the initial number of checked checkboxes. */
  completed: PropTypes.number.isRequired,
  /**
   * A name corresponding to a column of the currentLog in the database.
   * This name will be used to reference the updated value when
   * updateCurrentLog makes a call to the database.
   */
  field: PropTypes.oneOf([
    'veg_count',
    'fruit_count',
    'protein_count',
    'grain_count',
  ]),
  /** The label for the Servings group */
  foodGroup: PropTypes.string.isRequired,
  /** Determines the total number of checkboxes rendered within the Serving. */
  goals: PropTypes.number.isRequired,
  /**
   * Called when any checkboxes within the Servings component are clicked.
   *
   * Updates Redux state and makes call to the database to store the changes.
   */
  updateCurrentLog: PropTypes.func.isRequired,
};

export default connect(null, logActions)(Servings);
