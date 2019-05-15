import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Container, Row, Col} from 'react-bootstrap';

// Components
import Header from './Components/header';
import AddTarget from './Components/add_target';

// React Component
class App extends Component{

    render(){
        return(
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
                            <AddTarget/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}


// Render App inside div with an id of root
ReactDOM.render(<App />, document.getElementById('root'));