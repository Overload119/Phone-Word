var NUMBER_LETTER_MAP = {
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

// The number of combinations it is supposed to find is:
// ([ size of array for number at index 1 ] choose 1)([ size of array for number at index 2 ] choose 1) ... ([ size of array for number at index i ] choose 1) for 0 < i < inf.
// IE. For number 929 we have
// (4 choose 1)(3 choose 1)(4 choose 1) = 48 combinations
// or For number 92 we have
// (4 choose 1)(3 choose 1) = 12 combinations

// num: is the original numbers
// statenum: the initial state of all the numbers ie [0,0,0] for 929 would correspond to WAW
function get_letters(num, statenum) {
	var word = "";
	for( var i = 0; i<num.length; i++ ){
		word += o[ num[i] ][ statenum[i] ];
	}
	return word;
}

// @number (Int) -> @Array
function process(number) {
  number = number.toString();
  var numberArray = [];
  for( var i = 0; i < number.length; i++ ) {
    numberArray.push(NUMBER_LETTER_MAP[number[i]])
  }
  var result = [];
  function process_helper(array, set) {
    if( array.length === 1 ) {
      for(var i = 0; i < array[0].length; i++) {
        result.push( set.concat( [ array[0][i] ] ) );
      }
    } else {
      var letterSet = array[0];
      var subset = array.slice(1);
      for(var i = 0; i < letterSet.length; i++) {
        helper(subset, set.concat([letterSet[i]]));
      }
    }
  }
  process_helper(numberArray, []);
  return result;
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
	results.innerHTML = lines.join(',').replace(/\,/g, '    ') + "\n\nTotal: "+lines.length;
}

function init() {
	var input = document.getElementById("input");
	input.onkeypress = run;
}
