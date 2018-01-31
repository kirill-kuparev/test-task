import React from 'react'
import user from './../services/user'
import {Link, withRouter} from 'react-router-dom'

class Navbar extends React.Component {

  is_active(tab) {
    return this.props.location.pathname.indexOf(tab.url) > -1
  }

  render() {
    const navs = [
      {
        url: 'upload',
        icon: 'fa-upload',
        name: 'Upload'
      },
      {
        url: 'files',
        icon: 'fa-data-o',
        name: 'Files'
      },
      {
        url: 'phone',
        icon: 'fa-phone',
        name: 'Phone Verify'
      }
      ];

    let _this = this;

    return <div>
      <div className="page-sidebar sidebar">
        <div className="page-sidebar-inner slimscroll">
          <div className="sidebar-header">
            <div className="sidebar-profile">
              <Link to="/app/me" id="profile-menu-link">
                <div className="sidebar-profile-image">
                  <img width="60" alt="Main logo" height="60" src="/images/profile.png?v=1502533029632"/>
                </div>
                <div className="sidebar-profile-details"><span className="ng-binding">{user.get_public_name()}
                <div></div><small
                    className="ng-binding">Moderator</small></span></div>
              </Link></div>
          </div>
          <ul className="menu accordion-menu">
            { navs.map(function (tab, index) {
              return <li key={'tab-' + index} className={(_this.is_active(tab) ? 'active' : '')}>
                <Link to={tab.url} className="waves-effect waves-button">
                  <span className={"menu-icon fa " + tab.icon}></span>
                  <p>{tab.name}</p></Link>
              </li>
            })
            }
          </ul>
        </div>
      </div>
    </div>
  }
}

export default withRouter(Navbar)
