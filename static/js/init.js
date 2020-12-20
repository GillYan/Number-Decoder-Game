
var code = ["-", "-", "-"]; //global array to hold the user entered code
var length = 0;
var numAttempts = 1;

$(document).ready(function () {
	console.log("Gillian Sanchez, 1003184");

	//function to get the evidences that have been checked
	function update(num) {
		//add the selected number to the next position
		var newNum = num.value;
		code[length] = newNum;
		length++;
        num.disabled = true; //disable the button that was pressed
		
        //display the user entered code in real time
		document.getElementById('code').innerHTML = code[0] + " " + code[1] + " " + code[2];

		if (length == 3) {
			//disable more selection
			disableAll();

			//compare the code and return results
			$.ajax({
            	url: '/compareCode',
            	type: 'POST',
            	contentType: 'application/json',
            	dataType: 'json',
            	data: JSON.stringify(code),
            	success: function(data){
                    //if no numbers were correct display an x else display results
                	if (data.circle == 0 && data.triangle == 0) {
                        document.getElementById('result').innerHTML = "✖"
                    }
                    else {
                	   document.getElementById('result').innerHTML = "⬤ = " + data.circle + " ▲ = " + data.triangle;
                    }

                    //correct code found
                    if (data.circle == 3) {
                        document.getElementById('tries').innerHTML = "Succeeded in " + numAttempts + " tries"
                    }
            	}
        	});
		}
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
	code = ["-", "-", "-"];
	length = 0;
    numAttempts++;
	document.getElementById('code').innerHTML = "- - -";
}

function reset() {
    numAttempts = 1;
    retry();
    document.getElementById('result').innerHTML = "⬤ ▲";
	//compare the code and return results
	$.ajax({
        url: '/newCode',
        type: 'POST',
        success: function(data){
            console.log(data);
        }
    });
}

function disableAll() {
	$(':button').prop('disabled', true); // Disables all buttons
	document.getElementById('retry').disabled = false;
    document.getElementById('reset').disabled = false;
}

//generate a code on page load
$("#reset").click()