const list = document.querySelector("#list");
const loading = document.querySelector(".loading");
const URL = "http://localhost:8031/api/public/books"
window.onload=() => {
    fetch(URL, {
        method: 'GET',
    })
        .then(res => {
            return res.json();
        })
        .then(res => {
            console.log(res);
            let books = [];
            books = res.map((item) => {
                return "<li>"+item.name + "</li>";
            })
            list.innerHTML = books.join("");
            loading.style.display = 'none';
        })
        .catch(err => {
            console.log(err);
        })
}
