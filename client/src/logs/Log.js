import React from 'react';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';

import * as logActions from './logRedux';

const mapStateToProps = (state) => {
  console.log(state);
  return state;
};

class Log extends React.Component {
  componentDidMount() {
    const today = new Date().toISOString();
    this.props.getLog(today);
  }

  render() {
    return (
      <div>
        <div>{dateFormat(this.today, 'd mmmm yyyy')}</div>
        <div>Log</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, logActions)(Log);
