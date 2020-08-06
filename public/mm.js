const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Darth Vadar',
            quote: 'I find your lack of faith disturbing.'
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            console.log(response)
        })

})

const deleteButton = document.querySelector('#delete-button')

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Darth Vadar'
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(data => {
            console.log(data)
            window.location.reload()
        })
})