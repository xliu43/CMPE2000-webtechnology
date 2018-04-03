// Your code here!
//Honda, Toyota, BMW, Suzuki, Yamaha
var manufacturerArray = ['Honda', 'Toyota', 'BMW', 'Suzuki', 'Yamaha'];
//car, truck, motorcycle and mpv
var typeArray = ['car', 'truck', 'motorcycle', 'mpv'];

$(document).ready(function () {
    //buliding select options elements 
    for (var i = 0; i < manufacturerArray.length; i++) {
        //$('#sel_Manufacturer').append(' <option value="volvo">Volvo</option>')
        $('#sel_Manufacturer').append(' <option value=' + '"' + manufacturerArray[i] + '">' + manufacturerArray[i] + '</option>');
    }

    for (var i = 1990; i < 2018; i++) {
        $('#sel_Year').append(' <option value=' + '"' + i.toString() + '">' + i.toString() + '</option>');
    }
    for (var i = 0; i < typeArray.length; i++) {
        $('#sel_Type').append(' <option value=' + '"' + typeArray[i] + '">' + typeArray[i] + '</option>');
    }
    $('#sel_Manufacturer').change(RequestModels);
    $('#btn_InvokeRequest').click(RequestModels);
});

function RequestModels() {
    alert('processing...');
    var url = "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/" + $('#sel_Manufacturer').val() + "/modelyear/" + $('#sel_Year').val() + "/vehicletype/" + $('#sel_Type').val() + "?format=json";
    $.ajax({
        url: url,
        type: "Get",
        dataType: "json",
        success: PopulateModels,
        error: ErrorHandler
    });

    $('#div_Status').html('Request for <br>' + url + '<br> issued, Please Wait');
    console.log(url);
     


};



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

function PopulateModels(responseData, responseStatus) {
    var count = responseData['Count'];
    var message = responseData['Message'];
    var searchCriteria = responseData['SearchCriteria'];
    var resultsArray = responseData['Results'];

    $('#div_Status').html('');
    $('#div_Status').html(responseStatus + '<br>' + count + '<br>' + message + '<br>' + searchCriteria);

    //Process resultsArray 
    for (var i = 0; i < resultsArray.length; i++) {
        $('div_Ouput').append('<div></div>')
    }

}

function ErrorHandler(ajaxReq, textStatus, errorThrown) {
    $('#div_Status').html('');
    $('#div_Status').html(textStatus + errorThrown);
}

