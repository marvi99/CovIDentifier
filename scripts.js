const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

// Create a request variable and assign a new XMLHttpRequest object to it.
// var request = new XMLHttpRequest()
//
// url = "https://besttime.app/api/v1/forecasts"
//
// params = {
//     'api_key_private': 'pri_d07bd6b0c76442cebc9c0d91cd5b9700',
// 		'api_key_public':'pub_e4225e42acc64ab49f7625f477e0d2a5',
//     'venue_name': 'McDonalds',
//     'venue_address': 'Ocean Ave, San Fransisco'
// }
//
// // Open a new connection, using the GET request on the URL endpoint
// request.open('GET', 'https://besttime.app/api/v1/venues/ven_386c4e7576345052562d6c526b49315254674c464834674a496843&api_key_public=pub_e4225e42acc64ab49f7625f477e0d2a5')

var params = {
    'api_key_private': 'pri_d07bd6b0c76442cebc9c0d91cd5b9700',
    'venue_name': 'Moo Shu Ice Cream & Kitchen',
    'venue_address': 'Banks St, Ottawa'
}

$.ajax({
"url": "https://besttime.app/api/v1/forecasts?" + new URLSearchParams(params),
"method": "POST"
}).done(function (response) {
    console.log(response);
		const card = document.createElement('div');
		card.setAttribute('class', 'card');
		var h1 = document.createElement('h1');
		h1.textContent = 'PEAK HOURS';
		container.appendChild(card);
		card.appendChild(h1);
		for(var i = 0; i < response.analysis[6].busy_hours.length; i++) {
			var p = document.createElement('p')
			if(response.analysis[6].busy_hours[i]<=12){
			p.textContent = `${response.analysis[6].busy_hours[i]}am`
			card.appendChild(p);
		}else{
			p.textContent = `${(response.analysis[6].busy_hours[i])-12}pm`
			card.appendChild(p);
		}
	}

	const quietCard = document.createElement('div');
	quietCard.setAttribute('class', 'card');
	var h1 = document.createElement('h1');
	h1.textContent = 'QUIET HOURS';
	container.appendChild(quietCard);
	quietCard.appendChild(h1);
	for(var i = 0; i < response.analysis[6].quiet_hours.length; i++) {
		var p = document.createElement('p')
		if(response.analysis[6].quiet_hours[i]<12){
		p.textContent = `${response.analysis[6].quiet_hours[i]}am`
		quietCard.appendChild(p);
	}else if(response.analysis[6].quiet_hours[i]==12){
		p.textContent = `${(response.analysis[6].quiet_hours[i])}pm`
		quietCard.appendChild(p);
	}else{
		p.textContent = `${(response.analysis[6].quiet_hours[i])-12}pm`
		quietCard.appendChild(p);
	}
}
		const card2 = document.createElement('div');
		card2.setAttribute('class', 'card');
		h1 = document.createElement('h1');
		h1.textContent = 'HOURLY ACTIVITY';

		container.appendChild(card2);
		card2.appendChild(h1);

		for(var i = 0; i < response.analysis[6].hour_analysis.length; i++) {
    	var hour1 = document.createElement('p')
			if(response.analysis[6].hour_analysis[i].intensity_txt == "Closed"){
				continue;
			}if (i == 6){
				hour1.textContent = `${response.analysis[6].hour_analysis[i].hour}pm: ${response.analysis[6].hour_analysis[i].intensity_txt} activity`
			}else if (i > 6 && i < 18){
				hour1.textContent = `${(response.analysis[6].hour_analysis[i].hour)-12}pm: ${response.analysis[6].hour_analysis[i].intensity_txt} activity`
			}else if (i==18){
				hour1.textContent = `${response.analysis[6].hour_analysis[i].hour+12}am: ${response.analysis[6].hour_analysis[i].intensity_txt} activity`
			}else {
				hour1.textContent = `${response.analysis[6].hour_analysis[i].hour}am: ${response.analysis[6].hour_analysis[i].intensity_txt} activity`
			}
			card2.appendChild(hour1);
		}

		const card3 = document.createElement('div');
		card3.setAttribute('class', 'card');
		h1 = document.createElement('h1');
		h1.textContent = 'STORE INFORMATION';
		container.appendChild(card3);
		card3.appendChild(h1);
		var name = document.createElement('p')
		name.textContent = `${response.venue_info.venue_name}`
		card3.appendChild(name)
		var address = document.createElement('p')
		address.textContent = `${response.venue_info.venue_address}`
		card3.appendChild(address)
		var hours = document.createElement('p')
		hours.textContent = `Store Open: ${response.analysis[6].day_info.venue_open}pm`
		card3.appendChild(hours)
		var hours2 = document.createElement('p')
		hours2.textContent = `Store Close: ${response.analysis[6].day_info.venue_closed-12}pm`
		card3.appendChild(hours2)


});
