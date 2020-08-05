import React from 'react';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';
import styled from 'styled-components';

import * as logActions from './logRedux';

import Box from 'shared/Box';
import { LogContainer, DateContainer, ServingsLabel } from './logStyles';
import LogErrMsg from './LogErrMsg';
import Servings from './Servings';

const LogBox = styled(Box)`
  left: 50%;
  max-height: 340px;
  top: 17%;
  transform: translate(-50%, 17%);
  width: 340px;
  z-index: -1; /* Ensure rendered behind user profile popout */

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
    if (!this.props.currentLog) {
      return <div />;
    }

    if (this.props.errors) {
      console.log('err: ', this.props.errors);
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
            goals={this.props.currentUser.vegetable_goals}
            completed={this.props.currentLog.veg_count}
          />
          <ServingsLabel>Fruits</ServingsLabel>
          <Servings
            field="fruit_count"
            goals={this.props.currentUser.fruit_goals}
            completed={this.props.currentLog.fruit_count}
          />
          <ServingsLabel>Protein</ServingsLabel>
          <Servings
            field="protein_count"
            goals={this.props.currentUser.protein_goals}
            completed={this.props.currentLog.protein_count}
          />
          <ServingsLabel>Grains</ServingsLabel>
          <Servings
            field="grain_count"
            goals={this.props.currentUser.grain_goals}
            completed={this.props.currentLog.grain_count}
          />
        </LogContainer>
      </LogBox>
    );
  }
}

export default connect(mapStateToProps, logActions)(Log);
