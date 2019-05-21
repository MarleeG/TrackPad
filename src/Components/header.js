import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

//function based component
const Header = () => {
    // Header Styles 
    const TitleStyle = { fontFamily: 'Mitr', fontSize: '55px'};
    const QuoteStyle = {fontFamily: 'Cookie', fontSize: '20px'};
    const HeaderStyle = {color: 'white', backgroundColor: '#343a40'}

    return (
        <div className='mx-auto mt-2' style={HeaderStyle}>
            <Container>
                <Row>
                    {/* Title */}
                    <Col lg={12}>
                        <h1 className='text-center mt-2' style={TitleStyle}>Track Pad</h1>
                    </Col>
                </Row>
                <Row>
                    {/* Functionality Quote */}
                    <Col lg={12}>
                        <p className='text-center mb-1' style={QuoteStyle}>Tracking &#38; analyzing made simple!</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Header;