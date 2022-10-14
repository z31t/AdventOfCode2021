const fs = require('fs')

try {
	var data = fs.readFileSync('input.txt', 'utf8');
	console.log("input data read");
	// data = data.split("\n").filter(line => line.length);
	var floor = 0;
	for (var i=0; i<data.length; i++) {
		if (data[i] == "(") floor++;
		if (data[i] == ")") floor--;

		// console.log(i + ": " + data[i] + ", floor is: " + floor);
	}
	
	console.log("floor: " + floor);

	//~ PART 2
	console.log("\n\nPart2");
	
	floor = 0;
	for (var i=0; i<data.length; i++) {
		if (data[i] == "(") floor++;
		if (data[i] == ")") floor--;

		// console.log(i + ": " + data[i] + ", floor is: " + floor);

		if (floor === -1) {
			console.log("hitting floor -1 at " + (i+1));
			process.exit();
		}
	}
		
} catch (err) {
	console.error(err);
}
