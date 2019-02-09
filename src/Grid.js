import React, { Component } from 'react'
import './grid.css'

export default class Grid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: this.props.dimensions.height,
            width: this.props.dimensions.width,
            mushrooms: this.props.mushrooms,
            direction: null
        }
        this.moveMario = this.moveMario.bind(this)
        this.includes = this.includes.bind(this)
    }

    static getDerivedStateFromProps(props, state) {
        return { height: props.dimensions.height, width: props.dimensions.width, mushroom: props.mushrooms }
    }
    moveMario() {
    }
    setupGrid() {
        const grid = new Array(this.state.height).fill(0).map(_ => new Array(this.state.width).fill(0))
        this.setState({ grid: grid })
    }
    includes(x, y) {
        if (this.props.mushrooms[0]) {
            console.log(this.props.mushrooms[0])
            for (let i = 0; i < this.state.width; i++) {
                if (this.props.mushrooms[i].x === x && this.props.mushrooms[i].y === y) {
                    return true
                }
            }
        }
        return false
    }
    render() {
        const createGrid = () => {
            const item = (key, maybeMushroom, classess = "grid-item") => <div key={key} className={classess + (maybeMushroom ? " hasMushroom" : "")}></div>
            const libr = key => <br key={key} />
            const grid = []
            for (let i = 0; i < this.state.height; i++) {
                grid[i] = [] // visual grid
                for (let j = 0; j < this.state.width; j++) {
                    if (i === 0 && j === 0) {
                        grid[i].push(item(`${i}-${j}`, false, "grid-item mario"))
                    } else {
                        const hasMushroom = this.includes(j, i)
                        grid[i].push(item(`${i}-${j}`, hasMushroom))
                    }
                }
                grid[i].push(libr(i))
            }
            return grid
        }
        return (
            <div id="grid">
                {createGrid()}
            </div>
        )
    }
}
