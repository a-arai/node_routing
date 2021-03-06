const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');

const index_page = fs.readFileSync('./index.ejs', 'utf8');
const sample_page = fs.readFileSync('./sample.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');

var server = http.createServer(getFromClient);


server.listen(3000);
console.log('Server start!');

//ここまでメインプログラム

//createServerの処理
function getFromClient(request, response) {
    var url_parts = url.parse(request.url);
    switch (url_parts.pathname) {
        //index.ejs
        case '/': 
            var content = ejs.render(index_page, {
                title: "page1",
                content: "画面１",
            });
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(content);
            response.end();
            break;
        //page2.ejs
        case '/page2':
            var content = ejs.render(sample_page, {
                title:"page2",
                content:"画面２に遷移しました",
            });
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(content);
            response.end();
            break;
        //スタイルシート
        case '/style.css':
            response.writeHead(200, {'Content-Type': 'text/css'});
            response.write(style_css);
            response.end();
            break;

    default: 
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('no page...');
        break;
    }
}