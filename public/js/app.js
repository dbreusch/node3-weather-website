// Client side javascript file
console.log('Client side javascript file loaded!')

// Fetch API: lives in the browser, not accessible to Node.js


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()  // stop form refresh after submit

    const location = search.value

    messageOne.textContent = 'Loading...'

    // "then" is a "promise"
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
                // console.log(data.error)
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                // console.log(data)
            }
        })
    })

})