(function(global) {
  //Set up a temporary namespace
  var ajaxUtils = {};

  function getRequestObject() {
    if(global.XMLHttpRequest)
      return (new XMLHttpRequest());
    else
        global.alert("Ajax is not supported");
  }

  //GET Request
  ajaxUtils.sendGetRequest = function(requestUrl, responseHandler) {
    var request = getRequestObject();
    request.onreadystatechange = function() {
      handleResponse(request, responseHandler);
    };
    request.open("GET", requestUrl, true);
    request.send(null); //For post only
  };

  //POST Request
  ajaxUtils.sendPostRequest = function(requestUrl, requestBody, responseHandler) {
    var request = getRequestObject();
    request.onreadystatechange = function() {
      handleResponse(request, responseHandler);
    };
    request.open("POST", requestUrl, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(requestBody);
  };
  //Only calls provided 'responseHandler'
  // function if response is ready
  //and not an error
  function handleResponse(request, responseHandler) {
    if (request.readyState == 4 &&  request.status == 200) {
      responseHandler(request);
    }
  }
  global.$ajaxUtils = ajaxUtils;
}(window))
