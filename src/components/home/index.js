import React from 'react';
import './home.css';

import PropTypes from 'prop-types'

import { connect } from 'react-redux';
import { fetchData } from './routines'; // import our routine

class Home extends React.Component {

  static mapStateToProps = (state) => {
    return {
        data: state.data,
    }; // map some state to component props
  }
  static mapDispatchToProps = {
    fetchData,
  };

  componentDidMount = () => {
    this.props.fetchData();
  };

  onClick() {
    this.props.fetchData(); // dispatching routine trigger action
  }



  render() {
    const dt = this.props.data
    let listItems = []
    if (dt) {
      listItems = dt.hound.map((number) =>
      <li>{number}</li>
    );

    }

    return (
      <div>
        <ul>{listItems}</ul>

        {/* <button onClick={() => this.onClick()}>
          Fetch data from server
        </button> */}
      </div>
    );
  }
}

Home.propTypes = {
  data: PropTypes.array.isRequired,
}

export default connect(Home.mapStateToProps, Home.mapDispatchToProps)(Home);
