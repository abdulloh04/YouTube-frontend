let username = ''
let password = ''

async function token(token){
    let res = await fetch(API + '/admin', {
        method: "GET",
        headers:  {
            token: token || window.localStorage.getItem('token')
        }
    })
    console.log(token);
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

usernameInput.onkeyup = (e) => {
    username = e.target.value
}

passwordInput.onkeyup = (e) => {
    password = e.target.value
}



submitButton.onclick = async (e) => {
    e.preventDefault()
    if (!username.length || !password.length) {
        return alert("Invalid username/password")
    }

    let res = await fetch(API + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })

    res = await res.json()
    console.log(res);
    if(res.status == 400){
         errorMessage.textContent = res.message
    }
   
    window.localStorage.setItem("token", res.token)
    console.log(res.token);
    token(res.token)
    // if(res.status!= 400) window.location = '/'
    
   
}

