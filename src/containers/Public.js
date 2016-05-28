import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { default as NavBar } from "../components/NavBar";
import Footer from '../components/Footer';
import SessionTracker from '../components/SessionTracker';

class App extends React.Component{
  componentDidMount() {}
  render() {
    return (
      <div>
        <NavBar/>
        <main style={{marginTop:40}}>
            {this.props.children}
        </main>
        <Footer/>
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
