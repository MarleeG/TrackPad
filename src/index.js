import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';

// Components
import Header from './Components/header';
import AddTarget from './Components/add_target';
import AppModal from './Components/app_modal';

// React Component
class App extends Component {
    state = {
        showAppModal: false,
        all_companies: [],
        company_data: {
            status: '',
            company_details: {
                name: '',
                website: '',
                industry: '',
                number: ''
            }
        }
    }

    // Complete this function to add company data to this.state.company_data
    addCompany = (status, company_details) => {

    }

    toggleAppModal = () => {
        if(this.state.showAppModal){
            this.setState({
                showAppModal: false
            });
        }else{
            this.setState({
                showAppModal: true
            });
        }
    }

    render() {
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
                            {/* <AddTarget showAppModal={this.state.showAppModal} toggleAppModal={() => this.toggleAppModal()}>
                                <AppModal />
                            </AddTarget> */}

                            <AddTarget />
                        </Col>
                    </Row>
                </Container>
            </div >
        )
    }
}


// Render App inside div with an id of root
ReactDOM.render(<App />, document.getElementById('root'));