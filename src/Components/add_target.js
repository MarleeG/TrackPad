import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
const log = console.log;

// class based component
// Will allow you to create a new target
class AddTarget extends Component {
    state = {
        modal_form: false
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
            <div className='float-left mt-3'>
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
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Large Modal
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>...</Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default AddTarget; 