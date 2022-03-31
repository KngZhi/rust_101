// 请求 url - > html（信息）  -> 解析html
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path')
const data = require('./data.json')
const urls = require('./urls.json')
const async = require('async')
const urlHandle = require('url')

const TOML = (folder_name) => `[package]
name = \"${folder_name}\"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
`

const MAIN_CONTENT = `fn main() {
    println!("Hello, world!");
}`

const LEARN_SECTION = 12

const HOMEWORK_URLS = urls.filter(url => {
    const no = Number(url[0].split(' ')[0].replace(/\.$/, ''))
    return no < LEARN_SECTION + 1
}).map(x => x[1])

async.mapLimit(HOMEWORK_URLS.slice(30, 38), 2, async function(url) {
    const res = await fetch(url)
    const { body } = res
    await handleHtml(body, url)
})

async function createFile(path, content = '') {
    await fs.writeFile(path, content)
}

async function handleHtml(html, url) {
    const $ = cheerio.load(html);
    let all_code_block = [];
    $('code.editable').each(function (i, e) {
        all_code_block[i] = $(this).text()
    })

    const { origin, pathname } = urlHandle.parse(url)
    const urlInfos = url.split('/')
    const FOLDER_NAME =  `.${pathname.replace('.html', '')}_`
    const FOLDER_PATH = path.resolve(`./practices/${FOLDER_NAME}`, '')
    const SRC_PATH = FOLDER_PATH + '/src'
    const BIN_PATH = SRC_PATH + '/bin'

    await fs.mkdir(SRC_PATH, { recursive: true })
    await fs.mkdir(BIN_PATH, { recursive: true })

    Promise.all(data.map(async (content, idx) => {
        if (!content) return
        createFile(path.resolve(`${BIN_PATH}/${last(FOLDER_NAME.split('/'))}${idx}.rs`), content)
        createFile(path.resolve(`${FOLDER_PATH}/Cargo.toml`), TOML(FOLDER_NAME))
        createFile(path.resolve(`${SRC_PATH}/main.rs`), MAIN_CONTENT)
    }))
}

function last(arr) {
    const len = arr.length
    return arr[len - 1]
}
