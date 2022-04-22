async function token(token){
    let res = await fetch(API + '/admin', {
        method: "GET",
        headers:  {
            token: token || window.localStorage.getItem('token')
        }
    })
    // console.log(token);
    if(res.ok) window.location = '/admin'
}


if(window.localStorage.getItem('token')) token()

showButton.onclick = () => {
    if (passwordInput.type == 'text') {
        passwordInput.type = 'password'
    }
    else if (passwordInput.type == 'password') {
        passwordInput.type = 'text'
    }
}


let username = ''
let password = ''
let email = ''
let file = false

showButton.onclick = () => {
    if (passwordInput.type == 'text') {
        passwordInput.type = 'password'
    }
    else if (passwordInput.type == 'password') {
        passwordInput.type = 'text'
    }
}


usernameInput.onkeyup = (e) => {
    username = e.target.value
}

passwordInput.onkeyup = (e) => {
    password = e.target.value
}

uploadInput.onchange = () => {
    file = true
}


submitButton.onclick = async (e) => {
    e.preventDefault()
    if (!file) return  errorMessage.textContent = "Empty avatar..."


    if (!username.length || !password.length) {
        return errorMessage.textContent = "Invalid username/password"
    }

    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    formData.append('avatar', uploadInput.files[0])


    let res = await fetch(API + '/register', {
        method: 'POST',
        body: formData
    })
    
    res = await res.json()
    console.log(res.token);

    if (res.status == 400) {
        return errorMessage.textContent = res.message
        // return window.location.reload()
    }

    window.localStorage.setItem("token", res.token)
    window.location = '/'
    console.log('+++++++++++++');


}