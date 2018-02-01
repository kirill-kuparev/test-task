import React from 'react';
import axios from 'axios';
import domains from './../services/domains';
import m from './../services/m';
import Loading from './../Shared/Loading';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';

const styles = {
  overflowY: "hidden",
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px 0",
};

class PersonBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
    }
  }

  componentDidMount() {
    const {item} = this.props;
    var img = new Image();
    img.src = item.avatar.st;
    if(!item.height) {
      img.addEventListener("load", () => {
        let height = img.height;
        console.log(height)
        item.height = height;
        m.updateItem(item);
        this.setState({height});
      }, false);
    }
  }

  render() {
    const {item} = this.props;
    const {height} = this.state;
    return (
      <a className="person" href={`/page?_id=${item._id}`} style={{backgroundImage: `url(${item.avatar.st})`, height: `${item.height || height || 600}px`}}>
        <div className="absolute-block">
          <div className="center-block" style={{marginTop:`${(item.height / 2) - 20 || (height / 2) - 20 || 300}px` }}>
            <span>{item.display_name}</span>
            <br/>
            <span>{item.title}</span>
          </div>
          <div className="bottom-block">
            <span>{item.city || item.country}</span>
            <span>{(item.is_online && 'Online') || moment(item.last_online).fromNow()}</span>
          </div>
        </div>
      </a>
    );
  }
}

export default PersonBlock;
