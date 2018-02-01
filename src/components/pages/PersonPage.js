import React from 'react'
import queryString from 'query-string';
import m from './../services/m'
import moment from 'moment';
import { Carousel } from 'react-responsive-carousel';



class PersonPage extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    let queryParams = queryString.parse(this.props.location.search ||"");
    let user = m.isUniq(queryParams._id) || {};
    this.setState({user})
  }

  getPhotos() {
    let {user} = this.state;

    let photos = user.featured.map(item => {
      return item.st;
    });
    return photos;
  }

  renderSlider() {
    let images = this.getPhotos();
    return (
      <Carousel dynamicHeight showStatus={false} showThumbs={false} infiniteLoop={true} emulateTouch={true} showArrows={false}>
        {images.map((image, key) => <div key={key}><img src={image} /></div>)}
      </Carousel>
    );
  }

  render() {
    const {user} = this.state;
    return (<div className="container page">
        {!!user._id ? <div>
          <div style={{position: 'relative'}}>
            {this.renderSlider()}
          </div>
          <div className="user-info">
            <div className="row-block">
              <div className="country-block">{user.city && `${user.city}, `} {user.country}</div>
              <div className="right-block">
                <div>{user.credit_rate}</div>
                <div>
                  <span>CREDITS</span>
                  <br/>
                  <span style={{color: '#4E5E6A', fontSize: '11px'}}>/ {user.chars_per_msg} chars</span>
                </div>
              </div>
            </div>
            <div>{user.is_online ? <span className="on-line">Online</span> : <span>{moment(user.last_online).fromNow()}</span>}</div>
            <div className="mt-10">{user.bio}</div>
            <div className="instagram-block">
              <i className="fab fa-instagram instagram-icon" />
              <div>
                <span><strong>Instagram Verified</strong></span>
                <br />
                <span><a href={user.ig_url}>@{m.getInstagramNick(user.ig_url || "")}</a> ({user.ig_followers} followers)</span>
              </div>
            </div>
          </div>
        </div> : <div>
          404 Profile is not found
        </div> }
      </div>
    );
  }
}

export default PersonPage;
