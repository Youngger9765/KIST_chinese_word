
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
            <h1>選詞填寫</h1>
            <h2>請將正確的語詞拉到句子裡</h2>

        </div>

        <div class="container">
            <h1>我們公司叫做（ ) 教育平台</h1>
            <h1>TODO: 思考看看如何把單字與造句的配對 json 拉進來？</h1>
            
            <div class="wrong_ans btn btn-default">均衡</div>
            <div class="correct_ans btn btn-default">均一</div>
            <div class="wrong_ans btn btn-default">平均</div>
        </div>

        <div class="container">
            <div id="next" class="btn btn-lg btn-success">完成！</div>
        </div>

    </body>
    <script language="JavaScript" type="text/javascript">
        $("#next").hide();

        $( ".correct_ans" ).click(function() {
            alert( "答對了！ -> 這時候會把 log data 傳回均一" );
            $("#next").show();
        });
        $( ".wrong_ans" ).click(function() {
            alert( "答錯了！" );
        });

        $("#next").click(function(){
            alert("你已完成  ${dynamicHtml} 的練習！");
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