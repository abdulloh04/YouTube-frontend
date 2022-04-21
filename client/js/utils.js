const API = 'http://192.168.0.108:5000'


function createTag(...array) {
    let arr = []
    for (const val of array) {
        arr.push(document.createElement(val))
    }

    return arr
}


const userTitle = `<h1>YouTube Members</h1>
<li class="channel active" data_id="main" onclick="idGetRenderVideos(false)">
    <a href="#">
        <svg viewbox="0 0 24 24" focusable="false" style="pointer-events: none; display: block; width: 30px; height: 30px;"><g><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8" class="style-scope yt-icon"></path></g></svg>
        <span>Home</span>
    </a>
</li>`