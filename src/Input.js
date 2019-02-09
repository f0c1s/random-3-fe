import React, { Component } from 'react'
import './input.css'

export default class Input extends Component {
    constructor(props) {
        super(props)

        this.state = {
            height: 10,
            width: 10
        }

        this.createGrid = this.createGrid.bind(this)
        this.handleWidthChange = this.handleWidthChange.bind(this)
        this.handleHeightChange = this.handleHeightChange.bind(this)
    }
    createGrid(e) {
        e.preventDefault()
        this.props.onCreateGrid(this.state)
    }
    handleHeightChange(e) {
        this.setState({ height: e.target.value })
    }
    handleWidthChange(e) {
        this.setState({ width: e.target.value })
    }
    render() {
        return (
            <form id="gridForm">
                <div id="heightInputBox">
                    <label htmlFor="height">
                        Height:
                    </label>
                    <input type="text" id="height" name="height" onChange={this.handleHeightChange} />
                </div>
                <div id="widthInputBox">
                    <label htmlFor="width">
                        Width:
                    </label>
                    <input type="text" id="width" name="width" onChange={this.handleWidthChange} />
                </div>
                <div id="createGridButtonBox">
                    <button id="createGridButton" onClick={this.createGrid}>Create grid</button>
                </div>
            </form>
        )
    }
}