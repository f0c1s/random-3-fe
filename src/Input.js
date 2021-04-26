import React, {useState} from 'react';
import './input.css';
import {Col, Container, Form, FormControl, FormGroup, FormLabel, FormText, Row} from "react-bootstrap";

function Input(props) {
    const [height, setHeight] = useState(props.gridDimensions.height);
    const [width, setWidth] = useState(props.gridDimensions.width);

    function sendBack() {
        props.setGridDimensions({height, width});
    }

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Form inline>
                        <FormGroup style={{margin: "1em"}}>
                            <FormLabel>Width ({width})</FormLabel>
                            <FormControl type="range" min={4} max={16} placeholder={"width"} onChange={(e) => {
                                setWidth(e.target.value);
                                sendBack();
                            }}/>
                        </FormGroup>
                        <FormGroup style={{margin: "1em"}}>
                            <FormLabel>Height ({height})</FormLabel>
                            <FormControl type="range" min={4} max={16} placeholder={"height"} onChange={(e) => {
                                setHeight(e.target.value);
                                sendBack();
                            }}/>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Input;