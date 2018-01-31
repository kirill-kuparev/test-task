import React from 'react'
import queryString from 'query-string';
import m from './../services/m'
import Slider from 'react-image-slider';
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
      <Carousel>
        {images.map((image, key) => <div key={key}><img src={image} /></div>)}
      </Carousel>
    );
  }

  render() {
    const {user} = this.state;
    console.log(user)
    return (<div className="container page">
        {!!user._id ? <div>
          <div style={{position: 'relative'}}>
            {this.renderSlider()}
          </div>
          <hr />
          <div className="user-info">
            <div>Bio: {user.bio}</div>
            <div>Location: {user.city && `${user.city}, `} {user.country}</div>
            <div>{(user.is_online && 'Online') || moment(user.last_online).fromNow()}</div>
            {user.id_verified && <div>Verified</div>}
            <div><a href={user.ig_url}>Instagram</a> ({user.ig_followers} followers)</div>
          </div>
        </div> : <div>
          404 Profile is not found
        </div> }
      </div>
    );
  }
}

export default PersonPage;
