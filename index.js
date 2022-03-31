// 请求 url - > html（信息）  -> 解析html
const https = require('https');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path')
const data = require('./data.json')
const URL_ARR = require('./urls.json')
// 请求 top250
// 浏览器输入一个 url, get
// const URL = 'https://zh.practice.rs/compound-types/enum.html'
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
const URL = URL_ARR[0][1]
console.log(URL)
https.get(URL,async function(res){
    let html = '';
    // 有数据产生的时候 拼接
    res.on('data',function(chunk){
        html += chunk;
    })
    // 拼接完成
    res.on('end',async function(){
        const $ = cheerio.load(html);
        let all_code_block = [];
        $('code.editable').each(function(i, e){
            all_code_block[i] = $(this).text()
        })

        const urlInfos = URL.split('/')
        const FOLDER_NAME = urlInfos[urlInfos.length - 1].split('.')[0] + '_'
        const FOLDER_PATH = path.resolve(`./practices/${FOLDER_NAME}`, '')
        const SRC_PATH = FOLDER_PATH + '/src'
        const BIN_PATH = SRC_PATH + '/bin'
    
        await fs.mkdir(SRC_PATH, { recursive: true} )
        await fs.mkdir(BIN_PATH, { recursive: true} )

        Promise.all(data.map(async (content, idx) => {
            if (!content) return
            createFile(path.resolve(`${BIN_PATH}/${FOLDER_NAME}${idx}.rs`), content)
            createFile(path.resolve(`${FOLDER_PATH}/Cargo.toml`), TOML(FOLDER_NAME))
            createFile(path.resolve(`${SRC_PATH}/main.rs`), MAIN_CONTENT)
        }))

    })
})

async function createFile(path, content = '') {
    await fs.writeFile(path, content)
}
