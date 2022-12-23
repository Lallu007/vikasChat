const socket = io('http://localhost:5500')
const messageContainer = document.getElementById('message-container')
const sendContainer = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const Name = prompt('What is your name?')
appendMessage('you joined')
socket.emit('new-user', Name)

socket.on('chat-message', data => {
    appendMessage(`${data.Name}: ${data.message}`)
})

socket.on('user-connected', Name => {
    appendMessage(`${Name} connected`)
})

socket.on('user-disconnected', Name => {
    appendMessage(`${Name} disconnected`)
})

sendContainer.addEventListener('submit',e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`you: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}