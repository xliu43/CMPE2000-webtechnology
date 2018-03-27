$(document).ready( function(){
  $('button').css({'transform': 'scale(1,1)'});
  //$('button').css({'transform': 'scale(1,1)'},2000);
  
  $("#btnGet").click(function(ev){
      
    var Name = 'Shane';
    var Score = 25;
    
    var getData = {}; // data to send
    //
    // Property names are dependant on web service
    getData['getName'] = Name; // property called getName = Shane
    getData['getScore'] = Score; // property called getScore = 25
    
    for( var item in getData)
      console.log( item + " : "  + getData[item]);
  
    // AJAX option properties ( minimum set )
    // url = where to send the request
    // type = GET|POST|PUT|DELETE // REST interface
    // data = what do we send ?? match the expected web service
    // datatype = what response are we expecting ? html/json/xml
    // success = callback for successful completion
    // error = callback for error in operation
    
    var url = '/~demo/cmpe2000/ica10_formtest.php';
    
    var ajaxOptions = {};
    ajaxOptions['url'] = url;
    ajaxOptions['type'] = 'GET';
    ajaxOptions['data'] = getData;
    ajaxOptions['datatype'] = 'html';
    
    var ajaxReq  = $.ajax( ajaxOptions );
    
    // if success, done will be invoked
    ajaxReq.done( function( ajaxData, responseStatus ){
      $("#divTarget").html( ajaxData ); //put response into div
      console.log(responseStatus);
    });
    
    // if error, fail will be invoked
    ajaxReq.fail( function( ajaxReqBack, textStatus, errorThrown ){
      console.log('GET:fail : ' + textStatus + " : " + errorThrown);
    });
    
    // always, like finally in c#
    ajaxReq.always( function( ajaxData, responseStatus ){
      console.log('GET:always');
    });
  });
  // END GET
  
  $('#btnPost').click(function(ev){
      
    var postData = {}; // post data to send
    
    postData['Name'] = 'Karun';
    
    var nums = []; // make array of numbers
    for (var i = 0, max = 10; i < max; i++) {
      nums.push( i * i );
    } // make phony data
    
    postData['NumNums'] = nums;
    
    // ---- could be a function below
    var url = '/~demo/cmpe2000/ica10_formtest.php';
    
    var options = {};
    options["url"] = url;
    options['type'] = 'POST';
    options['data'] = postData;
    options['dataType'] = 'html'; // json next time
    options['success'] = successCallback; // funct for success
    options['error'] = errorHandler;
    
    $.ajax( options ); // invoke our request
  });
});

function successCallback( responseData, responseStatus )
{
  $('#divTarget').html( responseData );
  $('#divTarget').append('</br>Response Status : ' + responseStatus);
}

function errorHandler( ajaxReq, textStatus, errorThrown )
{
  console.log('GET:fail : ' + textStatus + " : " + errorThrown);
}

