const view = m => {
    const minutes = Math.floor(m.time / 60);
    const seconds = m.time - minutes * 60;
    const minutesFormatted = `${minutes > 0 ? "0" : ""}${minutes}`;
    const secondsFormatted = `${seconds > 0 ? "0" : ""}${seconds}`;

    const handler = () => {
        container.dispatch(m.running ? 'STOP' : 'START');
    };

    const reset = () => {
        container.dispatch('RESET');
    }

    return (
        <div>
            <p>{minutesFormatted}:{seconds > 10 ? seconds : "0" + seconds}</p>
            <button onClick={handler}>{m.running ? "STOP" : "START"}</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
};

const update = (model = { running: false, time: 0 }, action) => {
    switch (action) {
        case "TICK":
            return Object.assign({}, model, {
                time: model.time + (model.running ? 1 : 0)
            });
        case "START":
            return Object.assign({}, model, {
                running: true
            });
        case "STOP":
            return Object.assign({}, model, {
                running: false
            });
        case "RESET":
            return Object.assign({}, model, {
                time: 0,
                running: false
            });
    }
};

const createStore = reducer => {
    let internalState;
    let handlers = [];
    return {
        dispatch: (action) => {
            internalState = reducer(internalState, action);
            handlers.map(handler => handler());
        },
        subscribe: (handler) => {
            handlers.push(handler);
        },
        getState: () => internalState,
    }
};

let container = createStore(update);

const render = () => {
    ReactDOM.render(
        view(container.getState()), 
        document.getElementById("root")
    );
};

container.subscribe(render);

setInterval(() => {
    container.dispatch('TICK');
}, 1000);
