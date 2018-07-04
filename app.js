const mapStateToProps = state => state;
const mapDispatchToProps = (dispatch, props) => ({
    onStart: () => { dispatch({type: 'START'}); },
    onStop: () => { dispatch({type: 'STOP'}); },
    onReset: () => { dispatch({type: 'RESET'}); },
});

const Stopwatch = ReactRedux.connect(mapStateToProps, mapDispatchToProps)( props => {
    const minutes = Math.floor(props.time / 60);
    const seconds = props.time - minutes * 60;
    const minutesFormatted = `${minutes < 10 ? '0' : ''}${minutes}`;
    const secondsFormatted = `${seconds < 10 ? '0' : ''}${seconds}`;

    return (
        <div>
            <p>{minutesFormatted}:{secondsFormatted}</p>
            <button onClick={props.running? props.onStop : props.onStart}>{props.running ? 'STOP' : 'START'}</button>
            <button onClick={props.onReset}>Reset</button>
        </div>
    );
});

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


ReactDOM.render(
    <ReactRedux.Provider store={container}>
        <Stopwatch />
    </ReactRedux.Provider>,
    document.getElementById("root")
);

setInterval(() => {
    container.dispatch({type: 'TICK'});
}, 1000);
