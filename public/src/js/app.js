'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
	_inherits(IndecisionApp, _React$Component);

	function IndecisionApp(props) {
		_classCallCheck(this, IndecisionApp);

		var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

		_this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
		_this.handlePick = _this.handlePick.bind(_this);
		_this.handleAddOption = _this.handleAddOption.bind(_this);
		_this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
		_this.state = {
			options: []
		};
		return _this;
	}

	_createClass(IndecisionApp, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			try {
				var json = localStorage.getItem('options');
				var options = JSON.parse(json);
				if (options) {
					this.setState(function () {
						return { options: options };
					});
				}
			} catch (error) {}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			if (prevState.options.length !== this.state.options.length) {
				var json = JSON.stringify(this.state.options);
				localStorage.setItem('options', json);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			console.log('====================================');
			console.log('Component will unmount');
			console.log('====================================');
		}
	}, {
		key: 'handleDeleteOptions',
		value: function handleDeleteOptions() {
			this.setState(function () {
				return { options: [] };
			});
		}
	}, {
		key: 'handlePick',
		value: function handlePick() {
			var randomNum = Math.floor(Math.random * this.state.options.length);
			var option = this.state.options[randomNum];
		}
	}, {
		key: 'handleAddOption',
		value: function handleAddOption(option) {
			var _this2 = this;

			if (!option) {
				return 'Enter valid value to add item';
			} else if (this.state.options.indexOf(option) > -1) {
				return 'This option already exists';
			}
			this.setState(function (prevState) {
				return {
					options: _this2.state.options.concat([option])
				};
			});
		}
	}, {
		key: 'handleDeleteOption',
		value: function handleDeleteOption(optionToRemove) {
			this.setState(function (prevState) {
				return {
					options: prevState.options.filter(function (option) {
						return optionToRemove !== option;
					})
				};
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var title = 'Indecision';
			return React.createElement(
				'div',
				null,
				React.createElement(
					'h1',
					null,
					'Title'
				),
				React.createElement(Header, null),
				React.createElement(Action, {
					hasOptions: this.state.options.length > 0,
					handlePick: this.handlePick
				}),
				React.createElement(Options, {
					options: this.state.options,
					handleDeleteOptions: this.handleDeleteOptions,
					handleDeleteOption: this.handleDeleteOption
				}),
				React.createElement(AddOption, {
					handleAddOption: this.handleAddOption
				})
			);
		}
	}]);

	return IndecisionApp;
}(React.Component);

var Header = function Header(props) {
	return React.createElement(
		'div',
		null,
		React.createElement(
			'h1',
			null,
			props.title
		)
	);
};

Header.defaultProps = {
	title: 'Indecision'
};

var Action = function (_React$Component2) {
	_inherits(Action, _React$Component2);

	function Action() {
		_classCallCheck(this, Action);

		return _possibleConstructorReturn(this, (Action.__proto__ || Object.getPrototypeOf(Action)).apply(this, arguments));
	}

	_createClass(Action, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'button',
					{
						onClick: this.handlePick,
						disabled: !this.props.hasOptions
					},
					'What should I do?'
				)
			);
		}
	}]);

	return Action;
}(React.Component);

var Options = function Options(props) {
	return React.createElement(
		'div',
		null,
		props.options.length === 0 && React.createElement(
			'p',
			null,
			'Please add an option to get started'
		),
		React.createElement(
			'button',
			{
				onClick: props.handleDeleteOptions,
				disabled: !props.options.length > 0 },
			'Remove all'
		),
		React.createElement(
			'ul',
			null,
			props.options.map(function (option) {
				return React.createElement(Option, { handleDeleteOption: props.handleDeleteOption, option: option });
			})
		)
	);
};

var Option = function (_React$Component3) {
	_inherits(Option, _React$Component3);

	function Option() {
		_classCallCheck(this, Option);

		return _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).apply(this, arguments));
	}

	_createClass(Option, [{
		key: 'render',
		value: function render() {
			var _this5 = this;

			return React.createElement(
				'li',
				null,
				this.props.option,
				React.createElement(
					'button',
					{
						onClick: function onClick(e) {
							_this5.props.handleDeleteOption(_this5.props.option);
						}
					},
					'Remove'
				)
			);
		}
	}]);

	return Option;
}(React.Component);

var AddOption = function (_React$Component4) {
	_inherits(AddOption, _React$Component4);

	function AddOption(props) {
		_classCallCheck(this, AddOption);

		var _this6 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

		_this6.onSubmitForm = _this6.onSubmitForm.bind(_this6);
		_this6.state = {
			error: null
		};
		return _this6;
	}

	_createClass(AddOption, [{
		key: 'onSubmitForm',
		value: function onSubmitForm(e) {
			e.preventDefault();
			var option = e.target.elements.option.value.trim();
			var error = this.props.handleAddOption(option);

			this.setState(function () {
				return { error: error };
			});
			if (!error) {
				e.target.elements.option.value = "";
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				this.state.error && React.createElement(
					'p',
					null,
					this.state.error
				),
				React.createElement(
					'form',
					{ onSubmit: this.onSubmitForm },
					React.createElement('input', { type: 'text', name: 'option' }),
					React.createElement(
						'button',
						null,
						'Add option'
					)
				)
			);
		}
	}]);

	return AddOption;
}(React.Component);

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
