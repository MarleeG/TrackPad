import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';

const log = console.log;
class DisplayTarget extends Component {
    state = {
        targets: this.props.targets
    }
    // componentDidMount = () => {

    //     if (this.props.targets.length > 0) {
    //         log(this.props.targets)
    //     }

    //     log(this.props.targets)


    // }

    // showProps = (prop) => {
    //     log(prop)
    // }







    render() {
        return (
            <div className='mx-auto mt-5'>
                <h4 className='text-center'>Display Targets Here</h4>

                <ListGroup as="ul">
                    {this.state.targets.length > 0
                     ? this.state.targets.map((target, i) => {
                         return(
                            <ListGroup.Item as="li" active key={i}>
                                target.status
                            </ListGroup.Item>
                         )
                         
                     }) : null}
                    


                </ListGroup>
            </div>
        )
    }
}

export default DisplayTarget;