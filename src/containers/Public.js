/**
 * Created by epotignano on 12/4/16.
 */
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { default as NavBar } from "../components/NavBar";
import SessionTracker from '../components/SessionTracker';

class App extends React.Component{
  componentDidMount() {}
  render() {
    return (
      <div>
        <NavBar/>
        <main className="ui page grid ">
          <div className="ui container">
            {this.props.children}
          </div>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};
function mapStateProps(state) {
  return state;
}
export default connect(mapStateProps)(App);
