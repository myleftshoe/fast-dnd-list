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

const items = ['Item 0', 'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'];

export default class App extends Component {
    state = { items }
    onDrop = ({oldIndex, newIndex}) => {
        console.log('onDrop');
        this.setState({items: move(this.state.items,oldIndex,newIndex)})
    }
    // move = ({ oldIndex, newIndex }) => this.setState(actions.move(oldIndex, newIndex));
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
