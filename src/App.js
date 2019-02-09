import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Input from './Input'
import Grid from './Grid'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gridDimensions: { height: 10, width: 10 },
            marioPosition: { x: 0, y: 0 }
        }
        this.onCreateGrid = this.onCreateGrid.bind(this)
    }
    onCreateGrid(dimensions) {
        this.setState({ gridDimensions: dimensions })
        // this.createRandomMushrooms()
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <section className="App-content">
                    <Input onCreateGrid={this.onCreateGrid} />
                    <Grid dimensions={this.state.gridDimensions} />
                </section>
                {/* <footer className="App-footer">
                    <img src={logo} className="App-logo" alt="logo" />
                </footer> */}
            </div>
        )
    }
}

export default App
