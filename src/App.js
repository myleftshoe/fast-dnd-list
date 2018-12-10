import React, { useState } from 'react';
import './App.css';
import Sortable from './Sortable';
import { multiMove } from './array';

const generateItems = length => [...Array(length).keys()].map(k => `Item ${k}`)

export default function App() {

    let [items, setItems] = useState(generateItems(18));

    const onDrop = ({ indexes, toIndex }) => setItems(multiMove(items, indexes, toIndex));

    return <div className='list'>
        <Sortable dragClassName='drag-style' onDrop={onDrop}>
            {items.map(item =>
                <div key={item} className='list-item' style={{ height: item === 'Item 2' ? '70px' : item === 'Item 4' && '100px' }}>{item}</div>)
            }
        </Sortable>
    </div>
}
