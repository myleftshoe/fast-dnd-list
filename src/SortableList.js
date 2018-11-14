import React from 'react'
import Sortable from './Sortable';

const items = ['Item 0', 'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']

export default function SortableList(props) {

    return <div className='list'>
        <Sortable dragClassName='drag-style'>
        {items.map(item =>
            <div key={item} className='list-item'>{item}</div>)
        }
        </Sortable>
    </div>

}
