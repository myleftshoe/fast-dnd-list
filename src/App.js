import React, { useState } from 'react';
import './App.css';
import Sortable from './Sortable';
import { move } from './array';

const generateItems = length => [...Array(length).keys()].map(k => `Item ${k}`)

export default function App() {

    let [items, setItems] = useState(generateItems(80));

    const onDrop = ({ oldIndex, newIndex }) => setItems(move(items, oldIndex, newIndex));

    return <div className='list'>
        <Sortable dragClassName='drag-style' onDrop={onDrop}>
            {items.map(item =>
                <div key={item} className='list-item' style={{ height: item === 'Item 5' ? '70px' : item === 'Item 9' && '100px' }}>{item}</div>)
            }
        </Sortable>
    </div>
}
