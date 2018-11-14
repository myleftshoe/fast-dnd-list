import React, { Component } from 'react';
import './App.css';
import SortableList from './SortableList';

export default class App extends Component {
    render() {
        return <div className="App">
            <SortableList />
        </div>
    }
}
