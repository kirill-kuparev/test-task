import React from 'react'
import {Link, withRouter} from 'react-router-dom'
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
    console.log(this.props);
    return <div>
      <div className="navbar">
        <div className="navbar-inner">
          {!!user._id && <i className="fa fa-chevron-left" aria-hidden="true" onClick={() => history.goBack()} />}
          <div>
            <span>{!!user._id ? user.display_name : 'ALUA'}</span>
          </div>
        </div>
      </div>
    </div>
  }
}

export default withRouter(Header)
