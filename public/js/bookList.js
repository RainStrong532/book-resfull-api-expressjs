import { callApi } from './fetchApi.js';
import url from './url.js'
const book_list = document.querySelector('#book_list');

const submit_btn = document.querySelector('#submit_btn');
const title = document.querySelector('.title');
const inputs = document.querySelectorAll('.inputForm');
const form = document.querySelector('#form');
let updateButtons = [];
let deleteButtons = [];

let isAdd = true;
let isClick = false;

const button = document.querySelector('#button');
let book = {
    name: "",
    author: "",
    description: "",
    price: 0
}

let result = [];

window.onload = async function () {
    try {
        result = await callApi('GET', url.BOOK_URL);
        let listCard = [];
        listCard = result.map((item, index) => {
            return '<div class="card mt-3" style="width: 24rem;">\
            <img src="https://picsum.photos/300/200" class="card-img-top" alt="Image">\
            <div class="card-body">\
                <h5 class="card-title">'+ item.name + '</h5>\
                <p class="card-text">\
                    Tác giả: <span>'+ item.author + '</span>\
                </p>\
                <p class="card-text">\
                    '+ item.description + '\
                </p>\
                <p class="card-text">\
                    Giá: <span>'+ item.price + '</span> VNĐ\
                </p>\
                <button href="#" class="btn btn-primary">Mua</button>\
                <button href="#" class="btn btn-warning update-btn" index="'+ index + '">Cập nhật</button>\
                <button href="#" class="btn btn-danger delete-btn" index="'+ index + '">Xóa</button>\
            </div>\
        </div>'
        })
        book_list.innerHTML = listCard.join('');
        console.log(result);
    } catch (err) {
        console.log(err);
    }

    submit_btn.addEventListener('click', async (e) => {
        e.preventDefault();
        if (isAdd) {
            try {
                await callApi('POST', url.BOOK_URL, book)
                alert("Thêm mới thành công")
                window.location.reload();
            } catch (err) {
                window.alert(err);
            }
        } else {
            try {
                await callApi('PUT', url.BOOK_URL + "/" + book.book_id, book)
                alert("Cập nhật thành công")
                window.location.reload();
            } catch (err) {
                window.alert(err);
                window.location.reload();
            }
        }
    })

    updateButtons = document.querySelectorAll('.update-btn');

    updateButtons.forEach(ubtn => {
        ubtn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('index'));
            inputs.forEach(input => {
                book = result[index];
                input.value = result[index][input.name];
                isAdd = false;
                form.classList.remove('d-none');
                isClick = true;
                button.innerHTML = isAdd ? "Thêm mới" : "Hủy cập nhật sách có id: " + book.book_id;
                submit_btn.innerHTML = "Cập nhật";
                console.log(book, result[index]);
            })
        })
    })

    deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click',async (e) => {
            const index = parseInt(e.target.getAttribute('index'));
            const id = result[index].book_id;
            try{
                const res = await callApi('DELETE', url.BOOK_URL+"/"+id);
                alert("Delete successful", res);
                window.location.reload();
            }catch(err){
                alert(err);
            }
        })
    })
}

inputs.forEach((input) => {
    input.addEventListener('change', (e) => {
        if (e.target.name === 'price') {
            book[e.target.name] = parseInt(e.target.value);
        } else
            book[e.target.name] = e.target.value;
    })
})

button.addEventListener('click', () => {
    if (!isClick) {
        form.classList.remove('d-none');
        button.innerHTML = "Đóng";
    } else {
        form.classList.add('d-none');
        button.innerHTML = "Thêm mới";
        inputs.forEach(input => {
            input.value = "";
        })
        submit_btn.innerHTML = "Thêm mới";
    }
    isClick = !isClick;
})

