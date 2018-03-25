define([], function() {
  //Set up a temporary namespace
  var ajaxUtils = {};

  function getRequestObject() {
    if(window.XMLHttpRequest)
      return (new XMLHttpRequest());
    else
        window.alert("Ajax is not supported");
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
    request.setRequestHeader("X-CSRFToken", CSRF_TOKEN)
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
  return ajaxUtils
})
