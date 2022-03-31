// 请求 url - > html（信息）  -> 解析html
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path')
// const data = require('./data.json')
const urls = require('./urls.json')
const async = require('async')
const urlHandle = require('url')

const TOML = (folder_name) => `[package]
name = \"${last(folder_name.split(/\//))}\"
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


async.mapLimit(HOMEWORK_URLS, 4, handleHtml)


async function createFile(path, content = '') {
    await fs.writeFile(path, content)
}

async function handleHtml(url) {
    const res = await fetch(url)
    const html = await res.text()
    const $ = cheerio.load(html);
    let all_code_block = [];

    $('code.editable').each(function (i, e) {
        all_code_block[i] = $(this).text()
    })

    const { origin, pathname } = urlHandle.parse(url)
    // const urlInfos = url.split('/')
    const FOLDER_NAME =  `.${pathname.replace('.html', '')}_`
    const FOLDER_PATH = path.resolve(`./practices/${FOLDER_NAME}`, '')
    const SRC_PATH = FOLDER_PATH + '/src'
    const BIN_PATH = SRC_PATH + '/bin'

    console.log(`Creating Folder: ${SRC_PATH}`)
    await fs.mkdir(SRC_PATH, { recursive: true })
    console.log(`Creating Folder: ${BIN_PATH}`)
    await fs.mkdir(BIN_PATH, { recursive: true })

    Promise.all(all_code_block.map(async (content, idx) => {
        if (!content) return
        createFile(path.resolve(`${BIN_PATH}/${last(FOLDER_NAME.split('/'))}${idx+1}.rs`), content)
        createFile(path.resolve(`${FOLDER_PATH}/Cargo.toml`), TOML(FOLDER_NAME))
        createFile(path.resolve(`${SRC_PATH}/main.rs`), MAIN_CONTENT)
    }))
}

function last(arr) {
    const len = arr.length
    return arr[len - 1]
}
