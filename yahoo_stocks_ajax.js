// JQUERY WAIT FOR THE DOM
$(document).ready(function(){
	$(".yahoo-form").submit(function(){
		// Stop the form from submitting (default)
		event.preventDefault();
		// target everything with a target id and get its val what the user typed
		var symbol = $("#symbol").val();
		console.log(symbol);

		// dynamically build the URL to use the sysmbols the user input
		// Template literals ${symbol}
		var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("'+symbol+'")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json'
		console.dir(url);

		// AJAX request Tell JavaScript to getJSON, param1 = where to go
		// param2 = what to do is the anonymous function
		$.getJSON(url,function(data){
			// tagret the object in the object of the object and assign it
			var stockInfo = data.query.results.quote;
			if(stockInfo.Change.indexOf("+") > -1){
				var classChange = "success";
			}
			else{
				var classChange = "danger";
			}
			var newHTML = "";
			newHTML += '<tr>';
				newHTML += '<td>'+stockInfo.Symbol+'</td>';
				newHTML += '<td>'+stockInfo.Name+'</td>';
				newHTML += '<td>'+stockInfo.Ask+'</td>';
				newHTML += '<td>'+stockInfo.Bid+'</td>';
				newHTML += '<td class="'+classChange+'">'+stockInfo.Change+'</td>';
			newHTML += '</tr>';
			console.log(newHTML);
			$("#stock-body").html(newHTML);
			// console.log(data.query.results.quote);	
		});
		// console.log("Im Back");

	});
});

