const rss_url = 'https://www.archlinux.org/feeds/news/';


items = fetch(rss_url, {
	method: "GET",
	mode: "cors",
}).then(response => response.text())
.then(text => {
	dom_text = new DOMParser().parseFromString(text, "text/xml")
	items = dom_text.querySelectorAll('item');
	html = '';
	articles = document.createElement("div"); 
	items.forEach(element => {
		let article = document.createElement('article');
		
		let title = document.createElement('h2');
		title.textContent = element.querySelector("title").textContent;
		article.appendChild(title);

		let description = new DOMParser().parseFromString(element.querySelector("description").textContent, "text/html").getRootNode().body;
		article.appendChild(description);
		

		articles.appendChild(article);
	});
	document.querySelector('#app').appendChild(articles);
});
