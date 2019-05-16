import React, { Component } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
const log = console.log;

// class based component
// Will allow you to create a new target
class AddTarget extends Component {
    state = {
        modal_form: false,
        status_options: ['researching', 'pending approval', 'approved', 'declined']
    }

    handleClick = (e) => {
        e.preventDefault();
        log('adding target...');

        this.setState({
            modal_form: true
        })
    }

    render() {
        let hideModal = () => this.setState({ modal_form: false });

        return (
            <div className='float-left mt-3' id='addTargetContainer'>
                {/* Add a new target button */}
                <Button variant="dark" size="lg" onClick={(e) => this.handleClick(e)}>
                    <i className='plus icon'></i>
                    Create new target
                </Button>

                {/* Modal form */}
                <Modal
                    size="lg"
                    show={this.state.modal_form}
                    onHide={hideModal}
                    aria-labelledby="addTargetContainer"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Enter a target
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Row>
                                    <Form.Label>Status
                                        <br />
                                        {this.state.status_options.map(option => {
                                            return (
                                                    <Form.Check inline custom label={option} type='checkbox' id={option} key={option}/>
                                            );
                                        })}
                                    </Form.Label>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default AddTarget; 