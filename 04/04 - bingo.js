const fs = require('fs')

try {
	console.log();
	var data = fs.readFileSync(require('path').dirname(require.main.filename)+'/input.txt', 'utf8');
	doBingo(data);

	//~ PART 2
	console.log("\n\nPart2");

} catch (err) {
	console.error(err);
}

function doBingo(data) {
	data = data.split("\n").filter(line => line.length);
	var chosenNumbers = null;
	var bingoField = [];
	var bingoList = [];
	data.forEach(line => {
		if (!chosenNumbers) {
			chosenNumbers = line.split(",");
			//chosenNumbers = chosenNumbers.slice(0,4);
			console.log(chosenNumbers);
			return;
		}
		bingoField.push(line.split(' ').filter(value => value.length).map(x => x.trim()));
		if (bingoField.length==5) {
			bingoList.push(bingoField);
			bingoField = [];
		}
	})
	//bingoList = [bingoList[0]];

	function checkWin(bingoList, lastChosenNumber) {
		var score = null;
		bingoList.forEach(bingo => {
			if (score != null) {
				return;
			}
			for (var i=0; i<5; i++) {
				var horizontalLine = [];
				var verticalLine = [];

				for (var j=0; j<5; j++) {
					verticalLine.push(bingo[i][j]);
					horizontalLine.push(bingo[j][i]);
				}
				if ((horizontalLine.filter(n => n=="X").length == 5) || (verticalLine.filter(n => n=="X").length == 5)) {
					console.log("winning bingo sheet:");
					console.log(bingo);
					score = lastChosenNumber * bingo.flatMap(b=>b).filter(n => n!="X").reduce( (memo, n) => memo + parseInt(n), 0);
					break;
				}
			}
		})
		return score;
	}

	function markChosenNumber(bingoList, chosenNumber) {
		var newBingoList = [];
		var newBingo = [];
		bingoList.forEach(bingo => {
			newBingo = [];
			bingo.forEach(line => {
				newBingo.push(line.map(n => (n == chosenNumber)?"X":n));
			});
			newBingoList.push(newBingo);
		});
		return newBingoList;
	}

	chosenNumbers.forEach(chosenNumber => {
		bingoList = markChosenNumber(bingoList, chosenNumber);
		var score = checkWin(bingoList, chosenNumber);
		if (score != null) {
			console.log("score: " + score);
			process.exit();
		}
	});

	bingoList.forEach(bingo => {
		console.log(bingo);
	});


}
