let obj, content, x = '';
let id = 1;

function loadLogs() {
	ajax("tea_logs.json", function(response) {
		console.log("response = " + response);
		// create a json object
		var JSONObject = JSON.parse(response);
		tea = JSONObject.tea;
		//console.log(talot);
		for (var i=0;i<tea.length;i++) {
            console.log(tea[i].name);
            showLogs(tea[i]);
            id++;
		}
	});
}

function ajax(url, fn) {
	var req;
	if (window.XMLHttpRequest) {
		req = new XMLHttpRequest();
	} else {
		req = new ActiveXObject('Microsoft.XMLHTTP');
	}
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			fn(req.responseText);
		}
	}
	req.open('GET', url, true);
	req.send();
}

function showLogs(tea) {

    let container = document.getElementById('logs');
    let log = document.createElement('article');
    log.setAttribute('id', `log${id}`);
    log.setAttribute('class', 'item-logs');
    log.innerHTML = `<h3 class="log__title">${tea.name}</h3>
    <span class="log__subtitle">${tea.brand}</span>
    <p>${tea.type}</p>
    <p>${tea.comment}</p>
    ${tea.date}`;
    //if green some image, if black other etc
    container.appendChild(log);
}

let green = document.getElementById('colorGreen');

green.addEventListener('click', function (e) {
    document.documentElement.setAttribute('data-theme', 'greentheme')
})

let pink = document.getElementById('colorPink');

pink.addEventListener('click', function (e) {
    document.documentElement.setAttribute('data-theme', 'light')
})
//submit-tea