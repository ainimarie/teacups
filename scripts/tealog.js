class Tea {
    constructor(brand, name, type, rating, comment) {
        this.brand = brand;
        this.name = name;
        this.type = type;
        this.rating = rating;
        this.comment = comment;
    }
}

let obj, content, x = '';
let id = 1;

let db;

let logs;
let dbRequest = indexedDB.open('tealogs', 1);

function loadLogs() {

    dbRequest.onupgradeneeded = function (event) {
        db = event.target.result;


        if (!db.objectStoreNames.contains('logs')) {
            logs = db.createObjectStore('logs', {
                autoIncrement: true
            });
        } else {
            logs = dbRequest.transaction.objectStore('logs');
        }


    };

    dbRequest.onsuccess = function (event) {
        db = event.target.result;

    };

    dbRequest.onerror = function () {
        alert('error opening database');
    };

}

function addTeaLog(Tea) {

    let db = logs;
    let tx = db.transaction(['logs'], 'readwrite');
    let store = tx.objectStore('logs');

    let log = {
        brand: Tea.brand,
        name: Tea.name,
        type: Tea.type,
        rating: Tea.rating,
        comment: Tea.comment,
        timestamp: Date.now()
    };
    store.add(log);

    tx.oncomplete = function () {
        console.log('saved');
    }
    tx.onerror = function () {
        console.log('NOPE');
    }
}

let submit = document.getElementById('submit');
submit.addEventListener('click', submitTeaLog());

function submitTeaLog() {

    let tea = new Tea();

    tea.brand = document.getElementById('brand').value;
    tea.name = document.getElementById('teaname').value;
    tea.type = document.querySelector('input[name="teatype"]:checked').value;
    tea.rating = document.querySelector('input[name="rating"]:checked').value;
    tea.comment = document.getElementById('comment').value;

    addTeaLog(db, tea);
}


//load tealogs from localstorage

// function loadLogs() {




// console.log(localStorage);
// let teas = JSON.parse(localStorage.getItem('tealogs' || '[]'));
// console.log(teas);
// if (teas) {
//     let tealogs_length = window.localStorage.length;


//     for (var i = 0; i < tealogs_length; i++) {
//         console.log(teas.name);

//     }
// } else {

// let container = document.getElementById('logs');
// let log = document.createElement('article');
// log.innerHTML = `no logs, go log something!`;
// //if green some image, if black other etc
// container.appendChild(log);//do a div here
// }

// }

// add tealog to local storage
function saveTea() {
    // id++;
    // let newTea = new Tea('miau','boo','green','bad');
    // localStorage.setItem(`tealogs${id}`, JSON.stringify([newTea]));
}


// function loadLogs() {
// 	ajax("tea_logs.json", function(response) {
// 		console.log("response = " + response);
// 		// create a json object
// 		var JSONObject = JSON.parse(response);
// 		tea = JSONObject.tea;
// 		//console.log(talot);
// 		for (var i=0;i<tea.length;i++) {
//             console.log(tea[i].name);
//             showLogs(tea[i]);
//             id++;
// 		}
// 	});
// }

// function ajax(url, fn) {
// 	var req;
// 	if (window.XMLHttpRequest) {
// 		req = new XMLHttpRequest();
// 	} else {
// 		req = new ActiveXObject('Microsoft.XMLHTTP');
// 	}
// 	req.onreadystatechange = function() {
// 		if (req.readyState == 4 && req.status == 200) {
// 			fn(req.responseText);
// 		}
// 	}
//     req.open('GET', url, true);
//     req.overrideMimeType("application/json");
// 	req.send();
// // }

// function showLogs(tea) {

//     let container = document.getElementById('logs');
//     let log = document.createElement('article');
//     log.setAttribute('id', `log${id}`);
//     log.setAttribute('class', 'item-logs');
//     log.innerHTML = `<h3 class="log__title">${name}</h3>
//     <span class="log__subtitle">${brand}</span>
//     // <p>${type}</p>
//     // <p>${comment}</p>
//     // ${date}`;
//     //if green some image, if black other etc
//     container.appendChild(log);
// }

// let sub = document.getElementById('submit').addEventListener('click', function () {
// //todo

//     let data = JSON.stringify('{ {"tea": ["name": "rudy"] }} ');

//     var request = new XMLHttpRequest();
//     request.open('POST', 'tea_logs.json', true);
//     request.setRequestHeader('Content-Type', 'application/json');
//     request.overrideMimeType("application/json");
//     request.send(data);
//     console.log(data);
// });

//submit-tea



// // delete list item
// function remove_item() {
// 	var li = this.parentNode;
// 	remove_storageitem(li.getAttribute("data-key"));
//     li.parentNode.removeChild(li);
// }

// // remove item from local storage
// function remove_storageitem(key) {
// 	window.localStorage.removeItem(key);
// }

// // function clear all items from the list and local storage
// function clear_list() {
// 	window.localStorage.clear();
// 	var list = document.getElementById('todo_list');
// 	while (list.firstChild) { 
// 		list.removeChild(list.firstChild); 
// 	}
// }

//color-switches

let green = document.getElementById('colorGreen');

green.addEventListener('click', function (e) {
    document.documentElement.setAttribute('data-theme', 'greentheme')
})

let pink = document.getElementById('colorPink');

pink.addEventListener('click', function (e) {
    document.documentElement.setAttribute('data-theme', 'light')
})