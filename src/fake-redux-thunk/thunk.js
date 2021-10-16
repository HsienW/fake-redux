const thunk = function (store, action) {

    console.log('接到');
    console.log(store);
    console.log(action);

    // 取出當前的 dispatch
    let next = store.dispatch;
    // 如果傳入的 action 是一個 function 我們就執行它
    if (typeof action === 'function') {
        return action();
    }
    // 如果 action 是一個物件就直接往下傳遞
    next(action);
};

export {
    thunk
};
