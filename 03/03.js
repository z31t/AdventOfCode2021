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
	
	function reduceValues(data, selectionFunction, index) {
		if (data.length == 1) {
			return data[0];
		}
		index = index || 0;
		
		var split = mapToIndex(data, index);
		return reduceValues(selectionFunction(split), selectionFunction, index+1);
	}
	
	var oxygen = reduceValues(data, map=>(map["0"].length > map["1"].length)? map["0"] : map["1"]);
	console.log("oxygen: %d", oxygen);
	
	var co2 = reduceValues(data, map=>(map["0"].length <= map["1"].length)? map["0"] : map["1"]);
	console.log("co2: %d", co2);

	console.log("oxygen int: %d", parseInt(oxygen, 2));
	console.log("co2 int: %d", parseInt(co2, 2));
	
	var lifeSupportRating = parseInt(oxygen, 2) * parseInt(co2, 2);
	console.log("life support rating: %d", lifeSupportRating);
	
} catch (err) {
	console.error(err);
}
