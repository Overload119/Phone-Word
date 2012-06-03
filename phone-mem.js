var o = {
	'0': [ '0' ],
	'1': [ '1' ],
	'2': ['A','B','C'],
	'3': ['D','E','F'],
	'4': ['G', 'H', 'I'],
	'5': ['J', 'K', 'L'],
	'6': ['M', 'N', 'O'],
	'7': ['P', 'Q', 'R', 'S'],
	'8': ['T', 'U', 'V'],
	'9': ['W', 'X', 'Y', 'Z']
};

function convert_to_letters(numbers) {
	var letters = "";
	for( var i = 0; i<numbers.length; i++ ){
		letters += o[ numbers[i] ][0];
	}
	return letters;
}

// The number of combinations it is supposed to find is:
// ([ size of array for number at index 1 ] choose 1)([ size of array for number at index 2 ] choose 1) ... ([ size of array for number at index i ] choose 1) for 0 < i < inf.
// IE. For number 929 we have
// (4 choose 1)(3 choose 1)(4 choose 1) = 48 combinations
// or For number 92 we have
// (4 choose 1)(3 choose 1) = 12 combinations
function process(phone_number) {
	var words = [];
	var nWords = 0;
	
	function process_helper(num, index) {
		var temp_num = num[index];
		var states_for_num = o[ temp_num ];
		
		for( var i = 0; i<states_for_num.length; i++ ) {
			var beforeWord = convert_to_letters(num.substring(0, index));
			var afterWord = convert_to_letters(num.substring(index+1));
			var letter = states_for_num[i];
			words[nWords] = beforeWord + letter + afterWord;
			nWords++;
		}
	}
	
	for( var i = 0; i<phone_number.length; i++ ){
		process_helper(phone_number, i);
	}
	
	output( words );
}

function run(event) {
	if( event.keyCode == 13 ) {
		// Sanitize everything except numbers
		var r = RegExp("[^0-9]", 'g')
		var phone_number = document.getElementById("input").value;
		phone_number = phone_number.replace(r, "");
		document.getElementById("input").value = "";
		process(phone_number);
	}
}

function output (lines) {
	var results = document.getElementById("results");
	results.innerHTML = lines.join(',').replace(/\,/g, '\n');
}

function init() {
	var input = document.getElementById("input");
	input.onkeypress = run;
}