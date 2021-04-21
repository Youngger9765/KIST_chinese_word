
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
        #tabular-virtual-keyboard {
        min-width: 640px;
        box-shadow: 0 3px 6px rgba(51,51,51,0.16);
        display: table;
        padding: 0;
        margin: 0 auto;
        width: auto;
        color: #f1f1f1;
        background-color: #b7472a;
        border: 2px solid #b7472a;
        background: linear-gradient(to top, #b7472a 20px, #923922 56px);
        background: -webkit-linear-gradient(bottom, #b7472a 56px, #923922 20px);
        text-align: center;
        }

        #tabular-virtual-keyboard > .virtual-keyboard-row {
        display: table-row;
        text-align: center;
        }

        #tabular-virtual-keyboard > .virtual-keyboard-row > .virtual-keyboard-column {
        display: table-cell;
        vertical-align: middle;
        }


        .virtual-keyboard-button {
        box-shadow: 0 2px 3px rgba(51,51,51,0.30);
        border: 2px solid #923922;
        font-size: 18px;
        color: #f1f1f1;
        background-color: #b7472a;
        background: linear-gradient(to top, #923922 20px, #b7472a 20px);
        background: -webkit-linear-gradient(bottom, #923922 20px, #b7472a 20px);
        cursor: pointer;
        padding: 0;
        display: inline-block;
        margin: 4px;
        outline: 0;
        text-decoration: none;
        border-radius: 4px;
        width: 48px;
        height: 48px;
        text-shadow: -1px 1px 1px #333;
        transition: all .1s ease-out;
        }

        .virtual-keyboard-button:hover {
        border: 2px solid #f1f1f1;
        box-shadow: 0px 0px 10px rgba(241,241,241,0.30);
        }

        .virtual-keyboard-button:active,
        .virtual-keyboard-button:focus {
        background: #f1f1f1;
        color: #666;
        box-shadow: 0px 0px 10px rgba(241,241,241,0.30);
        text-shadow: 1px 0px 0px #333;
        }
    </style>
    <body>
        <div class="container">
            <h1>練習：${dynamicHtml} ${ans}</h1>
            <h1>輸入讀音</h1>
            <h2>請運用小鍵盤拼出正確的讀音</h2>
        </div>

        <div class="container">
            <div style='text-align: center;'>
                <h1>Virtual Keyboard v.1.0.2</h1>
            </div>
            <hr/>

            <table border='0' style='width: 100%;'>
            <tr>
                <td>
                <form class="form-horizontal" style='text-align: center;'>
                    <div class="form-group">
                        <label for="inputEmail3" class="control-label">注音:</label>
                        <input data-virtual-element type="text" class="form-control" id="input_val" placeholder="PIN">
                    </div>
                    
                </form>
                <div class="form-group">
                    <button id="submit_ans_btn" class="btn btn-default">送出</button>
                </div>
                </td>
                <td>
                <div id='tabular-virtual-keyboard'></div>
                </td>
            </tr>
            </table>
        </div>

        <div class="container">
            <div id="next" class="btn btn-lg btn-success">下一題</div>
        </div>
    </body>
    <script script language = "JavaScript" type = "text/javascript" >
        var VirtualKeyboard = {
        generate: function (target, matrix, language, uppercase = false) {
            var owner = this;

            for (var i = 0; i < matrix.length; i++) {
                var position = matrix[i];

                var vkr = document.createElement('div');
                vkr.setAttribute('class', 'virtual-keyboard-row');

                var vkc = document.createElement('div');
                vkc.setAttribute('class', 'virtual-keyboard-column');

                for (var j = 0; j < position.length; j++) {
                    var button = document.createElement('button');

                    switch (matrix[i][j]) {
                        case '+backspace':
                            button.innerHTML = '<i class="fa fa-fw fa-long-arrow-left"></i>';
                            button.setAttribute('data-trigger', 'backspace');
                            button.setAttribute('title', 'Backspace');
                            /* the slicing using timer */
                            var mouseTimerHandler = null;
                            button.addEventListener("mousedown", function (event) {

                                mouseTimerHandler = setInterval(function () {
                                    if (event.which == 1) {
                                        _lastElementFocused.value = _lastElementFocused.value.slice(0, -1);
                                    }
                                }, 200);
                            }, false);
                            button.addEventListener("mouseup", function () {
                                clearTimeout(mouseTimerHandler);
                            });
                            break;
                        case '+international':
                            button.innerHTML = '<i class="fa fa-fw fa-globe"></i>';
                            button.setAttribute('data-trigger', 'international');
                            button.setAttribute('title', 'International');
                            break;
                        case '+shift':
                            button.innerHTML = '<i class="fa fa-fw fa-arrow-up"></i>';
                            button.setAttribute('data-trigger', 'shift');
                            button.setAttribute('title', 'Shift');
                            break;
                        case '+space':
                            button.innerHTML = '&nbsp;';
                            button.setAttribute('data-trigger', 'space');
                            button.setAttribute('title', 'Space');
                            button.style.width = '75%';
                            break;

                        default:
                            button.innerText = uppercase ? (matrix[i][j]).toUpperCase() : matrix[i][j];
                            break;
                    }

                    button.setAttribute('class', 'virtual-keyboard-button');
                    button.addEventListener('click', function () {
                        _lastElementFocused.focus();
                        var x = this.getAttribute('data-trigger');
                        if (x != null) {
                            switch (x) {
                                case 'backspace':
                                    _lastElementFocused.value = _lastElementFocused.value.slice(0, -1);
                                    break;
                                case 'international':
                                    var reversed = language === 'en' ? 'ru' : 'en';
                                    target.innerHTML = '';
                                    owner.generate(target, owner.getMatrix(reversed), reversed);
                                    break;
                                case 'space':
                                    _lastElementFocused.value = _lastElementFocused.value + ' ';
                                    break;
                                case 'shift':
                                    var u = uppercase === true ? false : true;
                                    target.innerHTML = '';
                                    owner.generate(target, owner.getMatrix(language), language, u);
                                    break;
                            }
                        }
                        else {
                            _lastElementFocused.value = _lastElementFocused.value + this.innerText;
                        }
                    });
                    vkc.appendChild(button);

                    vkr.appendChild(vkc);
                    target.appendChild(vkr);
                }
            }
        },
        getMatrix: function (language) {
            var matrix = {
                en: [
                    ['ㄅ', 'ㄉ', 'ˇ', 'ˋ', 'ㄓ', 'ˊ', '˙', 'ㄚ', 'ㄞ', 'ㄢ', 'ㄦ'],
                    ['ㄆ', 'ㄊ', 'ㄍ', 'ㄐ', 'ㄔ', 'ㄗ', 'ㄧ', 'ㄛ', 'ㄟ', 'ㄣ'],
                    ['ㄇ', 'ㄋ', 'ㄎ', 'ㄑ', 'ㄕ', 'ㄘ', 'ㄨ', 'ㄜ', 'ㄠ', 'ㄤ'],
                    ['ㄈ', 'ㄌ', 'ㄏ', 'ㄒ', 'ㄖ', 'ㄙ', 'ㄩ', 'ㄝ', 'ㄡ', 'ㄥ'],
                    ['+shift', '+space', '+international']
                ],
                ru: [
                    ['ㄅ', 'ㄉ', 'ˇ', 'ˋ', 'ㄓ', 'ˊ', '˙', 'ㄚ', 'ㄞ', 'ㄢ', 'ㄦ', '+backspace'],
                    ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '-'],
                    ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '+'],
                    ['@', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'ё', '.', '_'],
                    ['+shift', '+space', '+international']
                ]
            };
            return matrix[language];
        },
        init: function (args) {
            if (args != undefined && args != null) {
                if (Object.keys(args).length > 0) {
                    var owner = this;

                    window._lastElementFocused = null;

                    var target = document.getElementById(args['targetId']);
                    var language = args['defaultLanguage'];
                    var elements = document.querySelectorAll(args['inputSelector']);

                    _lastElementFocused = elements[0];

                    for (var i = 0; i < elements.length; i++) {
                        elements[i].addEventListener('focus', function () {
                            _lastElementFocused = this;
                        });
                    }
                    owner.generate(target, owner.getMatrix(language), language);
                }
            }
        }
    }

    VirtualKeyboard.init({ targetId: 'tabular-virtual-keyboard', defaultLanguage: 'en', inputSelector: '[data-virtual-element]' });
    </script >

    <script>
        $("#submit_ans_btn").click(function(){
            input_value = $('#input_val').val();
            if (input_value == '${ans}') {
                alert('答對了');
                $("#next").show();

            } else {
                alert('答錯了');
            }
        });

        $("#next").click(function(){
            window.location = "https://dpnu7opif2.execute-api.us-east-1.amazonaws.com/dev/landing-page-3?name=${dynamicHtml}&ans=${ans}";
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