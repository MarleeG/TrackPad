import React from 'react';
import { ListGroup, Container, Row, Col, Button } from 'react-bootstrap';

// Functional Component
const DisplayTarget = (props) => {
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
                                        {/* Company Details Column */}
                                        <Col lg={3}>
                                            <h3>Company Details</h3>
                                            <h5>Name: {name}</h5>
                                            <h5>Industry: {industry}</h5>
                                            <h5>Number: {number}</h5>
                                            <h5>Website: {website}</h5>
                                        </Col>

                                        {/* Key Contact Column */}
                                        <Col lg={3}>
                                            <h3>Key Contact</h3>
                                            <h5>Role: {key_role}</h5>
                                            <h5>Name: {key_name}</h5>
                                            <h5>Number: {key_number}</h5>
                                        </Col>

                                        {/* Performance Column */}
                                        <Col lg={2}>
                                            <h3>Performance</h3>
                                            <h5>
                                                {/* if performance equals Up then show the Semantic UI up arrow */}
                                                {
                                                    (performance === 'Up' && percentage !== '') ?
                                                    <i className="long arrow alternate up icon large"></i>
                                                    :null
                                                } 

                                                {/* if performance equals Down then show the Semantic UI down arrow */}
                                                {(performance === 'Down' && percentage !== '')?
                                                    <i className="long arrow alternate down icon large"></i>
                                                    :null
                                                } {(performance !== '' && percentage !== '')? 'by' : null} {percentage}

                                                {/* If there isn't a performance or percentage, then display Unknown */}
                                                {   
                                                    (performance === '' ||  percentage === '') ? <p>Unknown</p>: null
                                                }

                                            </h5>
                                        </Col>
                                        <Col lg={2}>
                                            <h3>Status</h3>
                                            <h5>Status: {status}</h5>
                                        </Col>

                                        {/* Edit and Delete Action Buttons */}
                                        {/* Revision Column */}
                                        <Col lg={2} className='text-center'>
                                            <h3>Revision?</h3>
                                            <Button variant="dark" size='sm' onClick={() => props.handleDelete(idx)}>
                                                {/* Semantic UI trash icon */}
                                                <i className="trash icon large mr-5 text-center mx-auto"></i>
                                            </Button>
                                            {' '}
                                            <Button variant="dark" size='sm' onClick={() => {
                                                props.toggleAppModal(true)
                                                props.handleEditTargetClick(idx)
                                                }
                                            }>
                                                {/* Semantic UI edit icon */}
                                                <i className="edit icon large mx-auto"></i>
                                            </Button>
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