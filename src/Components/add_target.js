import React, { Component } from 'react';
import {
    Alert,
    Button,
    Modal,
    Form,
    Col,
    Row,
    DropdownButton,
    Dropdown
} from 'react-bootstrap';

const log = console.log;

// class based component
// Will allow you to create a new target
class AddTarget extends Component {
    state = {
        // status_option_checked: this.props.status_option_checked,
        // status_option_selected: this.props.status_option_selected,
        // status_options: this.props.status_options,
        // name: this.props.name,
        // website: this.props.website,
        // industry: this.props.industry,
        // number: this.props.number,
        // key_name: this.props.key_name,
        // key_number: this.props.key_number,
        // key_role: this.props.role,
        // company_percentage: this.props.company_percentage,
        // company_performance: this.props.company_performance,
        // dropdown_selection: this.props.dropdown_selection,


        // alert_message: '',
        // show_alert_message: false,

        // Key_Contact_List: [],
        show: true
    }

    handleClick = (e) => {
        this.props.toggleAppModal(true);
    }

    // Handles input change
    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });


    }

    // This add the target you entered and display if at least one field is filled
    handleSubmit = (e) => {
        e.preventDefault();

        if (this.props.submitText === 'Add') {



            const {
                name,
                website,
                industry,
                number,
                key_name,
                key_number,
                key_role,
                company_percentage,
                company_performance,
                status_option_selected
            } = this.props;

            // 
            const target_data = [
                name,
                website,
                industry,
                number,
                key_name,
                key_number,
                key_role,
                company_percentage,
                company_performance,
                status_option_selected
            ];

            // counts how much data 
            let data_filled_counter = 0;

            target_data.forEach((data, i) => {
                if (data !== '') {
                    // if we have at least one form of data with a value increase counter by 1
                    data_filled_counter++;


                }
                // if we are at the final loop and we have at least one form of data filled

                if (i === 9 && data_filled_counter !== 0) {

                    // If company percentage and performance are both empty strings
                    // or they're not empty strings then you can send data
                    // cannot submit data if values of percentage and performance are empty strings 
                    // or they both have values
                    if ((company_percentage === '' && company_performance === '') || (company_performance !== '' && company_percentage !== '')) {

                        // this will send the data submited to the parent component index.js
                        this.props.addCompany({
                            company_details: {
                                name: name,
                                website: website,
                                industry: industry,
                                number: number
                            },
                            key_contact: {
                                key_role: key_role,
                                key_name: key_name,
                                key_number: key_number
                            },
                            performance: {
                                percentage: company_percentage,
                                performance: company_performance
                            },
                            status: status_option_selected
                        });

                        let default_status_options = this.props.status_options;

                        default_status_options.forEach((option) => {
                            option.checked = false
                        });

                        this.props.toggleAppModal(false);

                        // Create a function on index.js that defaults to original form values
                        this.setState({
                            name: '',
                            website: '',
                            industry: '',
                            number: '',
                            key_name: '',
                            key_number: '',
                            key_role: '',
                            company_percentage: '',
                            company_performance: '',
                            dropdown_selection: '',
                            alert_message: '',
                            show_alert_message: false,
                            status_option_checked: false,
                            status_option_selected: '',
                            status_options: default_status_options
                        });
                    }
                    // create an else state that handles if performance and percentage are different
                    // example performance is a string and percentage is not
                }
            });

            if (data_filled_counter === 0) {
                this.props.updateAlertMessage(true, 'Please enter a value for atleast one field')
            }

        }
    }


    render() {
        let hideModal = () => this.props.toggleAppModal(false);

        return (
            <div className='float-left mt-3' id='addTargetContainer'>
                {/* Add a new target button */}
                <Button variant="dark" size="lg" onClick={() => this.handleClick()}>
                    <i className='plus icon'></i>
                    Create new target
                </Button>

                {/* <Row>
                    <Col xs={6}>
                        <Toast onClose={handleClose} show={show} delay={3000} autohide>
                            <Toast.Header>
                                <strong className="mr-auto">Track Pad</strong>
                                <small>{Date().getHours()}: {Date().getMinutes()}</small>
                            </Toast.Header>
                            <Toast.Body>
                                Woohoo, you're reading this text in a Toast!
                            </Toast.Body>
                        </Toast>
                    </Col>
                    <Col xs={6}>
                        <Button onClick={handleShow}>Show Toast</Button>
                    </Col>
                </Row> */}

                {/* Form Modal */}
                <Modal
                    size="lg"
                    show={this.props.showAppModal}
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
                        <Form onSubmit={(e) => this.handleSubmit(e)}>
                            {/* Alert Message */}
                            {this.props.show_alert_message &&
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formAlertMessage">
                                        <Alert variant='danger' className='text-center'>
                                            {this.props.alert_message}
                                        </Alert>
                                    </Form.Group>
                                </Form.Row>
                            }


                            <Form.Row>
                                <Form.Label>
                                    <h4>Status</h4>
                                    {this.props.status_options.map((option, idx) => {
                                        return (
                                            <Form.Check
                                                inline
                                                custom
                                                label={option.status}
                                                id={option.status}
                                                type='radio'
                                                checked={option.checked}
                                                key={option.status}
                                                onChange={(e) => this.props.checkItem(e, idx)}
                                                className='mr-4'
                                            />
                                        );
                                    })}
                                </Form.Label>
                            </Form.Row>

                            {/* Company Details */}
                            <h4>Company Details</h4>
                            <Form.Row className='mt-4'>

                                {/* Company Name Input*/}
                                <Form.Group as={Col} controlId="formCompanyName">
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="ABC Industries"
                                        name='name'
                                        value={this.props.name}
                                        onChange={(e) => this.props.handleChange(e)}
                                    />
                                </Form.Group>

                                {/* Company Industry Input*/}
                                <Form.Group as={Col} controlId="formIndustry">
                                    <Form.Label>Industry</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Oil Mining"
                                        name='industry'
                                        value={this.props.industry}
                                        onChange={(e) => this.props.handleChange(e)}
                                    />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                {/* Company website input*/}
                                <Form.Group as={Col} controlId="formCompanyName">
                                    <Form.Label>Website</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="https://abcmining.com"
                                        name='website'
                                        value={this.props.website}
                                        onChange={(e) => this.props.handleChange(e)}
                                    />
                                </Form.Group>


                                {/* Company phone number input */}
                                <Form.Group as={Col} controlId="formIndustry">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="800-645-6463"
                                        name='number'
                                        value={this.props.number}
                                        onChange={(e) => this.props.handleChange(e)}
                                    />
                                </Form.Group>
                            </Form.Row>

                            <h4>Key Contact</h4>
                            <Form.Row>
                                {/* Key Contact Role*/}
                                <Form.Group as={Col} controlId="formContactKeyRole">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Financial Advisor"
                                        name='key_role'
                                        value={this.props.key_role}
                                        onChange={(e) => this.props.handleChange(e)}
                                    />
                                </Form.Group>


                                {/* Key Contact Name */}
                                <Form.Group as={Col} controlId="formContactKeyName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Billy Jean"
                                        name='key_name'
                                        value={this.props.key_name}
                                        onChange={(e) => this.props.handleChange(e)}
                                    />
                                </Form.Group>

                                {/* Key Contact Phone Number */}
                                <Form.Group as={Col} controlId="formContactKeyNumber">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="770-475-5853"
                                        name='key_number'
                                        value={this.props.keyNumber}
                                        onChange={(e) => this.props.handleChange(e)}
                                    />
                                </Form.Group>
                            </Form.Row>

                            {/* Business Performance Dropdown menu */}
                            <Form.Row className='mt-4'>
                                <h4>How is your business performing?</h4>
                                <Form.Group as={Col} controlId="formCompanyPerformance">
                                    <DropdownButton
                                        drop='down'
                                        variant="dark"
                                        title={this.props.company_performance === '' ? 'Business Performance' : this.props.company_performance}
                                        className='float-right'
                                        onClick={() => this.props.handleSelectClick('company_performance')}
                                    >


                                        {['Up', 'Down'].map((performance, i) => {
                                            return (
                                                <Dropdown.Item
                                                    eventKey={performance}
                                                    key={i}
                                                    name='company_performance'
                                                    onSelect={(e) => this.props.handleSelect(e)}
                                                    ref={e => this.dropdown_company_performance = e}
                                                >
                                                    {performance}
                                                </Dropdown.Item>
                                            )

                                        })}

                                    </DropdownButton>
                                </Form.Group>

                                {/* Company Percentage */}
                                <Form.Group as={Col} controlId="formCompanyPercentage">
                                    <DropdownButton
                                        drop='down'
                                        variant="dark"
                                        title={this.props.company_percentage === '' ? 'Select a percenatge' : this.props.company_percentage}
                                        onClick={() => this.props.handleSelectClick('company_percentage')}

                                    >
                                        {/* Company Performance */}

                                        {['0%', '25%', '50%', '75%', '100%+'].map((percentage, i) => {
                                            return (
                                                <Dropdown.Item
                                                    eventKey={percentage}
                                                    name='company_percentage'
                                                    onSelect={(e) => this.props.handleSelect(e)}
                                                    key={i}
                                                    ref={e => this.dropdown_company_percentage = e}
                                                >
                                                    {percentage}
                                                </Dropdown.Item>
                                            )

                                        })}


                                    </DropdownButton>
                                </Form.Group>
                            </Form.Row>


                            <Modal.Footer>


                                {this.props.submitText === 'Add' ?
                                    <Button variant="dark" type='submit'>Add</Button>
                                    : <Button variant="dark" onClick={() => this.props.handleTargetUpdate()} type='submit'>Update</Button>
                                }
                            </Modal.Footer>


                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default AddTarget; 