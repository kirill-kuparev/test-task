import React from 'react';
import Loading from './Loading';
import axios from 'axios';
import domains from './../services/domains';
import notify from './../services/notify';

class PhonesTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDisable: false
    };
  }

  sendSms() {
    this.setState({isDisable: true});
    axios.get(`${domains.domain}/api/v1/send_sms?file_id=${this.props.id}`)
      .then(() => {
        this.props.updateFile();
        this.setState({isDisable: false});
      })
      .catch((err)=> {
      console.log(err);
        this.setState({isDisable: false});
        notify.error('Error! Something went wrong');
      })
  }

  updatePhone() {
    this.setState({isDisable: true});
    axios.get(`${domains.domain}/api/v1/get_file?file_id=${this.props.id}`)
      .then((result) => {
        console.log(this.props)
        this.props.updateFile(result.data.leads);
        this.setState({isDisable: false});
      })
      .catch(()=> {
        this.setState({isDisable: false});
        notify.error('Error! Something went wrong');
      });
  }

  render() {
    const {isLoading, phones, isSend} = this.props;
    const {isDisable} = this.state;
    return <div>
      {isSend ? <button onClick={() => this.updatePhone()} className="btn btn-primary"
                      disabled={isDisable}>Synchronize sms status</button>
        : <button onClick={() => this.sendSms()} className="btn btn-primary"
                  disabled={!phones.length || isDisable}>Send all Sms</button>}
      <table className="table table-bordered table-striped">
      <thead>
      <tr>
        <th>#</th>
        <th>Phone</th>
        <th>Response</th>
        <th>Status</th>
      </tr>
      </thead>
      <tbody>
      {!!phones.length && phones.map((item, itr) => {
        return (<tr key={itr}>
          <td>{itr + 1}</td>
          <td>{item.phone}</td>
          <td>{item.response || '-'}</td>
          <td>
            <div
              className={`btn btn-xs loan-status ${item.status === 'confirmed' ? 'btn-success' : item.status === 'sent' ? 'btn-warning' : item.status === 'error' ? 'btn-danger' : 'btn-info'}`}>
              <b>{item.status || '-'}</b>
            </div>
          </td>
        </tr>);
      })}
      {!phones.length && <tr>
        <td colSpan="100%" className={`text-center nothing-found`}>
          {isLoading && <Loading />}
          {!isLoading && <span>Nothing Found ...</span>}
        </td>
      </tr>}
      </tbody>
    </table>
    </div>
  }
}

export default PhonesTable;
