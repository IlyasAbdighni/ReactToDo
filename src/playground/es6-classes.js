class Person {
    constructor(name = 'Anonymous', age=0) {
		this.name = name;
		this.age = age;
    }
    getGreeting() {
		return `Hi, I am ${this.name}`;
	}
	getDescription() {
		return `${this.name} is ${this.age} year(s) old`;
	}
}

class Student extends Person {
	constructor(name, age, major = 'CS'){
		super(name, age);
		this.major = major;
	}

	hasMajor() {
		return !!this.major;
	}

	getDescription() {
		let description = super.getDescription();
		if(this.hasMajor){
			description += `. Theri major is ${this.major}`;
		}
	}
}

const me = new Student('ilyas');
console.log(me.getDescription());

