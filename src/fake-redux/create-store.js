// store 作為 redux 唯一的數據管理中心, 可以理解為觀察者模式 + 單例模式的實作, 他具有4個功能

// 1. currentState => 保存整個全域的 state (單例模式)
// 2. getState => 提供給外部一個唯讀 currentState 接口 (單例模式)
// 3. dispatch =>  提供給外部要修改 currentState 的唯一方法, 同時也是 store 推送通知給其他訂閱者的方法 (觀察者模式)
// 4. subscribe => 保存紀錄監聽的函數, 一旦發生 dispatch 就推送給這些人 (发布订阅)

const createStore = function (reducer, storeEnhancer) {
    // 檢查如果有增強的中間件, 會回傳並且先執行它, 將 store 跟 reducer 掛入
    if (storeEnhancer) {
        return storeEnhancer(createStore)(reducer);
    }

    //整個全域的 state
    let currentState;

    //紀錄監聽的函數
    let listeners = [];

    const getState = function () {
        return currentState;
    };

    // currentState 的唯一方法, 規則是 1. 必須是一個 object 2. object 必須有的 actionType, 例如: 'INCREASE'
    const dispatch = function (action) {
        if (typeof action !== 'object' || action === null || action === undefined) {
            throw new Error('Actions must be plain objects');
        }

        currentState = reducer(currentState, action);
        // 執行訂閱的函數
        for (let i = 0; i < listeners.length; i++) {
            listeners[i]();
        }
    };

    const subscribe = function (listener) {
        listeners.push(listener);

        // 取消訂閱
        return () => {
            let index = listeners.findIndex(listener);
            listeners.splice(index, 1);
        };
    };

    return {
        getState,
        dispatch,
        subscribe
    };
};

export {
    createStore
};
