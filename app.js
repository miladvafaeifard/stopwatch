const view = m => {
    const minutes = Math.floor(m.time / 60);
    const seconds = m.time - minutes * 60;
    const minutesFormatted = `${minutes > 0 ? "0" : ""}${minutes}`;
    const secondsFormatted = `${seconds > 0 ? "0" : ""}${seconds}`;

    const handler = () => {
        container.dispatch(m.running ? {type: 'STOP'} : {type: 'START'});
    };

    const reset = () => {
        container.dispatch({type: 'RESET'});
    }

    return (
        <div>
            <p>{minutesFormatted}:{seconds > 10 ? seconds : "0" + seconds}</p>
            <button onClick={handler}>{m.running ? "STOP" : "START"}</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
};

const update = (model = { running: false, time: 0 }, action = {type: ''}) => {
    switch (action.type) {
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
        default:
            return model;
    }
};

let container = Redux.createStore(update);

const render = () => {
    ReactDOM.render(
        view(container.getState()), 
        document.getElementById("root")
    );
};

container.subscribe(render);

setInterval(() => {
    container.dispatch({type: 'TICK'});
}, 1000);
