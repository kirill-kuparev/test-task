import React from 'react'
import {withRouter} from 'react-router-dom'
import m from './../services/m';
import queryString from 'query-string';


class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    let queryParams = queryString.parse(this.props.location.search ||"");
    let user = m.isUniq(queryParams._id) || false;
    this.setState({user})
  }

  render() {
    const {user} = this.state;
    const {history} = this.props;
    return <div>
      <div className="navbar">
        <div className="navbar-inner">
          <div>
            {!!user._id && <span onClick={() => history.goBack()}><i className="fa fa-chevron-left left-i" aria-hidden="true" /></span>}
            <span>{!!user._id ? user.display_name : 'ALUA'}</span>
          </div>
        </div>
      </div>
    </div>
  }
}

export default withRouter(Header)
