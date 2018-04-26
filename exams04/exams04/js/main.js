// Your code here!


function AjaxRequest(url, type, data, dataType, successFunction, errorFunction) {
    var ajaxOption = {};

    ajaxOption['url'] = url;
    ajaxOption['type'] = type;
    ajaxOption['data'] = data;
    ajaxOption['dataType'] = dataType;
    ajaxOption['success'] = successFunction;
    ajaxOption['error'] = errorFunction;
    $.ajax(ajaxOption);
}



$(document).ready(function () {
    $('#btnPartA').click(function () {
        var url = "https://thor.net.nait.ca/~demo/cmpe2000/labexam04.php";
        var type = "GET";
        var data = { 'part': 'A', 'name': 'Xiao_Liu' };
        var datatype = "html";
        var successFunction = Success;
        var errorFucntion = ErrorHandler; 

        AjaxRequest(url, type, data, datatype, successFunction, errorFucntion);

    });

    $('#btnPartB').click(function () {
        var url = "https://thor.net.nait.ca/~demo/cmpe2000/labexam04.php";
        var type = "GET";
        var data = { 'part':'B' };
        var datatype = "JSON";
        var successFunction = Success;
        var errorFucntion = ErrorHandler;

        AjaxRequest(url, type, data, datatype, successFunction, errorFucntion);

    });

    $('#btnPartC').click(function () {
        var url = "https://thor.net.nait.ca/~demo/cmpe2000/labexam04.php";
        var type = "POST";
        var data = { 'part': 'C', 'seed': ($('tbPartC').val())};
        var datatype = "JSON";
        var successFunction = SuccessPartC;
        var errorFucntion = ErrorHandler;

        AjaxRequest(url, type, data, datatype, successFunction, errorFucntion);

    });

    $('#btnPartD').click(function () {
        var url = "https://thor.net.nait.ca/~demo/cmpe2000/labexam04.php";
        var type = "POST";
        var data = { 'part': 'D', 'X': ($('tbPartDX').val()), 'Y': ($('tbPartDY').val()) };

        var datatype = "html";
        var successFunction = SuccessPartD;
        var errorFucntion = ErrorHandler;

        AjaxRequest(url, type, data, datatype, successFunction, errorFucntion);

    });




});

function ErrorHandler(ajaxReq, textStatus, errorThrown) {
    alert(textStatus);
    console.log(errorThrown);
}

function Success(responseData, responseStatus) {
    console.log('Sucess:' + responseStatus);
    var dataArray = responseData;
    var number1=$('#tbPartB_A').val(dataArray[0]);
    var number2=$('#tbPartB_B').val(dataArray[1]);
    var number3= $('#tbPartB_C').val(dataArray[2]);
    $('#lblPartB').html(Number($('#tbPartB_A').val()) + Number($('#tbPartB_B').val()) +Number( $('#tbPartB_C').val()));
}

function SuccessPartC(responseData, responseStatus) {
    console.log('Sucess:' + responseStatus);
    console.log('Sucess:' + responseData);
    var propertyObject = responseData;

    $('#divPartC').css('width', propertyObject['width'] );
    $('#divPartC').css('height', propertyObject['height'] );
    $('#divPartC').css('background-color', propertyObject['color']);

    var data = (responseData['width']);
   // $('#divPartC').text(responseData[0].width);

    console.log(Object.values(responseData));



}

function SuccessPartD(responseData, responseStatus) {
    console.log('Sucess:' + responseStatus);

    $('#inputAnswer').val("Sever says:" + responseData);
}










