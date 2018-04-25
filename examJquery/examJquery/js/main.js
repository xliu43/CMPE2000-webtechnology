// Your code here!
$(document).ready(function () {
    $('#btnPartA').click(function () {
        alert("partA processing");
        $(this).text("Part A Complte");
        $('.question:eq(1)').css('background-color', '#0FF');
        $('#divPartA').css('text-align', 'center');

    });

    $('#btnPartB').click(function () {
        var answer = 0;
        var Op1 = Number($('#rOperand1').val());
        var Op2 = Number($('#rOperand2').val());
        var Op3 = Number($('#rOperand3').val());

        answer = ((Op1 + Op2) / Op3).toFixed(2);
        $('#lblPartBOutput').html(answer);

        if (answer % 1 === 0) {

            $('#lblPartBOutput').css('color', 'green');
        }
        else 
            $('#lblPartBOutput').css('color', 'red');
       


    });


    $('#btnPartD').click(function () {

       // typingState = true;
      //  $(this).text('Typing');
     

        if (typingState == false) {
            timerID = window.setInterval(AddChar, 60);
            typingState = true;
            $(this).text('Typing');
            
        }
        else
        {
            window.clearInterval(timerID);
            typingState = false;
            $(this).text('Type');
           
        }
            


    });


    $('input[name=rbPartE]').change(function () {
        var src = $('input[name=rbPartE]').sc
        $('#imgPartE').Attr('src', '$('input[name = rbPartE]')');
    });
   

});





//var typingState = false;
//var TimerID = -1;
//var counter=0

//function AddChar() {
//    counter++;
//    $('#lblPartD').append(makeid());
//    if (counter%8==0) {
//        $('#lblPartD').append(' ');
//    }

//    if (counter == 50)
//    {
//        window.clearInterval(timerID);
//        $(this).text('Type');
//        counter = 0;
//        $('#lblPartD').empty();
//        $('#btnPartD').hide();

//    }
    


//}

//function makeid() {
//    var char = "";
//    var possible = "abcdefghijklmnopqrstuvwxyz";

   
//     char= possible.charAt(Math.floor(Math.random() * possible.length));

//     return char;
//}