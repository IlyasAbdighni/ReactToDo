class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
		this.handlePick = this.handlePick.bind(this);
		this.handleAddOption = this.handleAddOption.bind(this);
		this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: []
        }
	}
	componentDidMount() {
		try {
			const json = localStorage.getItem('options');
			const options = JSON.parse(json);
			if (options) {
				this.setState(()=>({options}));
			}
		} catch (error) {
			
		}
		
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.options.length !== this.state.options.length) {
			const json = JSON.stringify(this.state.options);
			localStorage.setItem('options', json);
		}
		
	}
	componentWillUnmount() {
		console.log('====================================');
		console.log('Component will unmount');
		console.log('====================================');
	}
    handleDeleteOptions() {
		this.setState(() => ({ options: []}));
    }
    handlePick() {
		const randomNum = Math.floor(Math.random * this. state.options.length);
		const option = this.state.options[randomNum];

	}
	handleAddOption(option) {
		if(!option) {
			return 'Enter valid value to add item'
		} else if(this.state.options.indexOf(option) > -1) {
			return 'This option already exists';
		}
		this.setState(prevState => {
			return {
				options: this.state.options.concat([option])
			};
		});
	}
	handleDeleteOption(optionToRemove) {
		this.setState((prevState) => {
			return {
				options: prevState.options.filter((option) => {
					return optionToRemove !== option;
				})
			};
		});
	}
    render () {
        const title = 'Indecision';
        return (
            <div>
                <h1>Title</h1>
                <Header />
                <Action 
					hasOptions={this.state.options.length > 0} 
					handlePick={this.handlePick}
				/>
                <Options 
                    options={this.state.options} 
                    handleDeleteOptions={this.handleDeleteOptions}
					handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption 
					handleAddOption={this.handleAddOption}
				/>
            </div> 
        );
    }
}

const Header = (props) => {
	return (
		<div>
			<h1>{props.title}</h1>
		</div>
	);
}

Header.defaultProps = {
	title: 'Indecision'
};

class Action extends React.Component {
    render() {
        return (
            <div>
                <button 
                    onClick={this.handlePick} 
                    disabled={!this.props.hasOptions}
                >What should I do?</button>
            </div>
        );
    }
}

const Options = (props) => {
	return (
		<div>
		{props.options.length === 0 && <p>Please add an option to get started</p>}
			<button 
				onClick={props.handleDeleteOptions} 
				disabled={!props.options.length > 0} >
					Remove all
			</button>
			<ul>
				{props.options.map(option => (
					<Option handleDeleteOption={props.handleDeleteOption} option={option} />
				))}
			</ul>
		</div>
	);	
}

class Option extends React.Component {
    render () {
        return (
            <li>
                {this.props.option}
				<button 
					onClick={(e) => {
						this.props.handleDeleteOption(this.props.option)
					}} 
				>Remove</button>
            </li>
        );
    }
}

class AddOption extends React.Component {
	constructor(props){
		super(props);
		this.onSubmitForm = this.onSubmitForm.bind(this);
		this.state = {
			error: null
		};
	}

    onSubmitForm(e) {
        e.preventDefault();
		const option = e.target.elements.option.value.trim();
		const error = this.props.handleAddOption(option);

		this.setState(() => ({error}));
		if (!error) {
			e.target.elements.option.value = "";
		}
        
    }

    render () {
        return (
            <div>
				{this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmitForm} >
                    <input type="text" name="option" />
                    <button>Add option</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));