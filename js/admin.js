let userId = -1

async function token(token) {
    let res = await fetch(API + '/admin', {
        method: "GET",
        headers: {
            token: token || window.localStorage.getItem('token')
        }
    })

    if (!res.ok) window.location = '/login'

    userId = await res.json()
    userId = userId.userId




}

token()

logoutBtn.onclick = () => {
    localStorage.clear()
    window.location = '/login'
}

async function toFindUser() {
        let res = await fetch(API + '/users')
        let data = await res.json()


        let myVideos = data.find(el => el.userId == userId)

        if(!myVideos) return

        renderContent(myVideos.videos)
    
}


async function renderContent(data) {

    videosList.innerHTML = null

    for (const val of data) {

        let firstTitle = val.title

        const [li, video, p, img] = createTag('li', 'video', 'p', 'img')

        li.className = "video-item"

        video.src = val.view
        video.controls = true

        p.textContent = val.title
        p.className = "content"
        p.setAttribute("contenteditable", true)
        p.dataset.id = val.dataId

        p.onkeyup = (e) => {
            if (e.keyCode == 13) {
                blur()
                p.textContent = p.textContent.trim()
                if (!p.textContent) {

                    p.textContent = firstTitle
                    return alert("Invalid title")
                }

                updatedTitle(p.textContent, p.dataset.id)
            }
        }

        img.src = "./img/delete.png"
        img.width = 25
        img.className = "delete-icon"
        img.dataset.id = val.dataId

        img.onclick = () => {
            removeVideo(img.dataset.id)
            li.remove()
        }

        li.append(video, p, img)
        videosList.append(li)
    }

}

async function removeVideo(id) {
    let res = await fetch(API + `/admin/${id}`, {
        method: "DELETE",
        headers: {
            token: window.localStorage.getItem('token')
        }
    })
}


async function updatedTitle(title, dataId) {
    let res = await fetch(API + `/admin`, {
        method: "PUT",
        headers: {
            token: window.localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, dataId })
    })

    console.log(await res.json());
}

submitButton.onclick = () => {
    if (!videoInput.value.length) {
        errorMessage.textContent = "Empty title"
        return
    }

    if (!uploadInput.files[0]) {
        videoInput.value = null
        errorMessage.textContent = "Empty video"
        return
    }

    pushVideo(videoInput.value)
}


function pushVideo(title) {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('video', uploadInput.files[0])

    uploadInput.value = null
    videoInput.value = null
    
    addedVideo(formData)
}

async function addedVideo(formData) {
    let res = await fetch(API + '/admin', {
        method: 'POST',
        headers: {
            token: window.localStorage.getItem('token')
        },
        body: formData
    })

    let data = await res.json()
    console.log(await res.json());

    if (data.status == 400) {
        errorMessage.textContent = data.message
        uploadInput.value = null
        videoInput.value = null
        return
    }

    toFindUser()
}


toFindUser()

