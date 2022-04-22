let voice = new webkitSpeechRecognition()

async function token(token) {
    let res = await fetch(API + '/admin', {
        method: "GET",
        headers: {
            token: token || window.localStorage.getItem('token')
        }
    })

    let data = await res.json()

    let user = data.users.find(el => el.userId == data.userId)

    if (!user) return

    avatar.src = user.avatar
    location.onclick = () => {
        window.location = '/admin'
    }
}

token()


voice.lang = "uz-UZ"

idGetRenderVideos(null)

async function renderUsers() {
    let res = await fetch(API + '/users')
    let users = await res.json()

    usersList.innerHTML = null
    usersList.innerHTML += userTitle

    for (const user of users) {
        const [li, a, img, span] = createTag('li', 'a', 'img', 'span')

        li.className = "channel"
        li.dataset.id = user.userId
        li.onclick = () => {
            idGetRenderVideos(li.dataset.id)
            console.log();
        }

        img.src = user.avatar
        img.width = 30
        img.height = 30

        span.textContent = user.username
        // a.href = "#"
        a.append(img, span)
        li.append(a)
        usersList.append(li)
    }
}

async function idGetRenderVideos(id) {
        let res = await fetch(API + `/videos/${id}`)
        let data = await res.json()

        renderVideos(data)
}

function renderVideos(data) {
    iframes.innerHTML = null

    for (const val of data) {
        console.log(val);
        const [li, video, div1, img1, div2, h2, h3, time, a, span, img2] =
            createTag('li', 'video', 'div', 'img', 'div', 'h2', 'h3', 'time', 'a', 'span', 'img')

        li.className = "iframe"
        video.src = val.view
        video.controls = true

        div1.className = "iframe-footer"
        img1.src = val.avatar

        div2.className = "iframe-footer-text"
        h2.className = "channel-name"
        h2.textContent = val.title

        h3.className = "iframe-title"
        h3.textContent = val.username

        time.className = "uploaded-time"
        time.textContent = val.date

        a.className = "download"
        a.href = val.download
        span.textContent = val.size
        img2.src = "./img/download.png"


        a.append(span, img2)

        div2.append(h2, h3, time, a)
        div1.append(img1, div2)
        li.append(video, div1)

        iframes.append(li)
    }
}

function renderSearch(data) {

    let array = []

    datalist.innerHTML = null

    for (const val of data) {
        const [option] = createTag('option')

        option.value = val.title

        option.onclick = () => {
            console.log('aa');
        }

        datalist.append(option)
        array.push(val)
    }

    btnSearch.onclick = () => {
        search_title.value = null
        renderVideos(array)
    }
}

search_title.onkeyup = async (e) => {
    let res = await fetch(API + `/search?title=${e.target.value}`)
    let data = await res.json()
    renderSearch(data)
}

formSearch.onchange = async () => {
    let res = await fetch(API + `/search?title=${search_title.value}`)
    let data = await res.json()
    renderVideos(data)
}

voiceSearch.onclick = () => {
    voice.start()
}

voice.onresult = async (res) => {

    let voice_word = res.results[0][0].transcript

    let response = await fetch(API + `/search?title=${voice_word}`)
    let data = await response.json()
    renderVideos(data)

}
renderUsers()

