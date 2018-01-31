import React from 'react'
import Modal from 'react-modal'
import m from '../services/m'
import PhonesTable from './PhonesTable'

class ModalLead extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {file, closeModal, isOpen} = this.props;

    return <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="File Details"
        style={{
          content: {
            maxWidth: '900px',
          }
        }}
      >
        <i className="fa fa-times pull-right" onClick={closeModal}></i>
        <h3 className="mt-5">File Details</h3>
        <hr/>
        <div className="loan-details-title">
          <b>Created:</b> {m.date(file.created_at)}
        </div>
        <div className="loan-details-title">
          <b>Updated:</b> {m.date(file.updated_at)}
        </div>
        <div className="loan-details-title">
          <b>File Name:</b> {file.originName}
        </div>
        <h3 className="mb-15">Leads Table</h3>
        <div className="afade">
          <div>
            <PhonesTable phones={file.leads} isLoading={false} updateFile={(file) => this.props.updateFile(file)} id={file._id} isSend={file.isSend}/>
          </div>
        </div>
        <div className="wrapper">
          <button type="button"
                  className="btn btn-secondary cancel_el pull-right"
                  onClick={() => closeModal()}
                  onKeyDown={e => e.preventDefault()}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  }
}

export default ModalLead;
