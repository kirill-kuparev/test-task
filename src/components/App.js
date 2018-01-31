import React from 'react'
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import ListPage from './pages/ListPage'
import PersonPage from './pages/PersonPage'
import Header from './Shared/Header';


class App extends React.Component {

  constructor(props) {
    super(props);
    window.onresize = this.setHeight;
    window.hist = this.props.history;
  }


  componentDidUpdate() {
    this.setHeight()
  }

  componentDidMount() {
    this.setHeight()
  }

  setHeight() {
    let el = document.querySelector('.page-inner');
    let el2 = document.querySelector('.page-sidebar');
    let input = document.querySelector('.page-inner input');
    el && (el.style.minHeight = Math.max(window.innerHeight, el2 ? el2.clientHeight : 0) + 'px');
    input && input.focus && input.focus();
  }

  render() {
    return <div id="for_main_content">
      <div>
        <Header />
        <div className="page-inner">
          <Switch>
             <Route path='/list' component={ListPage}/>
             <Route path='/page' component={PersonPage}/>
             <Redirect to="/list"/>
          </Switch>
        </div>
      </div>
    </div>
  }

}

export default withRouter(App)
