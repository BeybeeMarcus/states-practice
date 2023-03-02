const vscode = require('vscode');

// Función para crear y mostrar el WebView
const createWebViewPanel = (type, response, context, chat, copy, title, typing, data_file) => {

    // New WebView
	const panel = vscode.window.createWebviewPanel(
		'codegpt-panel-view', // ID
		'Code GPT', // Tab Title
		vscode.ViewColumn.Beside, // Column
		{
			enableScripts: true, // scripts
            localResourceRoots:
            [
                vscode.Uri.joinPath(context.extensionUri, "media")
            ]
		}
	);

    if (typeof response === 'undefined')
    {
        response = 'Oops! Something happened, check the extension settings';
    }

    let clear_response = response.trim().split("\r\n").join("\n");
    let clean_response = JSON.stringify(clear_response, null, 2);
    console.log(clean_response);

    const webview = panel.webview;

    //JS and CSS Files
    const styleMain = webview.asWebviewUri( 
            vscode.Uri.joinPath(context.extensionUri, 'media', 'main.css')
    );
    const highlightMinJs = webview.asWebviewUri( 
        vscode.Uri.joinPath(context.extensionUri, 'media', 'highlight.min.js')
    );
    const showdownJs = webview.asWebviewUri( 
        vscode.Uri.joinPath(context.extensionUri, 'media', 'showdown.min.js')
    );

    // Use a nonce to only allow specific scripts to be run
	const nonce = getNonce();

    let chat_html = ''
    if(chat == true)
    {
        chat_html = `<footer class="position-fixed d-flex bg-secondary bg-opacity-10">
        <input type="text" class="form-control me-3" placeholder="Ask CodeGPT..">
        <button class="btn btn-primary">
        <svg class="svg-icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="https://www.w3.org/2000/svg"><path d="M729.173333 469.333333L157.845333 226.496 243.52 469.333333h485.674667z m0 85.333334H243.541333L157.824 797.504 729.173333 554.666667zM45.12 163.541333c-12.352-34.986667 22.762667-67.989333 56.917333-53.482666l853.333334 362.666666c34.645333 14.72 34.645333 63.829333 0 78.549334l-853.333334 362.666666c-34.133333 14.506667-69.269333-18.474667-56.917333-53.482666L168.085333 512 45.098667 163.541333z" fill="" /></svg>
        </button>
        </footer>`;
    }
    let copy_html = '';
    if(copy == true)
    {
        copy_html = `<button class="btn btn-secundary btn-sm" id="btn_copy" style="margin-left: auto; margin-right: 0;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                        </svg>
                    </button>`;
    }

    //tipyng
    let typing_html = `document.getElementById('resp').innerHTML = html;`;
    if(typing == true)
    {
        typing_html = `
            var speed = 20;
            var i = 0;

            function typeWriter() {
                if (i < text.length) {
                    document.getElementById("resp").innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                }
            }

            typeWriter();
        `;
    }

    let data_file_html = '';
    if(data_file.length > 0)
    {
        data_file_html = `<small>${data_file[0]} ${data_file[1]}:${data_file[2]}</small>`
    }

    const html = `
    <!doctype html>
    <html>
    <head>
        <meta charset="UTF-8">

        <meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${webview.cspSource}; script-src 'nonce-${nonce}';">

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="${styleMain}">
    </head>

    <body class="background: black">
    <main class="p-3 h-100 w-100 bg-secondary bg-opacity-10">
        <div class="response rounded-4 bg-secondary bg-opacity-10 p-3" id="typing">
            <h3 class="h3 mb-3">${title} ${data_file_html}</h3>
            <div id="snippet" class="">
                ${copy_html}
                <pre>
                    <code class="hljs">
                        <p id="resp"></p>
                    </code>
                </pre>
            </div>  
        </div>
    </main>
    ${chat_html}
    <script nonce="${nonce}" src="${highlightMinJs}"></script>
    <script nonce="${nonce}" src="${showdownJs}"></script>
    <script nonce="${nonce}">
            
            var converter = new showdown.Converter();
            var text      = ${clean_response};
            // console.log('text')
            // console.log(text)

            var html = converter.makeHtml(text);
            // console.log('html')
            // console.log(html)

            hljs_html = hljs.highlightAuto(html).value
            // console.log('hljs_html')
            // console.log(hljs_html)

            ${typing_html}

            document.getElementById('btn_copy').onclick = function(){
                containerid = 'resp';
                if (document.selection) {
                    var range = document.body.createTextRange();
                    range.moveToElementText(document.getElementById(containerid));
                    range.select().createTextRange();
                    document.execCommand("copy");
                } else if (window.getSelection) {
                    var range = document.createRange();
                    range.selectNode(document.getElementById(containerid));
                    window.getSelection().addRange(range);
                    document.execCommand("copy");
                }
            }  
    </script>
    </body>
</html>`;
    panel.webview.html = html;
}

function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

// Registrar el comando para mostrar el WebView
module.exports = { createWebViewPanel }