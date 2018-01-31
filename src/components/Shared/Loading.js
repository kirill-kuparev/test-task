import React from 'react'

class Loading extends React.Component {

  getclass () {
    let cl = "loading-stats-h2 " + (this.props.class || "")
    return cl
  }

  render() {
    return <div className={this.getclass()}>
      <i className="fa fa-spinner fa-spin mr-10" />
      <div className="ml-10 ib">
        Loading ...
      </div>
    </div>
  }

}


export default Loading
