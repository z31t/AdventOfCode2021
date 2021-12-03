const fs = require('fs')

var values = {
	depth: 0,
	horizontal: 0
}
try {
	const data = fs.readFileSync('input.txt', 'utf8');
	console.log("input data read");
	data.split("\n").forEach(command => {
		if (command.length==0) {
			return;
		}
		var commandParts = command.split(" ");

		if (commandParts[0] == "forward") {
			values.horizontal += parseInt(commandParts[1]);
			return;
		}
		if (commandParts[0] == "down") {
			values.depth += parseInt(commandParts[1]);
			return;
		}
		if (commandParts[0] == "up") {
			values.depth -= parseInt(commandParts[1]);
			if (values.depth<0) {
				console.log("Captain, we are flying!");
			}
		} 
	});
	
	
	console.log("Depth: " + values.depth);
	console.log("Horizontal: " + values.horizontal);
	console.log("Multiplied: " + (values.horizontal * values.depth));
	
	//~ PART 2
	console.log("\n\nPart2");
	values = {
		depth: 0,
		horizontal: 0,
		aim: 0
	}
	
	data.split("\n").forEach(command => {
		if (command.length==0) {
			return;
		}
		var commandParts = command.split(" ");

		if (commandParts[0] == "forward") {
			values.horizontal += parseInt(commandParts[1]);
			values.depth += values.aim * parseInt(commandParts[1]);
			return;
		}
		if (commandParts[0] == "down") {
			values.aim += parseInt(commandParts[1]);
			return;
		}
		if (commandParts[0] == "up") {
			values.aim -= parseInt(commandParts[1]);
			if (values.depth<0) {
				console.log("Captain, we are flying!");
			}
		} 
	});
	console.log("Depth: " + values.depth);
	console.log("Horizontal: " + values.horizontal);
	console.log("Multiplied: " + (values.horizontal * values.depth));
	
	
} catch (err) {
	console.error(err);
}
