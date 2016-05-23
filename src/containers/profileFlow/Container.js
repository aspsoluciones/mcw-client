/**
 * Created by epotignano on 10/03/16.
 */

import React, {Component, PropTypes, Stylesheet} from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FileInput from "react-file-input";
import { MenuItem } from 'material-ui'

import { updateUser } from '../../actions/UserActions';

import Formsy from 'formsy-react';
import { FormsySelect, FormsyText, FormsyDate }  from 'formsy-material-ui';

class ProfileCompletionFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      dimmerActive: true,
      canSubmit: false
    }
  }

    enableButton () {
      this.setState({
        canSubmit: true
      });
    }

    disableButton () {
      this.setState({
        canSubmit: false
      });
    }

    closeDimmer () {
      this.setState({
        dimmerActive: false
      })
    }

  render() {
    let _dimmerClass = (this.state.dimmerActive) ? 'ui page  container active dimmer userflow': 'ui page dimmer userflow';
    const { dispatch } = this.props;
    return(
      <div>
        <div className={_dimmerClass}>
          <div className="content ui segment inverted">
            <div className="ui one column grid">
              <div className="form ui segment column six wide form-holder" style={{overflowY: 'auto'}}>
                  <Formsy.Form
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    onValidSubmit={(model) => {
                      dispatch(updateUser(model))
                    }}
                  >
                    <div className="row　ui">
                      <div className="one column ui section">
                        <div className="field center aligned grid">
                          <img className="ui small circular image"
                               src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y" />
                        </div>
                        <FormsyText
                          name='username'

                          validations='isWords'
                          required
                          hintText="ユーサー名"
                          value=""
                          floatingLabelText="ユーサー名"
                        />
                        <FormsySelect
                          name='genre'
                          required
                          floatingLabelText="性別">
                          <MenuItem value={'male'} primaryText="男" />
                          <MenuItem value={'female'} primaryText="女" />
                        </FormsySelect>

                        <FormsyDate
                          name='birthDate'
                          required
                          floatingLabelText='生年月日'
                          style={{'width': '12em'}}
                        />
                      </div>


                      <div className="ui row">
                        <div className="ui two column grid">
                          <div className="ui column">
                            <button className="ui inverted blue button" onClick={() => {
                          this.closeDimmer();
                        }}>
                              後で
                            </button>
                          </div>
                          <div className="ui column">
                            <button type='submit' className="ui inverted green button">
                              保存
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </Formsy.Form>

                </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}


function mapStateProps(state) {
  return state;
}

ProfileCompletionFlow.propTypes = {
  userData: PropTypes.object,
  active: PropTypes.bool
};

export default connect(mapStateProps)(ProfileCompletionFlow);

