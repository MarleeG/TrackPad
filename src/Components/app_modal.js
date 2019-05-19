// import React, { Component } from 'react';
// import { Modal, Form, Row, Col } from 'react-bootstrap';

// class AppModal extends Component {

//     render() {
//         let hideModal = () => this.setState({ modal_form: false });
//         return (
//             <Modal
//                 size="lg"
//                 show={this.state.modal_form}
//                 onHide={hideModal}
//                 aria-labelledby="addTargetContainer"
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title id="example-modal-sizes-title-lg">
//                         Enter a target
//             </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>


//                     {/* Form */}
//                     <Form>
//                         <Form.Row>
//                             <Form.Label>Status
//                             <br />
//                                 {this.state.status_options.map((option, index) => {
//                                     return (
//                                         <Form.Check inline custom label={option} type='radio' id={option} key={option} onChange={(e) => this.checkItem(e, index)} />
//                                     );
//                                 })}
//                             </Form.Label>
//                         </Form.Row>
//                     </Form>


//                 </Modal.Body>
//             </Modal>
//         )
//     }
// }

// export default AppModal;
