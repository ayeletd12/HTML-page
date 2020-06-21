//--API key: d699f454f1844ab255cd9712f011fd2b
const apiKey = "d699f454f1844ab255cd9712f011fd2b"

//serach function 
async function search() {
	const url = "https://financialmodelingprep.com/api/v3/search?query=" + document.querySelector("#mysearch").value +"&limit=15&exchange=NASDAQ&apikey=" + apiKey
	
	document.querySelector("#result").innerHTML = "";
	const loader = document.querySelector("#loader");
	loader.style.display = "block";
	
    const results = await fetchData(url)
	const listView=document.createElement('ul');
    
    //create link to the company pages and add to listView
	for (const res in results) {
			var a = document.createElement('a');
			 var linkText = document.createTextNode(results[res]['name'] + ' (' + results[res]['symbol'] + ')');
			 console.log(linkText);
			 a.appendChild(linkText);
			companyRef = "https://financialmodelingprep.com/api/v3/company/profile/" + results[res]['symbol'] + "?apikey=" + apiKey;
			 a.href = companyRef;
			 a.target="_blank";
			var listViewItem=document.createElement('li');
			listViewItem.appendChild(a);
			listView.appendChild(listViewItem);
	}
	
	loader.style.display = "none";
	document.getElementById("result").appendChild(listView);
 
}

//fetch data from url and return as array of objects using JSON parsing
async function fetchData(url) {
    let response = await fetch(url);
    let responseText = await response.text();

    return JSON.parse(responseText)
}
