import React from 'react';
import axios from 'axios';
import domains from './../services/domains';
import m from './../services/m';
import Loading from './../Shared/Loading';
import PersonBlock from './../Shared/PersonBlock';
import InfiniteScroll from 'react-infinite-scroll-component';

const styles = {
  overflowY: "hidden",
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px 0",
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
      },
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData(val = false) {
    this.setState({isLoading: true});
    const pagination = val ? {offset: 0, limit: 10,} : this.state.pagination;
    axios.get(`${domains.domain}users/discover?offset=${pagination.offset}&limit=${pagination.limit}`).then((result) => {
      let newData = result.data;
      let users = m.saveList(result.data.data);
      this.setState(prevState => {
        let {pagination} = prevState;
        pagination.offset += pagination.limit;
        pagination.total = newData.total;
        return {isLoading: false, pagination, data: users};
      });
    });
  }

  loadMore() {
    this.setState((prevState) => ({
      offset: prevState.offset + prevState.limit,
    }), this.getAllData);
  }

  render() {
    const {data, pagination} = this.state;
    return (
      !!data && data.length > 0 ?
        <div className="list">
          <InfiniteScroll
            style={styles}
            next={() => this.loadMore()}
            hasMore={data.length < pagination.total}
            loader={<div style={{...styles, position: 'relative'}}><Loading/></div>}
            endMessage={
              <p style={{textAlign: 'center'}}>
                <b>Yay! You have seen it all</b>
              </p>
            }>
            {data.map((item, i) => (
              <PersonBlock item={item} key={`key${i}`} />
            ))}
          </InfiniteScroll></div> : <div style={{...styles, position: 'relative'}}><Loading/></div>
    );
  }
}

export default ListPage;
