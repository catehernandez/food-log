import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';

import Log from './Log';
import LogErrMsg from '../LogErrMsg';
import Servings from './Servings';
import * as logActions from '../logRedux';

/** All styled components are defined in logs/logStyles */

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  currentLog: state.log.currentLog,
  errors: state.log.errors,
  loading: state.log.loading,
});

/**
 * Renders Log for the current day in the user's timezone. If no log yet exists
 * for the current day, create a new entry.
 */
class CurrentLog extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * Async helper function to get log for today. If none exists,
   * create one.
   *
   */
  getCurrentLog = async () => {
    const today = moment().format('YYYY-MM-DD');

    await this.props.getLog(today);

    //If log not found
    if (this.props.errors === 404) {
      this.props.createLog(today);
    }
  };

  componentDidMount() {
    this.getCurrentLog();
  }

  render() {
    const { currentUser, currentLog } = this.props;

    //404 err: handle by waiting for log to be fetched or created
    if (!currentLog) {
      return <div />;
    }

    //Any other non-404 err
    if (this.props.errors) {
      return <LogErrMsg />;
    }

    return (
      <Log date={moment().format('D MMMM YYYY')}>
        <Servings
          foodGroup="vegetables"
          field="veg_count"
          goals={currentUser.vegetable_goals}
          completed={currentLog.veg_count}
        />

        <Servings
          foodGroup="fruits"
          field="fruit_count"
          goals={currentUser.fruit_goals}
          completed={currentLog.fruit_count}
        />

        <Servings
          foodGroup="protein"
          field="protein_count"
          goals={currentUser.protein_goals}
          completed={currentLog.protein_count}
        />

        <Servings
          foodGroup="grains"
          field="grain_count"
          goals={currentUser.grain_goals}
          completed={currentLog.grain_count}
        />
      </Log>
    );
  }
}

CurrentLog.propTypes = {
  /** Function called if no log found for current day. */
  createLog: PropTypes.func.isRequired,
  /** Object stored in Redux state. */
  currentUser: PropTypes.shape({
    vegetable_goals: PropTypes.number.isRequired,
    fruit_goals: PropTypes.number.isRequired,
    protein_goals: PropTypes.number.isRequired,
    grain_goals: PropTypes.number.isRequired,
  }),
  /** Object stored in Redux state. */
  currentLog: PropTypes.shape({
    veg_count: PropTypes.number.isRequired,
    fruit_count: PropTypes.number.isRequired,
    protein_count: PropTypes.number.isRequired,
    grain_count: PropTypes.number.isRequired,
  }),
  errors: PropTypes.number,
  /**
   * Function called to set currentLog in redux state if current value is null
   * or undefined.
   */
  getLog: PropTypes.func.isRequired,
  /** Boolean to determine when loading screen is displayed. */
  loading: PropTypes.bool,
};

export default connect(mapStateToProps, logActions)(CurrentLog);
