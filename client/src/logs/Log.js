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

  /**
   * Async helper function to get log for today. If none exists,
   * create one.
   *
   * @param {Date() Object} date
   */
  fetchOrCreateLog = async (date) => {
    const ISODate = date.toISOString();

    await this.props.getLog(ISODate);

    //If log not found
    if (this.props.errors === 404) {
      this.props.createLog(ISODate);
    }
  };

  componentDidMount() {
    this.fetchOrCreateLog(this.today);
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
