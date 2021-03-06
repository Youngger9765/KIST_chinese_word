
'use strict';

module.exports.landingPage = (event, context, callback) => {
    let dynamicHtml = '<p>Hey Unknown!</p>';
    let ans = 'no ans';
    // check for GET params and use if available
    if (event.queryStringParameters && event.queryStringParameters.name) {
        dynamicHtml = `${event.queryStringParameters.name}`;
    }

    if (event.queryStringParameters && event.queryStringParameters.ans) {
        ans = `${event.queryStringParameters.ans}`;
    }

    const html = `
  <html>
    <head>
        <meta charset="utf-8" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap-theme.min.css" integrity="sha384-6pzBo3FDv/PJ8r2KRkGHifhEocL+1X2rVCTTkUfGk7/0pbek5mMa1upzvWbrUbOZ" crossorigin="anonymous">
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>
    </head>
    <style>
        h1 { color: #73757d; }
    </style>
    <body>
        <div class="container">
            <h1>練習：${dynamicHtml}</h1>
            <h1>仿寫練習</h1>
            <h2>請在按照筆畫順序寫出文字</h2>

        </div>

        <div class="container">
            <iframe height="100%" width="100%" src="https://stroke-order.learningweb.moe.edu.tw/mobiles/practice.rbt?prevURL=characters_query_result.tiles&parameters=text%3D${dynamicHtml}&word=${dynamicHtml}">
            你的瀏覽器不支援 iframe
            </iframe>
        </div>

        <div class="container">
            <div id="next" class="btn btn-lg btn-success">下一題</div>
        </div>

    </body>
    <script language="JavaScript" type="text/javascript">

        $("#next").click(function(){
            window.location = "https://dpnu7opif2.execute-api.us-east-1.amazonaws.com/dev/landing-page-5?name=${dynamicHtml}&ans=${ans}";
        });
    </script>
  </html>`;

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