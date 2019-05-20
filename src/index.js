import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';

// Components
import Header from './Components/header';
import AddTarget from './Components/add_target';
import DisplayTarget from './Components/display_target';

// const log = console.log;

// App Component
class App extends Component {
    state = {
        showAppModal: false,
        all_companies: [
            {
                company_details: {
                    name: "Candy Castle",
                    industry: 'Food',
                    number: '800-TRY-CNDY',
                    website: 'https://candlecastle.com'
                },
                key_contact: {
                    key_role: 'Owner',
                    key_name: 'Leah Aire',
                    key_number: '561-768-8384'
                },
                performance: {
                    percentage: '25%',
                    performance: 'Up'
                },
                status: 'pending'
            },
            {
                company_details: {
                    name: "Poppington",
                    industry: 'Beverage',
                    number: '877-546-8790',
                    website: 'https://Poppington.com'
                },
                key_contact: {
                    key_role: 'CEO',
                    key_name: 'Olivia Arnold',
                    key_number: '470-567-1257'
                },
                performance: {
                    percentage: '25%',
                    performance: 'Down'
                },
                status: 'approved'
            },
        ],
        name: '',
        website: '',
        industry: '',
        number: '',
        key_name: '',
        key_number: '',
        key_role: '',
        company_performance: '',
        company_percentage: '',
        dropdown_selection: '',
        status_option_checked: false,
        status_option_selected: '',
        status_options: [
            { status: 'researching', checked: false },
            { status: 'pending', checked: false },
            { status: 'approved', checked: false },
            { status: 'declined', checked: false }
        ],
        alert_message: '',
        show_alert_message: false,
        submitText: 'Add',
        updateIndex: undefined
    }

    toggleAppModal = (bool) => {
        this.setState({
            showAppModal: bool
        });
    }

    defaultFormValues = () => {

        let status_options_copy = this.state.status_options;
        status_options_copy.forEach((option) => {
            option.checked = false
        });

        this.setState({
            name: '',
            website: '',
            number: '',
            industry: '',
            key_name: '',
            key_number: '',
            key_role: '',
            company_performance: '',
            company_percentage: '',
            dropdown_selection: '',
            status_option_checked: false,
            status_option_selected: '',
            status_options: status_options_copy,
            alert_message: '',
            show_alert_message: false,
            submitText: 'Add',
            updateIndex: undefined
        });

    }

    // This will add a target company to this.state.company_data
    addCompany = data => {
        this.setState({
            all_companies: [data, ...this.state.all_companies]
        });
    }

    // This will delete the company data selected by the user
    handleDelete = (index) => {
        let company_data = this.state.all_companies;

        // Temporary placeholder for new updated data after delete is complete
        let updated_data = [];
        company_data.forEach((data, idx) => {
            // If the index of the deleted data does not equal the index of others 
            // then push data to updated_data array
            if (index !== idx) {
                updated_data.push(data);
            }
        });

        // update all_companies to updated data
        this.setState({
            all_companies: updated_data
        });
    }

    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    }


    // This will update which dropdown was selected to allow handleSelect to update the selected value for each drop down
    handleSelectClick = (x) => {
        this.setState({
            dropdown_selection: x
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

        // Updates the selected value for the status selected by the user
        this.setState({
            status_option_selected: selected_value
        }, () => this.updateStatusChecked(selected_value));
    }

    // This will update the status radio options
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

    updateAlertMessage = (bool, message) => {
        this.setState({
            show_alert_message: bool,
            alert_message: message
        });
    }

    // Displays Modal with company/target selected by the user
    handleEditTargetClick = idx => {

        // Destructure values of the selected company that wil be updated
        let {
            company_details: { name, industry, number, website },
            key_contact: { key_role, key_name, key_number },
            performance: { percentage, performance },
            status
        } = this.state.all_companies[idx];

        // Provide all fields the value of the selected company/target selected for editing 
        // Display the status of the selected target/company so it will show the current status
        // of the company/target chosen for editting
        let status_option_copy = this.state.status_options;

        status_option_copy.forEach(option => {
            if (option.status === status) {
                option.checked = true;
            } else {
                option.checked = false;
            }
        });

        this.setState({
            submitText: 'Update',
            name: name,
            industry: industry,
            number: number,
            website: website,
            key_role: key_role,
            key_name: key_name,
            key_number: key_number,
            status: status,
            company_performance: performance,
            company_percentage: percentage,
            status_options: status_option_copy,
            updateIndex: idx
        });
    }

    handleTargetUpdate = () => {
        let {
            name,
            industry,
            number,
            website,
            key_role,
            key_name,
            key_number,
            company_percentage,
            company_performance,
            status_option_selected,
            updateIndex
        } = this.state;

        let company_edit = {
            company_details: {
                name: name,
                industry: industry,
                number: number,
                website: website
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
        }

        let companies = this.state.all_companies;

        companies[updateIndex] = company_edit;

        this.setState({
            showAppModal: false,
            all_companies: companies,
            submitText: 'Add'
        });
    }

    render() {
        let {
            name,
            website,
            industry,
            number,
            key_name,
            key_number,
            key_role,
            dropdown_selection,
            company_performance,
            company_percentage,
            status_option_checked,
            status_option_selected,
            status_options,
            alert_message,
            show_alert_message,
            submitText
        } = this.state;
        return (
            <div>
                <Container>
                    {/* Header Component displays here*/}
                    <Row>
                        <Col lg={12}>
                            <Header />
                        </Col>
                    </Row>

                    {/*AddTarget Component displays here  */}
                    <Row>
                        <Col>
                            <AddTarget
                                addCompany={data => this.addCompany(data)}
                                showAppModal={this.state.showAppModal}
                                toggleAppModal={bool => this.toggleAppModal(bool)}
                                name={name}
                                website={website}
                                industry={industry}
                                number={number}
                                key_name={key_name}
                                key_role={key_role}
                                key_number={key_number}
                                company_performance={company_performance}
                                company_percentage={company_percentage}
                                dropdown_selection={dropdown_selection}
                                alert_message={alert_message}
                                show_alert_message={show_alert_message}
                                status_option_checked={status_option_checked}
                                status_option_selected={status_option_selected}
                                status_options={status_options}
                                submitText={submitText}
                                handleSelect={e => this.handleSelect(e)}
                                handleSelectClick={x => this.handleSelectClick(x)}
                                handleChange={(e) => this.handleChange(e)}
                                checkItem={(e, idx) => this.checkItem(e, idx)}
                                updateAlertMessage={(bool, msg) => this.updateAlertMessage(bool, msg)}
                                handleTargetUpdate={e => this.handleTargetUpdate(e)}
                                defaultFormValues={() => this.defaultFormValues()}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <DisplayTarget
                                targets={this.state.all_companies}
                                handleDelete={idx => this.handleDelete(idx)}
                                showAppModal={this.state.showAppModal}
                                toggleAppModal={bool => this.toggleAppModal(bool)}
                                handleEditTargetClick={i => this.handleEditTargetClick(i)}
                            />
                        </Col>
                    </Row>
                </Container>
            </div >
        )
    }
}


// Render App inside div with an id of root
ReactDOM.render(<App />, document.getElementById('root'));