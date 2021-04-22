
'use strict';

module.exports.landingPage = (event, context, callback) => {
    let dynamicHtml = '<p>Hey Unknown!</p>';
    let ans = 'no ans';
    let words ='';
    let url = 'https://dpnu7opif2.execute-api.us-east-1.amazonaws.com/dev/landing-page-0-word-list';

    // check for GET params and use if available
    if (event.queryStringParameters && event.queryStringParameters.name) {
        dynamicHtml = `${event.queryStringParameters.name}`;
    }

    if (event.queryStringParameters && event.queryStringParameters.ans) {
        ans = `${event.queryStringParameters.ans}`;
    }

    if (event.queryStringParameters && event.queryStringParameters.words) {
        words = `${event.queryStringParameters.words}`;
    } else {
        words = "均,一,教,育"
    }

    url = url + "?words=" + words

    let words_list = words.split(",");
    let next_domain = "https://dpnu7opif2.execute-api.us-east-1.amazonaws.com/dev/landing-page-1";
    let next_url_list_html = "";
    for (let index = 0; index < words_list.length; index++) {
        // const url_html = "<div class='btn btn-primary btn-lg next_link' data=" + next_url + ">" + words_list[index] + "</div> <hr>";
        // const url_html = '<div data="' + words_list[index] + '" class="btn btn-primary btn-lg next_link col-* col-sm-6 col-lg-4 strLine Achar"><div class="cross"></div><div class="front">' + words_list[index] +'</div></div>'
        const url_html = `
            <div class="col-sm-3 col-lg-4 strLine Achar next_link"
                data ="${words_list[index]}"
            >
                <div class="cross"></div>
                <div class="front">${words_list[index]}</div>
            </div>
        `;
        next_url_list_html = next_url_list_html + url_html;
    }

    let head_html = `
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js"></script>
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/jquery-ui.min.js"></script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap-theme.min.css" integrity="sha384-6pzBo3FDv/PJ8r2KRkGHifhEocL+1X2rVCTTkUfGk7/0pbek5mMa1upzvWbrUbOZ" crossorigin="anonymous">
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>
        <link rel="stylesheet" type="text/css" href="style.css">
    `;

    let style_html = `
        h1 { color: #73757d; }
        .cross{
            background:#1caffc;
            position: relative;
            top: 0.5em;
            left: 0.5em;
        }
        .cross:after{
            content: "";
            height: 2px;
            width: 1.1em;
            background: #d0283e;
            display: block;
            position: absolute;
            left: -0.5em;
            top: 2px;
        }
        .cross:before{
            content: "";
            height: 1.1em;
            width: 2px;
            background: #d0283e;
            display: block;
            position: absolute;
            top: -0.5em;
            left: 4px;
        }
        .msgAchar {
            margin-bottom: 15px;
            font-weight: bolder;
            font-size: 23px;
            text-align: center;
            line-height: 50px;
            height: 100px;
            /*display: list-item;*/
        }
        .msgFront {
            width: 100px;
            height: 100px;
            line-height: 1.7em;
            backface-visibility: hidden;
            border: 8px solid red;
            border-radius: 1.25rem;
            font-weight:bold;
            background: #FFF !important;
        }
        .Achar {
            margin-bottom: 20px;
            font-size: 4em;
            text-align: center;
            line-height: 100px;
            max-width: 100%;
            display: flex;
        }
        .front {
            width: 1.1em;
            height: 1.1em;
            line-height: 1em;
            backface-visibility: hidden;
            border: 8px solid red;
            border-radius: 1.25rem;
            background: #FFF !important;
            cursor: pointer;
        }
        .correctFront {
            border: 8px solid #78BD68 !important;
            cursor:not-allowed;
        }
        .strLine {
            /*overflow: hidden;*/
            font-family: DFKai-sb;
            padding-bottom: 50px;
        }
    `;

    

    let body_html = `
         <div class="container">
            <h1>Step.1  均一傳送資料過來</h1>
            <h2>資料假設長這樣</h2>
            <p>${words}</p>
            <h2>我們的網址會長這樣</h2>
            <p>${url}</p>
            
            <h1>Step.2  解析資料</h1>
            <h2>words_list: ${words_list}</h2>

            <h1> Step.3 建立各個字的連結
            <h2>${next_url_list_html}</h2>
 
        </div>
    `;

    let script_html = `
        $(".next_link").click(function(){
            word = this.getAttribute("data");
            url = "${next_domain}?name=" + word;
            window.open(url, "MsgWindow", "width=700,height=500");
        });
    `;

    const html = `
    <html>
        <head>
            ${head_html}
        </head>
        <style>
            ${style_html}
        </style>
        <body>
        ${body_html}
        </body>
        <script language="JavaScript" type="text/javascript">
            ${script_html}
        </script>
    </html>
    `;

    const response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html',
        },
        body: html,
    };

    // callback is sending HTML back
    callback(null, response);
};