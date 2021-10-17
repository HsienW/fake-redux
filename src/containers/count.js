import React from 'react';
import {store} from './countReducer';
import {fakeThunk} from '../fake-redux-thunk/thunk';

export class Count extends React.Component {
    constructor() {
        super();
        this.increase = this.increase.bind(this);
        this.decrease = this.decrease.bind(this);
        this.asyncIncrease = this.asyncIncrease.bind(this);
    }

    // 初步假設在 DidMount 就註冊一個用來監聽 state 的函數
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

    asyncIncrease() {
        let creator = () => {
            console.log('進來到函數本身');
            return doAsync;
        };

        let doAsync = () => {
            store.dispatch({type: 'start'});
            setTimeout(() => {
                store.dispatch({type: 'increase'});
            }, 2000);
        };

        fakeThunk(store)(creator)(doAsync);
    }

    render() {
        return (
            <div>
                <h3>Count</h3>
                <p>{store.getState()}</p>
                <button onClick={this.asyncIncrease}>increase</button>
                <button onClick={this.decrease} style={{margin: '50px'}}>
                    decrease
                </button>
            </div>
        );
    }
}
