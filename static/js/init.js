
var code = ["X", "X", "X"]; //global array to hold the user entered code
var length = 0;

$(document).ready(function () {
	console.log("Gillian Sanchez, 1003184");

	//function to get the evidences that have been checked
	function update(num) {
		var newNum = num.value;
		code[length] = newNum;
		length++;
		console.log(code);

		$.ajax({
            url: '/compareCode',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(code),
            success: function(data){
                document.getElementById('code').innerHTML = code[0] + " " + code[1] + " " + code[2];
                num.disabled = true; //disable the button that was pressed

                //if max code length disable all buttons
                if (length == 3) {
					disableAll();
				}
            }
        });
	}

	//event listeners
	n1 = document.getElementById('n1');
		n1.onclick = function() {update(n1)};
	n2 = document.getElementById('n2');
		n2.onclick = function() {update(n2)};
	n3 = document.getElementById('n3');
		n3.onclick = function() {update(n3)};
	n4 = document.getElementById('n4');
		n4.onclick = function() {update(n4)};
	n5 = document.getElementById('n5');
		n5.onclick = function() {update(n5)};
	n6 = document.getElementById('n6');
		n6.onclick = function() {update(n6)};
	n7 = document.getElementById('n7');
		n7.onclick = function() {update(n7)};
	n8 = document.getElementById('n8');
		n8.onclick = function() {update(n8)};
	n9 = document.getElementById('n9');
		n9.onclick = function() {update(n9)};
});

function retry() {
	$(':button').prop('disabled', false); // Enables all buttons
	code = ["X", "X", "X"];
	length = 0;
	document.getElementById('code').innerHTML = "X X X";
}

function disableAll() {
	$(':button').prop('disabled', true); // Disables all buttons
	document.getElementById('retry').disabled = false;
}

