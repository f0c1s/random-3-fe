import React, {useEffect, useState} from 'react';
import './App.css';
import Input from './Input';
import Grid from './Grid';
import {Container, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [gridDimensions, setGridDimensions] = useState({height: 10, width: 10});
    
    return (
        <Container fluid className="App">
            <Row>
                <Col>
                    <header className="App-header">
                        <h1>Mario?</h1>
                        <h6>It goes brrr...</h6>
                    </header>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input setGridDimensions={setGridDimensions} gridDimensions={gridDimensions}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Grid gridDimensions={gridDimensions}/>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
