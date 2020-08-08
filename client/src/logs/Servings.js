import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Checkbox from './Checkbox';
import { ServingsContainer } from './logStyles';
import * as logActions from './logRedux';

const mapStateToProps = (state) => ({
  currentLog: state.log.currentLog,
});

/**
 * Renders the user's goals and the number of completed servings for the current
 * day.
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
    //update checkbox state
    const itemName = event.target.name;
    const isChecked = event.target.checked;

    this.setState((prevState) => ({
      checkedItems: prevState.checkedItems.set(itemName, isChecked),
    }));

    //update item count on backend
    let newCount;

    //increment completed count
    if (isChecked) {
      newCount = this.props.completed + 1;
    }
    //decrement completed count
    else {
      newCount = this.props.completed - 1;
    }

    this.props.updateLog(
      this.props.currentLog.log_date,
      this.props.field,
      newCount
    );
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
    return <ServingsContainer>{this.renderCheckboxes()}</ServingsContainer>;
  }
}

Servings.propTypes = {
  completed: PropTypes.number.isRequired,
  field: PropTypes.oneOf([
    'veg_count',
    'fruit_count',
    'protein_count',
    'grain_count',
  ]),
  goals: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, logActions)(Servings);
