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

function run(event) {
	if( event.keyCode == 13 ) {
		// Sanitize everything except numbers
		var r = RegExp("[^0-9]", 'g')
		var phone_number = document.getElementById("input").value;
		phone_number = phone_number.replace(r, "");
		document.getElementById("input").value = "";
	}
	
	var words = [];
	var nWords = 0;
	
	output( words );
}

function output (lines) {
	var results = document.getElementById("results")
	results.innerHTML = lines.join(',').replace(',', '\n');
}

function init() {
	var input = document.getElementById("input")
	input.onkeypress = run
}