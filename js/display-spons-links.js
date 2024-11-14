function jsonFetch(data) {
    fetch(data)
    .then(response => {
        return response.json();
    }).then(displayLinks).then(data => {
        console.log(data)
    });
}


function displayLinks(data) {
    const links = document.getElementById("sponsor-links");
    links.innerHTML = "";
    data.links.forEach((link) => {
      let listItem = document.createElement("li");
      listItem.innerHTML = `
        <a href="${link.link}" class="spons-link"><img src="${link.logo}" class="spons-logo"></img></a>
    `;
      links.appendChild(listItem);
    });
}

jsonFetch("../spons-links.json");

