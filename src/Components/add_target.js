import React, { Component } from 'react';
import {
    Alert,
    Button,
    Modal,
    Form,
    Col,
    DropdownButton,
    Dropdown
}
    from 'react-bootstrap';


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
        ],
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

        Key_Contact_List: [],
    }

    handleClick = (e) => {
        this.setState({
            modal_form: true
        });
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

    // This will only allow one radion option to be selected
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

    }

    // Handles input change
    handleChange = (e) => {
        const { name, value } = e.target;
        // log(name)
        // log(value)

        this.setState({
            [name]: value
        });
    }

    // Updates dropdown menu selecttion
    handleSelect = (e) => {
        if (this.state.dropdown_selection === 'company_performance') {
            this.setState({
                company_performance: e
            });
        } else {
            this.setState({
                company_percentage: e
            });
        }
    }

    // This will update which dropdown was selected to allow handleSelect to update the selected value for each drop down
    handleSelectClick = (x) => {
        this.setState({
            dropdown_selection: x
        });
    }

    // This add the target you entered and display if at least one field is filled
    handleSubmit = (e) => {
        e.preventDefault();

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
        } = this.state;

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

                // if we are at the final loop and we have at least one form of data filled
            }

            if (i === 9 && data_filled_counter !== 0) {

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

                    let default_status_options = this.state.status_options;

                    default_status_options.forEach((option) => {
                        option.checked = false
                    });
            
                    this.setState({
                        modal_form: false,
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
            }
        });

        if (data_filled_counter === 0) {
            this.setState({
                show_alert_message: true,
                alert_message: 'Please enter a value for atleast one field'
            })
        }
    }


    render() {
        let hideModal = () => this.setState({ modal_form: false });

        return (
            <div className='float-left mt-3' id='addTargetContainer'>
                {/* Add a new target button */}
                <Button variant="dark" size="lg" onClick={() => this.handleClick()}>
                    <i className='plus icon'></i>
                    Create new target
                </Button>


                {/* Form Modal */}
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
                        <Form onSubmit={(e) => this.handleSubmit(e)}>
                            {/* Alert Message */}
                            {this.state.show_alert_message &&
                                <Form.Row>
                                    <Alert variant='danger'>
                                        {this.state.alert_message}
                                    </Alert>
                                </Form.Row>
                            }


                            <Form.Row>
                                <Form.Label>
                                    <h4>Status</h4>
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
                                        value={this.state.name}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Form.Group>

                                {/* Company Industry Input*/}
                                <Form.Group as={Col} controlId="formIndustry">
                                    <Form.Label>Industry</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Oil Mining"
                                        name='industry'
                                        value={this.state.industry}
                                        onChange={(e) => this.handleChange(e)}
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
                                        value={this.state.website}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Form.Group>


                                {/* Company phone number input */}
                                <Form.Group as={Col} controlId="formIndustry">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="800-645-6463"
                                        name='number'
                                        value={this.state.number}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Form.Group>
                            </Form.Row>

                            <h4>Key Contacts</h4>
                            <Form.Row>
                                {/* Key Contact Role*/}
                                <Form.Group as={Col} controlId="formContactKeyRole">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Financial Advisor"
                                        name='key_role'
                                        value={this.state.key_role}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Form.Group>


                                {/* Key Contact Name */}
                                <Form.Group as={Col} controlId="formContactKeyName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Billy Jean"
                                        name='key_name'
                                        value={this.state.key_name}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Form.Group>

                                {/* Key Contact Phone Number */}
                                <Form.Group as={Col} controlId="formContactKeyNumber">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="770-475-5853"
                                        name='key_number'
                                        value={this.state.key_number}
                                        onChange={(e) => this.handleChange(e)}
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
                                        title={this.state.company_performance === '' ? 'Business Performance' : this.state.company_performance}
                                        className='float-right'
                                        onClick={() => this.handleSelectClick('company_performance')}
                                    >


                                        {['Up', 'Down'].map((performance, i) => {
                                            return (
                                                <Dropdown.Item
                                                    eventKey={performance}
                                                    key={i}
                                                    name='company_performance'
                                                    onSelect={(e) => this.handleSelect(e)}
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
                                        title={this.state.company_percentage === '' ? 'Select a percenatge' : this.state.company_percentage}
                                        onClick={() => this.handleSelectClick('company_percentage')}

                                    >
                                        {/* Company Performance */}

                                        {['0%', '25%', '50%', '75%', '100%+'].map((percentage, i) => {
                                            return (
                                                <Dropdown.Item
                                                    eventKey={percentage}
                                                    name='company_percentage'
                                                    onSelect={(e) => this.handleSelect(e)}
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
                                <Button variant="dark" type='submit'>Add</Button>
                            </Modal.Footer>


                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default AddTarget; 