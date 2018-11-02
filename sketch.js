let editor;
let turtle;

function setup() {
	createCanvas(200, 200);
	angleMode(DEGREES);
	background(0);
	turtle = new Turtle(100, 100, 0, 'white');
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
	/*
	 * splits code into segments 
	 * repeat command | pu | pd | command with random | command | color | special commands
	*/
	let tokens = code.match(
		/(repeat (random \d+|\d+) \[.*\])|(pu)|(pd)|(color ((random \d+ )|\d+ ){2}((random \d+)|\d+))|(\w+\ random\ \d+)|([a-z]+\ \d+)|([a-z]+ [a-z]+)/gi
	);

	if (tokens !== null) for (let token of tokens) interpret(token);
}

function interpret(command) {
	if (command.includes('repeat')) {
		//Error handling
		let requirements = ['[', ']'];
		if (checkError(command, requirements)) return;

		//get number of repeats
		let repeats = command.match(/\d+/)[0];

		if (command.match(/^repeat random \d+/)) {
			let number = command.match(/\d+/)[0];

			let repeats = Math.floor(random(number));
		}
		
		//repeat code in brackets (Lookbehind not supported in JS) -> /(?<=\[).*(?=\])/
		for (let i = 1; i <= repeats; i++) 
			start(command.match(/(?=\[).*(?=\])/)[0].substring(1)); 
	} else {
		let com = command;

		if (com.includes('random')) {
			let randoms = command.match(/(random \d+)/gi);

			for (let ran of randoms) {
				let val = ran.split(' ');
				let number = Math.floor(random(val[1]));

				com = com.replace(new RegExp(ran), number);
			}
		}
		
		let values = com.split(' ');

		//interpret the basic commands
		commands[values[0]](
			values[1] !== null ? values[1] : null,
			values[2] !== null ? values[2] : null,
			values[3] !== null ? values[3] : null
			);
	}
}

//Simple not very useful error checking
function checkError(command, characters) {
	for (let char of characters) {
		if (!command.includes(char)) {
			console.error(`Missing '${char}' in '${command}'!`);

			return true;
		}
	}

	return false;
}