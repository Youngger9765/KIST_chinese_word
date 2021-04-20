
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
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap-theme.min.css" integrity="sha384-6pzBo3FDv/PJ8r2KRkGHifhEocL+1X2rVCTTkUfGk7/0pbek5mMa1upzvWbrUbOZ" crossorigin="anonymous">
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>

        <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
        <link rel="stylesheet" type="text/css" href="style.css">

        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js"></script>
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/jquery-ui.min.js"></script>
    
        </head>
    <style>
        h1 { color: #73757d; }
        /* Add some margin to the page and set a default font and colour */

        body {
        margin: 30px;
        font-family: "Georgia", serif;
        line-height: 1.8em;
        color: #333;
        }

        /* Give headings their own font */

        h1, h2, h3, h4 {
        font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
        }

        /* Main content area */

        #content {
        margin: 0;
        text-align: center;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        }

        /* Header/footer boxes */

        .wideBox {
        clear: both;
        text-align: center;
        margin: 70px;
        padding: 10px;
        background: #ebedf2;
        border: 1px solid #333;
        }

        .wideBox h1 {
        font-weight: bold;
        margin: 20px;
        color: #666;
        font-size: 1.5em;
        }

        /* Slots for final card positions */

        #cardSlots {
        margin: 0 auto 3em auto;
        background: antiquewhite;
        float: right;
        }

        /* The initial pile of unsorted cards */

        #cardPile {
        width: 25%;
        height: 50%;
        margin: 0 auto;
        background: darkseagreen;
        float: left;
        }

        #cardSlots {
        width: 70%;
        height: 50%;
        padding: .85em;
        border: 2px solid #333;
        -moz-border-radius: 10px;
        -webkit-border-radius: 10px;
        border-radius: 10px;
        -moz-box-shadow: 0 0 .3em rgba(0, 0, 0, .8);
        -webkit-box-shadow: 0 0 .3em rgba(0, 0, 0, .8);
        box-shadow: 0 0 .3em rgba(0, 0, 0, .8);
        }

        /* Individual cards and slots */

        #cardSlots div, #cardPile div {
        float: left;
        width: 100%;
        height: 30%;
        padding: .85em;
        padding-top: 40px;
        padding-bottom: 0;
        border: 2px solid #333;
        -moz-border-radius: 10px;
        -webkit-border-radius: 10px;
        border-radius: 10px;
        margin: 10px 0 0 10px;
        background: #fff;
        }

        #cardPile div {
            width: 50%;
        }

        /*#cardSlots div:first-child, #cardPile div:first-child {
        margin-left: 0;
        }*/

        #cardSlots div.hovered {
        background: #aaa;
        }

        #cardSlots div {
        border-style: dashed;
        }

        #cardPile div {
        background: #666;
        color: #fff;
        font-size: 1em;
        text-shadow: 0 0 3px #000;
        text-align: center;
        }

        #cardPile div.ui-draggable-dragging {
        -moz-box-shadow: 0 0 .5em rgba(0, 0, 0, .8);
        -webkit-box-shadow: 0 0 .5em rgba(0, 0, 0, .8);
        box-shadow: 0 0 .5em rgba(0, 0, 0, .8);
        }

        /* Individually coloured cards */

        #card1.correct { background: red; }
        #card2.correct { background: brown; }
        #card3.correct { background: orange; }
        #card4.correct { background: yellow; }
        #card5.correct { background: green; }
        #card6.correct { background: cyan; }
        #card7.correct { background: blue; }
        #card8.correct { background: indigo; }
        #card9.correct { background: purple; }
        #card10.correct { background: violet; }


        /* "You did it!" message */
        #successMessage {
        position: absolute;
        left: 580px;
        top: 250px;
        width: 0;
        height: 0;
        z-index: 100;
        background: #dfd;
        border: 2px solid #333;
        -moz-border-radius: 10px;
        -webkit-border-radius: 10px;
        border-radius: 10px;
        -moz-box-shadow: .3em .3em .5em rgba(0, 0, 0, .8);
        -webkit-box-shadow: .3em .3em .5em rgba(0, 0, 0, .8);
        box-shadow: .3em .3em .5em rgba(0, 0, 0, .8);
        padding: 20px;
        }
    </style>
    <body>
        <div class="container">
            <h1>練習：${dynamicHtml}</h1>
            <h1>詞意選配</h1>
            <h2>請仔細閱讀語詞卡片，並進行配對</h2>

        </div>

        <div class="container">
            <h1>TODO: 連連看！</h1>

            <div id="content">

                <div id="cardPile"> </div>
                <div id="cardSlots"> </div>

                <div id="successMessage">
                    <h2>Congratulations!</h2>
                    <button onclick="init()">Play Again</button>
                </div>

            </div>

        </div>

        <div class="container">
            <div id="next" class="btn btn-lg btn-success">下一題</div>
        </div>

    </body>

    <script language="JavaScript" type="text/javascript">
        var correctCards = 0;
        $( init );

        function init() {
            $('#next').hide();

            // Hide the success message
            $('#successMessage').hide();
            $('#successMessage').css( {
                left: '580px',
                top: '250px',
                width: 0,
                height: 0
            } );

            // Reset the game
            correctCards = 0;
            $('#cardPile').html( '' );
            $('#cardSlots').html( '' );

            // Create the pile of shuffled cards
            var numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
            var terms = [
                '均ㄧ',
                '均衡',
                '平均' 
            ];
            <!--numbers.sort( function() { return Math.random() - .5 } );-->

            for ( var i=0; i<3; i++ ) {
                $('<div>' + terms[i] + '</div>').data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#cardPile' ).draggable( {

                stack: '#cardPile div',
                cursor: 'move',
                revert: true
                } );
            }

            // Create the card slots
            var words = [ 
                '()教育平台', 
                '每天()五蔬果',
                '()每五人就有一人中獎' 
            ];
            for ( var i=1; i<=3; i++ ) {
                $('<div>' + words[i-1] + '</div>').data( 'number', i ).appendTo( '#cardSlots' ).droppable( {
                accept: '#cardPile div',
                hoverClass: 'hovered',
                drop: handleCardDrop
                } );
            }

            }

            function handleCardDrop( event, ui ) {
            var slotNumber = $(this).data( 'number' );
            var cardNumber = ui.draggable.data( 'number' );

            // If the card was dropped to the correct slot,
            // change the card colour, position it directly
            // on top of the slot, and prevent it being dragged
            // again

            if ( slotNumber == cardNumber ) {
                ui.draggable.addClass( 'correct' );
                ui.draggable.draggable( 'disable' );
                $(this).droppable( 'disable' );
                ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
                ui.draggable.draggable( 'option', 'revert', false );
                correctCards++;
            }

            // If all the cards have been placed correctly then display a message
            // and reset the cards for another go

            if ( correctCards == 3 ) {
                $('#successMessage').hide();
                $('#successMessage').animate( {
                left: '380px',
                top: '200px',
                width: '400px',
                height: '100px',
                opacity: 1
                } );

                $('#next').show();
            }

        }
    </script>

    <script language="JavaScript" type="text/javascript">
        
        $("#next").click(function(){
            window.location = "https://dpnu7opif2.execute-api.us-east-1.amazonaws.com/dev/landing-page-6?name=${dynamicHtml}&ans=${ans}";
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