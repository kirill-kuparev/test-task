import React from 'react'
import axios from 'axios';
import domains from './../services/domains';
import m from './../services/m';
import Loading from './../Shared/Loading';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';

const styles = {
  maxWidth: '600px',
  margin: "0 auto"
};

class ListPage extends React.Component {

  constructor() {
    super();
    let data = m.saveList([]);
    this.state = {
      data,
      isLoading: true,
      pagination: {
        offset: 0,
        limit: 10,
        total: 0,
      }
    }
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData(val = false) {
    this.setState({isLoading: true});
    const pagination = val ? { offset: 0, limit: 10,} : this.state.pagination;
    axios.get(`${domains.domain}users/discover?offset=${pagination.offset}&limit=${pagination.limit}`)
      .then((result) => {
        let newData = result.data;
        let users = m.saveList(result.data.data);
        this.setState(prevState => {
          let {data, pagination} = prevState;
          pagination.offset += pagination.limit;
          pagination.total = newData.total;
          return {isLoading: false, pagination, data: users}
        });
      });
  }

  loadMore() {
    this.setState((prevState) => ({
      offset: prevState.offset + prevState.limit
    }), this.getAllData);
  }

  render() {
    const { data, pagination } = this.state;
    return (
      !!data && data.length > 0 ?
      <InfiniteScroll
        style={styles}
        pullDownToRefresh
        pullDownToRefreshContent={
          <h3 style={{textAlign: 'center'}}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{textAlign: 'center'}}>&#8593; Release to refresh</h3>
        }
        refreshFunction={() => this.getAllData(true)}
        next={() => this.loadMore()}
        hasMore={data.length < pagination.total }
        loader={<div style={{...styles, position: 'relative'}}><Loading /></div>}
        endMessage={
          <p style={{textAlign: 'center'}}>
            <b>Yay! You have seen it all</b>
          </p>
        }>
        {data.map((item, i) => (
          <a className="person" key={`key1${i}`} href={`/page?_id=${item._id}`}>
            <img className="img" src={item.avatar.st} />
            <div className="absolute-block">
              <div className="center-block">
                <span>{item.display_name}</span>
                <br />
                <span>{item.title}</span>
              </div>
              <div className="bottom-block">
                <span>{item.city || item.country}</span>
                <span>{(item.is_online && 'Online') || moment(item.last_online).fromNow()}</span>
              </div>
            </div>
          </a>
        ))}
      </InfiniteScroll> : <div style={{...styles, position: 'relative'}}><Loading /></div>
    );
  }
}

export default ListPage;
