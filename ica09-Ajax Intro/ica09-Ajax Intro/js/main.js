// Your code here!
$(document).ready(function () {

    $('#btn_Get').click(function () {                    //dont forget the # for id 
        var data = {};
        data['Name'] = $('#nameInput').val();
        data['Hobby'] = $('#hobbyInput').val();
        data['HowMuch'] = $('#howMuchInput').val();

        var ajaxOptions = {};
        var url = "https://thor.net.nait.ca/~demo/cmpe2000/ica_Hobby.php";
        ajaxOptions['url'] = url;
        ajaxOptions['type'] = 'GET';
        ajaxOptions['data'] = data;
        ajaxOptions['datatype'] = 'html';

        var ajaxCallReturnObj = $.ajax(ajaxOptions);
        ajaxCallReturnObj.done(function (dataReturn,responseCode) {
            $('#returnData').html(dataReturn);
            console.log('Get Done: ' + responseCode);
        });
        ajaxCallReturnObj.fail(function (ajaxReqBack, textStatus, errorThrown) {
            console.log('Get failed: ' + textStatus + errorThrown);
        });
        ajaxCallReturnObj.always(function (ajaxData, responseStatus) {
            console.log('Always: ' + responseStatus);
        });
    });

    $('.range-selector').change(function () {
      /*  $('#btn_Table').val("Post to Make a " + $('.range-selector:first').val() + "*" + $('.range-selector:last').val());      */          //notice how to select elements from the class 
        $('#btn_Table').val("Post to Make a " + $('.range-selector:eq(0)').val() + "*" + $('.range-selector:last').val());                    //https://www.w3schools.com/jquery/jquery_ref_selectors.asp 
    });
    $('#btn_Table').click(function () {
        var data = {};
        console.log(data['RowCount'] = $('.range-selector:eq(0)').val());
        console.log(data['ColumnCount'] = $('.range-selector:eq(1)').val());
        var url = "https://thor.net.nait.ca/~demo/cmpe2000/ica_Table.php";



        function errorHandler(ajaxReq, textStatus, errorThrown) {
            alert('fail : ' + textStatus + " : " + errorThrown);
        }

        function successCallback(responseData, responseStatus) {
            $('#returnTable').html('');
            $('#returnTable').html(responseData);
            console.log('success: ' + responseStatus);
            alert('functiuon called');
        }

        AjaxRequest(url, 'POST', data, 'html', successCallback, errorHandler);


    });

});

function AjaxRequest(url,type,data,dataType,successFunction,errorFunction) {
    var ajaxOption = {};
   
    ajaxOption['url'] = url;
    ajaxOption['type'] = type;
    ajaxOption['data'] = data;
    ajaxOption['dataType'] = dataType;
    ajaxOption['success'] = successFunction;
    ajaxOption['error'] = errorFunction;
    $.ajax(ajaxOption);   
}


