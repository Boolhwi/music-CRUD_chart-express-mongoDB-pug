
/*
const create = document.querySelector('#create_btn')

create.addEventListener('click', _ => {
    fetch('/create', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: document.getElementById("create_title").value,
            artist: document.getElementById("create_artist").value
        })
    })
        .then(res => {
            if (res.ok) {
                console.log(res.json())
                
            }
        })
        
})
*/

const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

deleteButton.addEventListener('click', _ => {
    fetch('/delete', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: document.getElementById("delete-title").value
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            console.log(response)
        })


})