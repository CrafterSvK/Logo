let editor;
let turtle;

function setup() {
	createCanvas(200, 200);
	angleMode(DEGREES);
	background(0);
	turtle = new Turtle(100, 100, 0);
	editor = select('#code');
	editor.input(goTurtle);
	goTurtle();
}

function goTurtle() {
	background(0);
	push();
	turtle.reset();
	let code = editor.value();
	
	/* This is pretty bad. 
	 * But it works somehow
	*/
	let tokens = code.match(/(repeat [0-9]+ \[.*\])|(pu)|(pd)|([a-z]+\ [0-9]+)/gi);

	if (tokens !== null) {
		for (let token of tokens) {
			if (token.includes('repeat')) {
				let repeats = token.match(/[0-9]+/)[0];

				for (let i = 1; i <= repeats; i++) {
					let values = token.match(/(pu)|(pd)|(([^repeat][a-z])+\ [0-9]+)/gi);
					
					for (let value of values) interpret(value);
				}
			} else {
				interpret(token);
			}
		}
	}
	pop();
}

function interpret(command) {
	let values = command.split(" ");
	commands[values[0]](values[1] !== null ? values[1] : null);
}