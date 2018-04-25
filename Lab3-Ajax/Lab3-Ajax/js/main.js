// Your code here!
$(document).ready(function () {
    $("#btnGetAll").click(ProcessGetAll);
    $("#btnAddTag").click(ProcessAddTag);


});



function AjaxRequest(url, type, data, dataType, successFunction, errorFunction) {
    var ajaxOption = {};

    ajaxOption['url'] = url;
    ajaxOption['type'] = type; //'POST'
    ajaxOption['data'] = data;  // {"xxx":"sdfddf",}
    ajaxOption['dataType'] = dataType;
    ajaxOption['success'] = successFunction;
    ajaxOption['error'] = errorFunction;
    $.ajax(ajaxOption);
};


function ProcessAddTag () {
    var minValue = parseInt($("#MinimumInput").val());
    var maxValue = parseInt($("#MaximumInput").val());
    var tag = $("#TagNameInput").val();
    if (isNaN(minValue)) {
        $("#MinimumInput").css("background-color", "red");
        $("#MinimumInput").focus();
        return;
    }
    else {
        $("#MinimumInput").css("background-color", "#66ff66");
    }
    if (isNaN(maxValue)) {
        $("#MaximumInput").css("background-color", "red");
        $("#MaximumInput").focus();
        return;
    } else {
        $("#MaximumInput").css("background-color", "#66ff66");
    }

    if (tag.length === 0) {
        $("#TagNameInput").css("background-color", "red");
        $("#TagNameInput").focus();
        return;
    }
    else {
        $("#TagNameInput").css("background-color", "#66ff66");
    }
    if (minValue > maxValue) {
        alert(" your minimum is higher than your max value");
        $("#MinimumInput").css("background-color", "red");
        $("#MinimumInput").focus();
        return;
    }
  
    var url = "https://thor.net.nait.ca/~demo/cmpe2000/lab03_webservice.php";
    var type = 'POST';
    var dataType = 'JSON';
    var data =  {'action': 'add', 'tagDesc': tag, 'tagMin': minValue, 'tagMax': maxValue };
    var successFunction = ShowAllTags;
    var errorFunction = ErrorCall;
    AjaxRequest(url, type, data, dataType, successFunction, errorFunction);
}





function ProcessGetAll() {
    alert('Processing');
    var url = "https://thor.net.nait.ca/~demo/cmpe2000/lab03_webservice.php";
    var type = 'POST';
    var dataType = 'json';
    var data = { "tagId": "all" };
    var successFunction = ShowAllTags;
    var errorFunction = ErrorCall;
    AjaxRequest(url, type, data, dataType, successFunction, errorFunction);
}


function ShowAllTags(responseData, status) {
    //Put succes into console to know it fired successfully
    console.log("Success: Get");
    console.log(responseData);
    $("#Status").html("Status: " + status);
    //Access the data properties
    var data = responseData['data'];  // an array of objects each object has 4 properties 
    //Empty table
    $("#outputTable").empty();
    var header = $("#TableHead");
    header.empty();

    ////Table Header
    //for (var i = 0; i < Object.keys(responseData["data"][0]).length; i++) {
    //    var th = document.createElement("th");
    //    var head = document.createTextNode(Object.keys(responseData["data"][0])[i]);
    //    th.appendChild(head);
    //    header.append(th);
    //}
    //generate table body
    for (var i = 0; i < data.length; i++) {
        var tr = document.createElement("tr");
        var tableColumn = data[i];
        for (var element in tableColumn) {
            var td = document.createElement("td");
            var item = document.createTextNode(tableColumn[element]);
            td.appendChild(item);
            tr.appendChild(td);

        }
        $("#outputTable").append(tr);
    }




}


function ErrorCall(response, status, error) {
    console.log("Error: GET Failed |" + " Response: " + response);
    $('#Status').val(status);
}