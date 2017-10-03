import React from 'react';
import Header from './Header';
import AddOption from './AddOption';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
	state = {
		options: [],
		selectedOption: null
	};

	handleDeleteOptions = () => {
		this.setState(() => ({ options: []}));
    }
    handlePick = () => {
		const randomNum = Math.floor(Math.random() * this. state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() =>{
			return {
				selectedOption: option
			};
		});

	}
	handleAddOption = (option) => {
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
	handleDeleteOption = (optionToRemove) => {
		this.setState((prevState) => {
			return {
				options: prevState.options.filter((option) => {
					return optionToRemove !== option;
				})
			};
		});
	}
	handleModalClose = () => {
		console.log('ok');
		
		this.setState(() => ({selectedOption: null}));
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
    
    render () {
        const title = 'Indecision';
        return (
            <div>
                <Header title='ToDoApp' />
				<div className='container' >
					<Action 
						hasOptions={this.state.options.length > 0} 
						handlePick={this.handlePick}
					/>
					<div className='widget'>
						<Options 
							options={this.state.options} 
							handleDeleteOptions={this.handleDeleteOptions}
							handleDeleteOption={this.handleDeleteOption}
						/>
						<AddOption 
							handleAddOption={this.handleAddOption}
						/>	
					</div>
					
				</div>
                
				<OptionModal 
					selectedOption={this.state.selectedOption}
					handleModalClose={this.handleModalClose}
				/>
            </div> 
        );
    }
}