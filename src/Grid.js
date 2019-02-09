import React, { Component } from 'react'
import './grid.css'
import ArrowKeysReact from 'arrow-keys-react'

export default class Grid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: this.props.dimensions.height,
            width: this.props.dimensions.width,
            mushrooms: this.props.mushrooms,
            direction: null,
            timer: null,
            mario: {
                next: { x: 0, y: 0 },
                prev: { x: 0, y: 0 }
            }
        }
        this.moveMario = this.moveMario.bind(this)
        this.includes = this.includes.bind(this)
        this.moveMario = this.moveMario.bind(this)
        this.shouldBounce = this.shouldBounce.bind(this)
        this.changeDirection = this.changeDirection.bind(this)
        this.nextMarioLocation = this.nextMarioLocation.bind(this)
        ArrowKeysReact.config({
            left: () => {
                console.log('going left')
                this.setState({
                    direction: 'l'
                });
            },
            right: () => {
                console.log('going right')
                this.setState({
                    direction: 'r'
                });
            },
            up: () => {
                console.log('going up')
                this.setState({
                    direction: 'u'
                });
            },
            down: () => {
                console.log('going down')
                this.setState({
                    direction: 'd'
                });
            }
        })
    }
    componentDidMount() {
        const timer = setInterval(() => {
            this.moveMario()
        }, 100)
        this.setState({ timer: timer })
    }
    componentWillUnmount() {
        clearInterval(this.state.timer)
    }
    static getDerivedStateFromProps(props, state) {
        return { height: props.dimensions.height, width: props.dimensions.width, mushroom: props.mushrooms }
    }
    moveMario() {
        if (this.state.direction) {
            if (this.shouldBounce(this.state.mario.prev.x, this.state.mario.prev.y)) {
                console.log('bouncing mario')
                this.changeDirection()
            }
            console.log('move mario')
            const next = this.nextMarioLocation()
            this.setState({ mario: { next: next, prev: this.state.mario.next } })
            this.forceUpdate()
        }
    }
    nextMarioLocation() {
        console.log(this.state.direction)
        if (this.state.direction === 'l') {
            return { x: this.state.mario.prev.x - 1, y: this.state.mario.next.y }
        } else if (this.state.direction === 'r') {
            return { x: this.state.mario.prev.x + 1, y: this.state.mario.next.y }
        } else if (this.state.direction === 'u') {
            return { x: this.state.mario.next.x, y: this.state.mario.prev.y - 1 }
        } else if (this.state.direction === 'd') {
            return { x: this.state.mario.next.x, y: this.state.mario.prev.y + 1 }
        } else {
            return { x: this.state.mario.prev.x, y: this.state.mario.prev.y }
        }
    }

    shouldBounce(x, y) {
        if(x === 0 && y === 0 && (this.state.direction === 'u' || this.state.direction === 'l')) {
            return true
        }
        if(x === this.state.width && y === this.state.height && (this.state.direction === 'd' || this.state.direction === 'r')) {
            return true
        }
        if(x === 0 && this.state.direction === 'l') {
            return true
        }
        if(x === this.state.width && this.state.direction === 'r') {
            return true
        }
        if(y === 0 && this.state.direction === 'l') {
            return true
        }
        if(y === this.state.height && this.state.direction === 'r') {
            return true
        }
        return false
    }
    changeDirection() {
        console.log(`from ${this.state.direction}`)
        if (this.state.direction === 'l') {
            this.setState({ direction: 'r' })
        } else if (this.state.direction === 'r') {
            this.setState({ direction: 'l' })
        } else if (this.state.direction === 'u') {
            this.setState({ direction: 'd' })
        } else {
            this.setState({ direction: 'u' })
        }
        console.log(`to ${this.state.direction}`)
    }
    setupGrid() {
        const grid = new Array(this.state.height).fill(0).map(_ => new Array(this.state.width).fill(0))
        this.setState({ grid: grid })
    }
    includes(x, y) {
        if (this.props.mushrooms[0]) {
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
                    if (i === this.state.mario.next.y && j === this.state.mario.next.x) {
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
            <div id="grid" {...ArrowKeysReact.events} tabIndex="1">
                {createGrid()}
            </div>
        )
    }
}
