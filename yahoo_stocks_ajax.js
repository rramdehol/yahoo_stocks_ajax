// console.log("Test");

// WAIT FOR THE DOM!!!
$(document).ready(function(){
	// ARROW 1 BUTTON
	$("#arrow-1").click(function(){
		console.log("hit arrow 1")
		$("#page-1, #page-2").animate({
			"right":"100vw"
		},100);
	});
	// ARROW 2 BUTTON
	$("#arrow-2").click(function(){
		console.log("hit arrow 2")
		$("#page-1, #page-2").animate({
			"right":"0vw"
		},100);  
	});
	// SAVE BUTTON
	$("#save").click(function(){

		
	});





	// See if the user has any stored stocks. If so, then load them
	var userStocksSaved = localStorage.getItem('userStocks');
	console.log(userStocksSaved);


	// Set the URL to the AJAX request
	var url = `http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("${userStocksSaved}")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json`;
	// Pass URL throught the getJSONStuff function
	getJSONStuff(url);  
	$('.yahoo-form').submit(function(){
		// Stop the form from submitting (default action)
		event.preventDefault();
		// Get whatever the user typed out of the input and store it in symbol
		var symbol = $('#symbol').val();
		if(userStocksSaved === null){
			// Set the local storage to userStocks with whats in symbol
			localStorage.setItem("userStocks", symbol);
		}else{
			// Set the local storage to userStocks with whats in symbol
			localStorage.setItem("userStocks", symbol+','+userStocksSaved);
		}
		// Dynamically build the URL to use the symbol(s) the user requested
		var url = `http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("${symbol}")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json`;
		// getJSON, param1 = where to go, param2 = what to do
		getJSONStuff(url);
	});
});


// EXTERNAL FUNCTIONS
function getJSONStuff(url){
	$.getJSON(url, function(data){
		var stockInfo = data.query.results.quote;
		if(data.query.count == 1){
			// we know this is a single object becaues theres only 1
			var htmlToPlot = buildStockRow(stockInfo);
			$('#stock-body').append(htmlToPlot);				
		}else{
			// we know this is an array, because the count isnt 1
			for(let i = 0; i < stockInfo.length; i++){
				var htmlToPlot = buildStockRow(stockInfo[i]);
				$('#stock-body').append(htmlToPlot);
			}
		}
	})
	// console.log("I'm back!");
}
function buildStockRow(stock){
	// check to see if change is + or -
	// console.log(stock);
	if(stock.Change.indexOf('+') > -1 ){
		// if > -1, there is a + somewhere in this string
		var classChange = "success";
	}else{
		var classChange = "danger";
	}
	var newHTML = '';
	newHTML += '<tr>';
		newHTML += '<td>'+stock.Symbol+'</td>';
		newHTML += '<td>'+stock.Name+'</td>';
		newHTML += '<td>'+stock.Ask+'</td>';
		newHTML += '<td>'+stock.Bid+'</td>';
		newHTML += '<td class="'+classChange+'">'+stock.Change+'</td>';
	newHTML += '</tr>';
	// console.log(newHTML);
	// $('#stock-body').append(newHTML);
	return newHTML;
}

function removeDoubles(string){
	var stringToArray = string.split();
}
// $.getJSON(url, function(data){
		// 	var stockInfo = data.query.results.quote;
		// 	if(data.query.count == 1){
		// 		// we know this is a single object becaues theres only 1
		// 		var htmlToPlot = buildStockRow(stockInfo);
		// 		$('#stock-body').append(htmlToPlot);				
		// 	}else{
		// 		// we know this is an array, because the count isnt 1
		// 		for(let i = 0; i < stockInfo.length; i++){
		// 			var htmlToPlot = buildStockRow(stockInfo[i]);
		// 			$('#stock-body').append(htmlToPlot);
		// 		}
		// 	}
		// 	// console.log("I'm back!");
		// });





