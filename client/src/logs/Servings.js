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
  handleChange = (event) => {
    const isChecked = event.target.checked;
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

    console.log('new count', newCount);
  };

  renderCheckboxes() {
    const boxes = [];

    for (let i = 0; i < this.props.goals; i++) {
      let key = i.toString();

      //default checked, enabled
      if (i < this.props.completed - 1) {
        boxes.push(<Checkbox key={key} checked={true} readOnly={true} />);
      }
      //default checked; enabled
      else if (i === this.props.completed - 1) {
        boxes.push(
          <Checkbox
            key={key}
            defaultChecked={true}
            onChange={this.handleChange}
          />
        );
      }
      //default unchecked; enabled
      else if (i === this.props.completed) {
        boxes.push(
          <Checkbox
            key={key}
            defaultChecked={false}
            onChange={this.handleChange}
          />
        );
      }
      //else unchecked & disabled
      else {
        boxes.push(<Checkbox key={key} checked={false} readOnly={true} />);
      }
    }

    return boxes;
  }

  render() {
    return <ServingsContainer>{this.renderCheckboxes()}</ServingsContainer>;
  }
}

export default connect(mapStateToProps, logActions)(Servings);
