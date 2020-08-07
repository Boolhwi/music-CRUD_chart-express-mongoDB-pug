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
            messageDiv.innerHTML = response
            location.reload()
        })


})