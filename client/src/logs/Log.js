import React from 'react';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';

import * as logActions from './logRedux';

const mapStateToProps = (state) => ({
  currentLog: state.log.currentLog,
  errors: state.log.errors,
  loading: state.log.loading,
});

class Log extends React.Component {
  constructor(props) {
    super(props);
    this.today = new Date();
  }
  componentDidMount() {
    this.props.getLog(this.today.toISOString());
  }

  componentDidUpdate() {
    if (this.props.errors === 404) {
      this.props.createLog(this.today);
    }
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
