import React from 'react';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'shared/Box';
import { LogContainer, DateContainer, ServingsLabel } from './logStyles';
import LogErrMsg from './LogErrMsg';
import Servings from './Servings';
import * as logActions from './logRedux';

const LogBox = styled(Box)`
  left: 50%;
  max-height: 340px;
  top: 17%;
  transform: translate(-50%, 17%);
  width: 340px;

  @media (min-width: ${(props) => props.theme.breakpoints.small}) {
    width: 400px;
  }
`;

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
    const { currentUser, currentLog } = this.props;

    //404 err: handle by waiting for log to be fetched or created
    if (!currentLog) {
      return <div />;
    }

    //Any other non-404 err
    if (this.props.errors) {
      return (
        <div>
          <LogErrMsg />
        </div>
      );
    }

    return (
      <LogBox>
        <DateContainer>{dateFormat(this.today, 'd mmmm yyyy')}</DateContainer>
        <LogContainer>
          <ServingsLabel>Vegetables</ServingsLabel>
          <Servings
            field="veg_count"
            goals={currentUser.vegetable_goals}
            completed={currentLog.veg_count}
          />
          <ServingsLabel>Fruits</ServingsLabel>
          <Servings
            field="fruit_count"
            goals={currentUser.fruit_goals}
            completed={currentLog.fruit_count}
          />
          <ServingsLabel>Protein</ServingsLabel>
          <Servings
            field="protein_count"
            goals={currentUser.protein_goals}
            completed={currentLog.protein_count}
          />
          <ServingsLabel>Grains</ServingsLabel>
          <Servings
            field="grain_count"
            goals={currentUser.grain_goals}
            completed={currentLog.grain_count}
          />
        </LogContainer>
      </LogBox>
    );
  }
}

Log.propTypes = {
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

export default connect(mapStateToProps, logActions)(Log);
