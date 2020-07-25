import React from 'react';
import styled from 'styled-components';

import Checkbox from './Checkbox';

const ServingsContainer = styled.div``;

class Servings extends React.Component {
  handleChange = (event) => {
    console.log(event.target.checked);
  };

  render() {
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

    return <ServingsContainer>{boxes}</ServingsContainer>;
  }
}

export default Servings;
