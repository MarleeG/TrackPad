import React, { Component } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
const log = console.log;

// class based component
// Will allow you to create a new target
class AddTarget extends Component {
    state = {
        modal_form: false,
        status_option_checked: false,
        status_option_selected: '',
        status_options: [
            { status: 'researching', checked: false },
            { status: 'pending', checked: false },
            { status: 'approved', checked: false },
            { status: 'declined', checked: false }
        ]

    }

    handleClick = (e) => {
        e.preventDefault();
        this.setState({
            modal_form: true
        })
        // this.props.toggleAppModal();
    }

    updateStatusChecked = (selected_value) => {
        // assign the status_options_copy in order to make changes to this.state.status_options
        let status_options_copy = this.state.status_options;

        // Loop through status_options_copy
        status_options_copy.forEach(option => {
            // if the status matches the selected value then assign checked as true
            if (option.status === selected_value) {
                option.checked = true;
            } else {
                option.checked = false;
            }
        });

        // New value of status_options set
        this.setState({ status_options: status_options_copy })
    }

    checkItem = (e, index) => {
        let selected_value = this.state.status_options[index].status;

        // If all have a checked status of false then update status_option_checked to true
        // confirms if one status option has been checked
        this.state.status_options.forEach(option => {
            if (!option.checked) {
                this.setState({
                    status_option_checked: true
                });
            }
        });

        // May remove as the selected value can found when looping over 
        // this.state.status_options to check which option has been checked as true
        this.setState({
            status_option_selected: selected_value
        }, () => this.updateStatusChecked(selected_value));
        

        // May remove this.. unneeded at the momment
        const { checked } = e.target;
        log(checked);
        log(index);
        log(selected_value);
        log(`----`);
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

                {/* {this.props.children()} */}

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
                        {/* Form */}
                        <Form>
                            <Form.Row>
                                <Form.Label>Status
                                    <br />
                                    {this.state.status_options.map((option, index) => {
                                        return (
                                            <Form.Check
                                                inline
                                                custom
                                                label={option.status}
                                                id={option.status}
                                                type='radio'
                                                checked={option.checked}
                                                key={option.status}
                                                onChange={(e) => this.checkItem(e, index)}
                                            />
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