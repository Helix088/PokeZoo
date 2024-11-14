function jsonFetch(data) {
    fetch(data)
    .then(response => {
        return response.json();
    }).then(displayLinks).then(data => {
        console.log(data)
    });
}


function displayLinks(data) {
    const links = document.getElementById("surveillance-links");
    links.innerHTML = "";
    data.links.forEach((link) => {
      let listItem = document.createElement("li");
      listItem.innerHTML = `
            <a href="${link.link}" class="spons-link">${link.animal}</a>
    `;
      links.appendChild(listItem);
    });
}

jsonFetch("../surveillance.json");

