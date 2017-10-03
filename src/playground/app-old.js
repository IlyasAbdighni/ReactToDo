var user = {
    name: "ilyas",
    age: 27,
    location: ''
};

function getLocation(location) {
    if (location){
        return location;
    }
    return "Unknown";
}

let count = 0;

const plusOne = () => {
    count++;
    renderCounterApp();
}

const minusOne = () => {
    count--;
    renderCounterApp();
}

const reset = () => {
    count = 0 ;
    renderCounterApp();
}

const app ={
    title: "Indecision app",
    subtitle: "Put your life in the hands of a computer",
    options: ["one", "two"]
};

const removeAll = () => {
    app.options = [];
    render();
}

const onMakeDecision = () => {
    // Math.random generate random numbers between 0 and 1
    const randomNum = Math.floor(Math.random() * app.options.length); 
    const option = app.options[randomNum]
    console.log(option);
    
}

const onFormSubmit = e => {
    e.preventDefault();
    const option = e.target.elements.option.value;

    if(option) {
        app.options.push(option);
        e.target.elements.option.value = '';
        render();
    }

};

const appRoot = document.getElementById('root');

const render = () => {
    var template = (
        <div>
            <h1>{app.title && app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? "Here are your optiosn ": "NO options"}</p>
            <p>{app.options.length}</p>
            <button disabled={app.options.length === 0} onClick={onMakeDecision} >What should I do?</button>
            <button onClick={removeAll} >Remove all</button>
            <ol>
               {
                    app.options.map((option, index) => <li key={index}>{option}</li>)
               }
            </ol>
            <form onSubmit={onFormSubmit} >
                <input type="text" name="option" />
                <button>Add options</button>
            </form>
        </div>
    );
    ReactDOM.render(template, document.getElementById('root'));

};

render();

// const renderCounterApp = () => {
//     var template = (
//         <div>
//             <h1>Count: {count}</h1>
//             <button onClick={plusOne}>+1</button>
//             <button onClick={minusOne} >-1</button>
//             <button onClick={reset} >reset</button>
//         </div>
//     );
    
//     ReactDOM.render(template, document.getElementById('root'));
// }

// renderCounterApp();