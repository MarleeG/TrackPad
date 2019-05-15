import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import '../index.css';

//function based component
const Header = () => {
    // Font Styles 
    const TitleStyle = { fontFamily: 'Mitr', fontSize: '55px'};
    const QuoteStyle = {fontFamily: 'Cookie', fontSize: '20px'};

    return (
        <div className='mx-auto header mt-2'>
            <Container>
                <Row>
                    <Col lg={12}>
                        <h1 className='text-center mt-2' style={TitleStyle}>Track Pad</h1>
                    </Col>
                </Row>
                <Row >
                    <Col lg={12}>
                        <p className='text-center mb-1' style={QuoteStyle}>Tracking &#38; analyzing made simple!</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Header;