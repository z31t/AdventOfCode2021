const fs = require('fs')

function mapToIndex(values, index) {
	return values.reduce( (memo, item) => {
		memo[item[index]]=memo[item[index]]||[];
		memo[item[index]].push(item);
		return memo;
	}, {});
}

try {
	var data = fs.readFileSync('input.txt', 'utf8');
	console.log("input data read");
	data = data.split("\n").filter(line => line.length);
	var gamma = [];

	for (var i=0; i<data[0].length; i++) {
		var mostCommonBit = (data.map(a => a[i]).filter(a => a=="1").length / data.length > 0.5)? 1:0;
		gamma.push(mostCommonBit);
	}
	var epsilon = gamma.map(a => (a=="1")?"0":"1");
	
	gamma = gamma.join('');
	epsilon = epsilon.join('');
	
	gamma = parseInt(gamma, 2);
	epsilon = parseInt(epsilon, 2);
	
	console.log("gamma: " + gamma);
	console.log("epsilon: " + epsilon);
	
	var powerConsumption = gamma * epsilon ;
	
	console.log("power consumption: %d", powerConsumption);
	
	//~ PART 2
	console.log("\n\nPart2");
	
	var done=false;
	var values = data;
	var i=0;
	while(!done) {
		var split = mapToIndex(values, i);
		values = (split["0"].length > split["1"].length)? split["0"] : split["1"];
		if (values.length == 1) {
			done = true;
		}
		
		i++;
	}
	var oxygen = values[0];
	console.log("oxygen: %d", oxygen);
	
	
	done=false;
	values = data;
	i=0;
	while(!done) {
		var split = mapToIndex(values, i);
		values = (split["0"].length <= split["1"].length)? split["0"] : split["1"];
		if (values.length == 1) {
			done = true;
		}
		
		i++;
	}
	var co2 = values[0];
	console.log("co2: %d", co2);

	console.log("oxygen int: %d", parseInt(oxygen, 2));
	console.log("co2 int: %d", parseInt(co2, 2));
	
	var lifeSupportRating = parseInt(oxygen, 2) * parseInt(co2, 2);
	console.log("life support rating: %d", lifeSupportRating);
	
} catch (err) {
	console.error(err);
}
