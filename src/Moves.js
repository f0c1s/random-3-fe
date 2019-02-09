import React, { Component } from 'react'

export default class Moves extends Component {
    render() {
        const moves = this.props.moves
        return (
            <div>
                {
                    moves > 0 && moves + " moves"
                }
            </div>
        )
    }
}