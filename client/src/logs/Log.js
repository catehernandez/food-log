import React from 'react';
import { connect } from 'react-redux';

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
    return <div>Log</div>;
  }
}

export default connect(mapStateToProps, logActions)(Log);
