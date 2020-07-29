import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as logActions from './logRedux';

import Checkbox from './Checkbox';

const ServingsContainer = styled.div``;

const mapStateToProps = (state) => ({
  currentLog: state.log.currentLog,
});

class Servings extends React.Component {
  constructor(props) {
    super(props);

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

    for (let i = 0; i < this.props.goals; i++) {
      let name = i.toString();
      let isChecked = this.state.checkedItems.get(name);

      if (i === this.props.completed || i === this.props.completed - 1) {
        boxes.push(
          <Checkbox
            key={name}
            className={this.props.field}
            name={name}
            checked={isChecked}
            onChange={this.handleChange}
          />
        );
      }
      //all other checkboxes are readOnly
      else {
        boxes.push(
          <Checkbox
            key={name}
            className={this.props.field}
            name={name}
            checked={isChecked}
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

export default connect(mapStateToProps, logActions)(Servings);
