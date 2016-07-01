import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { default as NavBar } from "../components/NavBar";
import Footer from '../components/Footer';
import SessionTracker from '../components/SessionTracker';
import { changeLanguage } from '../actions/UserActions';
import { UserLanguage } from '../constants/Commons';

var language = localStorage.getItem(UserLanguage);

class App extends React.Component{
  componentDidMount() {
    const { store } = this.context;
    const { dispatch } = this.props;
    
    dispatch(changeLanguage(language));
    store.subscribe(() =>{})
  }
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

App.contextTypes = {
  store: PropTypes.any
};
App.propTypes = {
  dispatch: PropTypes.func.isRequired
};
function mapStateProps(state) {
  return state;
}
export default connect(mapStateProps)(App);
