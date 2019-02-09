import React, { Component } from 'react'
import './grid.css'

export default class Grid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: this.props.dimensions.height,
            width: this.props.dimensions.width,
            mushrooms: [],
            direction: null,
            grid: []
        }
        this.moveMario = this.moveMario.bind(this)
        this.createGrid = this.createGrid.bind(this)
    }

    static getDerivedStateFromProps(props, state) {
        return { height: props.dimensions.height, width: props.dimensions.width }
    }
    moveMario() {
    }
    createGrid() {
        console.log('calling createGrid()')
        console.log(`height: ${this.state.height}, width: ${this.state.width}`)
        const item = key => <div key={key} className="grid-item"></div>
        const libr = <br />
        const grid = []
        for (let i = 0; i < this.state.height; i++) {
            grid[i] = []
            for (let j = 0; j < this.state.width; j++) {
                grid[i].push(item(`${i}-${j}`))
            }
            grid[i].push(libr)
        }
        return grid
    }
    render() {
        return (
            <div id="grid">
                {this.createGrid()}
            </div>
        )
    }
}
