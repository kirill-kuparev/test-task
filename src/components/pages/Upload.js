import React from 'react'
import notify from './../services/notify'
import axios from 'axios';
import domains from './../services/domains';
import PhonesTable from "../Shared/PhonesTable";

class Upload extends React.Component {
  constructor() {
    super();
    this.state = {
      description: '',
      selectedFile: '',
      phones: [],
      fileId: null,
      isSend: false,
      loading: false,
      isReq: false
    };
  }

  onChange(e) {
    const state = this.state;
    state.selectedFile = e.target.data[0];
    this.setState(state);
    this.onSubmit()
  };

  onSubmit() {
    this.setState({loading: true});
    const {selectedFile} = this.state;
    let formData = new FormData();

    if (!selectedFile) {
      notify.error('Please select file!');
      this.setState({loading: false});
      return;
    }

    formData.append('selectedFile', selectedFile);
    axios.post(`${domains.domain}/api/v1/upload_file`, formData)
      .then((result) => {
        this.setState({phones: result.data[0].leads, fileId: result.data[0]._id, isSend: false, loading: false});
      })
      .catch(() => {
        this.setState({loading: false})
      });
  };

  updateFile(file) {
    if(!file) {
      this.setState({isSend: true});
    } else {
      this.setState({phones: file});
    }
  }

  render() {
    let {phones, isSend, fileId} = this.state;
    return (
      <div>
        <div className="page-title ng-scope"><h3>Leads Uploading</h3></div>
        <div id="main-wrapper" className="ng-scope afade">
          <div className="row">
            <div className="col-xs-12">
              <div className='panel info-box panel-white'>
                <div className='panel-body'>
                  {this.state.loading && <i className="fa fa-spinner fa-spin spin-style"/>}
                    <div id="clickHere">
                      <i className={this.state.loading ? '' : this.state.selectedFile.name ? 'fa fa-check-circle-o dz_icon' : 'fa fa-file-text-o dz_icon'} aria-hidden="true"/>
                      <span className='dz_message'>{this.state.selectedFile.name ? ""
                        : "Drop files here or just click to Upload"}</span>
                      <input
                      type="file"
                      id="file"
                      name="selectedFile"
                      accept="text/plain"
                      onChange={(e) => this.onChange(e)}
                      disabled={this.state.loading}
                    />
                    </div>

                  <a href={`${window.location.origin}/example_file`} download >File format example</a>
                  {this.state.fileId &&
                  <div>
                    <hr/>
                    <PhonesTable phones={phones} isLoading={false} isSend={isSend} updateFile={(file) => this.updateFile(file)} id={fileId}/>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
