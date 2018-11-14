import React, { Component } from 'react';
import './App.css';
import Sortable from './Sortable';

const items = ['Item 0', 'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'];

export default class App extends Component {
    render() {
        return <div className='list'>
            <Sortable dragClassName='drag-style'>
            {items.map(item =>
                <div key={item} className='list-item'>{item}</div>)
            }
            </Sortable>
        </div>
    }
}
