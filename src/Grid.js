import React, { Component } from 'react'
import './grid.css'
import ArrowKeysReact from 'arrow-keys-react'

export default class Grid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: this.props.dimensions.height,
            width: this.props.dimensions.width,
            mushrooms: [],
            direction: null,
            timer: null,
            mario: {
                next: { x: 0, y: 0 },
                prev: { x: 0, y: 0 }
            },
            moves: 0
        }
        this.moveMario = this.moveMario.bind(this)
        this.includes = this.includes.bind(this)
        this.moveMario = this.moveMario.bind(this)
        this.shouldBounce = this.shouldBounce.bind(this)
        this.changeDirection = this.changeDirection.bind(this)
        this.nextMarioLocation = this.nextMarioLocation.bind(this)
        this.createRandomMushrooms = this.createRandomMushrooms.bind(this)
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
        this.createRandomMushrooms()
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
    createRandomMushrooms() {
        let shrooms = []
        for (let i = 0; i < 10; i++) {
            const x = Math.floor(Math.random() * this.state.width)
            const y = Math.floor(Math.random() * this.state.height)
            shrooms.push({ x, y })
        }
        this.setState({ mushrooms: shrooms })
    }
    moveMario() {
        if(this.state.mushrooms.length === 0) {
            clearInterval(this.state.timer)
        }
        if (this.state.direction) {
            let bounced = false
            if (this.shouldBounce(this.state.mario.prev.x, this.state.mario.prev.y)) {
                console.log('bouncing mario')
                this.changeDirection()
                bounced = true
            }
            console.log('move mario')
            const next = this.nextMarioLocation()
            if (!bounced) {
                this.setState({ mario: { next: next, prev: this.state.mario.next } })
            } else {
                this.setState({ mario: { next: next, prev: this.state.mario.prev } })
            }
            const newMushrooms = this.state.mushrooms.filter(m => !(m.x === next.x && m.y === next.y))
            this.setState({ mushrooms: newMushrooms, moves: this.state.moves + 1 })
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
        if (x === 0 && y === 0 && (this.state.direction === 'u' || this.state.direction === 'l')) {
            return true
        }
        if (x === this.state.width && y === this.state.height && (this.state.direction === 'd' || this.state.direction === 'r')) {
            return true
        }
        if (x === 0 && this.state.direction === 'l') {
            return true
        }
        if (x === this.state.width - 1 && this.state.direction === 'r') {
            return true
        }
        if (y === 0 && this.state.direction === 'u') {
            return true
        }
        if (y === this.state.height - 1 && this.state.direction === 'd') {
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
        if (this.state.mushrooms[0]) {
            for (let i = 0; i < this.state.width; i++) {
                if (this.state.mushrooms[i] && this.state.mushrooms[i].x === x && this.state.mushrooms[i].y === y) {
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
                    const isMarioThere = i === this.state.mario.next.y && j === this.state.mario.next.x
                    if (isMarioThere) {
                        grid[i].push(item(`${i}-${j}`, false, "grid-item mario"))
                    } else {
                        const hasMushroom = this.includes(j, i) && !isMarioThere
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
                {
                    this.state.moves > 0 && this.state.moves + " moves"
                }
            </div>
        )
    }
}
