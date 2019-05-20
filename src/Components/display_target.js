import React from 'react';
import { ListGroup, Container, Row, Col } from 'react-bootstrap';

// Functional Component
const DisplayTarget = (props) => {
    function handleDelete(index) {
        props.handleDelete(index)
    }

    return (
        <div className='mx-auto mt-5'>
            <ListGroup as="ul">
                {props.targets.length > 0
                    ? props.targets.map((target, idx) => {
                        let { company_details:
                            {
                                name,
                                industry,
                                number,
                                website
                            },
                            key_contact: {
                                key_role,
                                key_name,
                                key_number
                            },
                            performance: {
                                percentage,
                                performance
                            },
                            status
                        } = target;
                        return (
                            <ListGroup.Item as="li" action key={idx}>
                                <Container>
                                    <Row>
                                        <Col lg={3}>
                                            <h3>Company Details</h3>
                                            <h5>Name: {name}</h5>
                                            <h5>Industry: {industry}</h5>
                                            <h5>Number: {number}</h5>
                                            <h5>Website: {website}</h5>
                                        </Col>
                                        <Col lg={3}>
                                            <h3>Key Contact</h3>
                                            <h5>Role: {key_role}</h5>
                                            <h5>Name: {key_name}</h5>
                                            <h5>Number: {key_number}</h5>
                                        </Col>
                                        <Col lg={2}>
                                            <h3>Performance</h3>
                                            <h5>
                                                {performance === 'Up' && 
                                                    <i className="long arrow alternate up icon large"></i>
                                                    } 

                                                {performance === 'Down' &&
                                                    <i className="long arrow alternate down icon large"></i>
                                                } {performance !== '' && 'by'} {percentage}

                                                {/* If there isn't a performance, then display Unknown */}
                                                {
                                                    performance === '' && <p>Unknown</p>
                                                }
                                            </h5>
                                        </Col>
                                        <Col lg={2}>
                                            <h3>Status</h3>
                                            <h5>Status: {status}</h5>
                                        </Col>

                                        {/* Edit and Delete Buttons */}
                                        <Col lg={2} className='text-center'>
                                            <i className="trash icon large mr-4" onClick={() => handleDelete(idx)}></i>
                                            <i className="edit icon large" 
                                                onClick={() => {
                                                props.toggleAppModal(true)
                                                props.handleEditTargetClick(idx)
                                                }
                                            }></i>
                                        </Col>
                                    </Row>
                                </Container>
                            </ListGroup.Item>
                        )
                    }) :
                    null
                }



            </ListGroup>
        </div>
    )
}

export default DisplayTarget;