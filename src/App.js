import React, { Component } from 'react';
import './App.css';
import Sortable from './Sortable';
import { move, shuffle, reverse } from './array';

const generateItems = length => [...Array(length).keys()].map(k => `Item ${k}`)

const actions = {
    reverse: ({ items }) => ({ items: reverse(items) }),
    shuffle: ({ items }) => ({ items: shuffle(items) }),
    move: (oldIndex, newIndex) => ({ items }) => ({ items: move(items, oldIndex, newIndex) }),
}

export default class App extends Component {

    state = { items: generateItems(80) }

    onDrop = ({ oldIndex, newIndex }) => this.setState(actions.move(oldIndex, newIndex))

    render() {
        return <div className='list'>
            <Sortable dragClassName='drag-style' onDrop={this.onDrop}>
                {this.state.items.map(item =>
                    <div key={item} className='list-item'>{item}</div>)
                }
            </Sortable>
        </div>
    }
}
