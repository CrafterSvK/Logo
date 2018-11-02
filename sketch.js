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
	let code = editor.value().replace(/\s+/gmi, ' ');
	sanitize(code);
	pop();
}

function sanitize(code) {
	/*
	 * splits code into segments 
	 * repeat command | pu | pd | command with random | command | color | special commands
	*/
	let tokens = code.match(
		/(repeat (random \d+|\d+) \[.*\])|(pu)|(pd)|(color ((random \d+ )|\d+ ){2}((random \d+)|\d+))|(\w+\ random\ \d+)|([a-z]+\ \d+)|([a-z]+ [a-z]+)/gi
	);

	console.log(tokens);
	//Solves reccursion by counting brackets
	let rtokens = new Array();
	
	if (tokens !== null) for (let token of tokens) {
		if (token.match(/^(repeat)/) !== null) {
			let bracket_pair = 0;
			let i;

			for (i = 0; i < token.length; i++) {
				if (token.charAt(i) === '[') {
					bracket_pair++;
				} else if (token.charAt(i) === ']') {
					bracket_pair--;

					if (bracket_pair === 0)	break;
				}
			}

			let first = token.substring(0, i + 1);
			rtokens.push(first);

			if (first.length < token.length) {
				let second = token.substring(i + 1).trim();
				rtokens.push(second);
			}

		} else {
			rtokens.push(token);
		}
	}

	//interpret sanitized output
	if (rtokens !== null) for (let token of rtokens) interpret(token);
}

function interpret(command) {
	if (command.includes('repeat')) {
		//Error handling
		let requirements = ['[', ']'];
		if (checkError(command, requirements)) return;

		//get number of repeats
		let repeats = command.match(/\d+/m)[0];

		if (command.match(/^repeat random \d+/i)) {
			let number = command.match(/\d+/)[0];

			let repeats = Math.floor(random(number));
		}
		
		//repeat code in brackets (Lookbehind not supported in JS) -> /(?<=\[).*(?=\])/
		for (let i = 1; i <= repeats; i++) 
			sanitize(command.match(/(?=\[).*(?=\])/i)[0].substring(1)); 
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