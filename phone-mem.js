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

// num: is the original numbers
// statenum: the initial state of all the numbers ie [0,0,0] for 929 would correspond to WAW
function get_letters(num, statenum) {
	var word = "";
	for( var i = 0; i<num.length; i++ ){
		word += o[ num[i] ][ statenum[i] ];
	}
	return word;
}


function process(phone_number) {
	var words = [];
	var nWords = 0;
	var initial_state = [];
	var max_state = [];
	var possible_states = [];
	var ps_c = 0;
	for( var i = 0; i<phone_number.length; i++ ){
		initial_state[i] = 0;
		max_state[i] = o[phone_number[i]].length;
	}
	//console.log("Initial State: "+initial_state);
	//console.log("Max State: "+max_state);
	
	// Can be optimized, currently a recursive solution
	function process_helper(num_state, index) {
		if( num_state[index+1] == null ) {
			// Get all the states
			var states = [];
			for( var i = 0; i<max_state[index]; i++){
				var state = new Array();
				// Copy the num_state
				for( var k = 0; k<initial_state.length; k++){
					state[k] = initial_state[k];
				}
				
				state[index] = i;
				//console.log("-> Pushing " + state);
				states.push(state);
			}
			//console.log("--> Returning: " + states);
			return states;
		} else {
			var prev_states = process_helper(num_state, index+1);
			var states = [];
			for( var j = 0; j<prev_states.length; j++){
				var state = new Array();
				for( var k = 0; k<prev_states[j].length; k++){
					state[k] = prev_states[j][k];
				}
				for( var i = 0; i<max_state[index]; i++){
					var state_copy = [];
					for( var k = 0; k<prev_states[j].length; k++){
						state_copy[k] = state[k];
					}
					state_copy[index] = i;
					states.push(state_copy);
					//console.log("-> Pushing " + state_copy);
				}
			}
			//console.log("--> Returning: " + states + " ("+states.length+") ");
			return states;
		}
	}
	var allStates = process_helper(initial_state, 0);
	for( var i = 0, c=allStates.length; i<c; i++ ){
		words[nWords] = get_letters(phone_number, allStates[i]);
		nWords++;
	}
	
	//console.log("Final: "+allStates);
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
	results.innerHTML = lines.join(',').replace(/\,/g, '\n') + "\n\nTotal: "+lines.length;
}

function init() {
	var input = document.getElementById("input");
	input.onkeypress = run;
}