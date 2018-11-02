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
	start(code);
	pop();
}

function start(code) {
	//splits code into segments
	let tokens = code.match(/(repeat (random \d+|\d+) \[.*\])|(pu)|(pd)|(\w+\ random\ \d+)|(\w+\ \d+)/gi);

	if (tokens !== null) for (let token of tokens) interpret(token);
}

function interpret(command) {
	if (command.includes('repeat')) {
		//get number of repeats
		let number = command.match(/\d+/)[0];
		let repeats = command.includes('random') ? random(number) : number; 
		
		//repeat code in brackets (Lookbehind not supported in JS) -> /(?<=\[).*(?=\])/
		for (let i = 1; i <= repeats; i++) 
			start(command.match(/(?=\[).*(?=\])/)[0].substring(1)); 
	} else {
		let values = command.split(" ");
		
		if (values[1].includes('random')) values[1] = random(values[2]);

		//interpret the basic commands
		console.log(values[0]);
		commands[values[0]](values[1] !== null ? values[1] : null);
	}
}