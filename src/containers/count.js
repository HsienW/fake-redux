import React from 'react';
import {store} from './countReducer';

export class Count extends React.Component {
    constructor() {
        super();
        this.increase = this.increase.bind(this);
        this.decrease = this.decrease.bind(this);
    }

    componentDidMount() {
        store.subscribe(() => {
            this.forceUpdate();
            //打印下store
            console.log('getState', store.getState());
        });
    }
    
    increase() {
        store.dispatch({type: 'increase'});
    }

    decrease() {
        store.dispatch({type: 'decrease'});
    }

    render() {
        return (
            <div>
                <h3>Count</h3>
                <p>{store.getState()}</p>
                <button onClick={this.increase}>increase</button>
                <button onClick={this.decrease} style={{margin: '50px'}}>
                    decrease
                </button>
            </div>
        );
    }
}
