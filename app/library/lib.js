//library functions
exports.raiseError = function(errorCode){
    errorCode = parseInt(errorCode);
    
    var responseCode;
    
    switch(errorCode){
            
        case 400:
            responseCode = "400 - This error indicates that there is a syntax error in the request and the request has therefore been denied. The client should not continue to make similar requests without modifying the syntax or the requests being made."
            break;
        case 403 || 401:
            responseCode = "401 or 403 - This error indicates that the API request being made did not contain the necessary authentication credentials and therefore the client was denied access. If authentication credentials were already included then the Unauthorized response indicates that authorization has been refused for those credentials. In the case of the API, authorization credentials refer to your API key.";
            break;
        case 404:
            responseCode = "404 - This error indicates that the server has not found a match for the API request being made. No indication is given whether the condition is temporary or permanent.";
            break;
        case 415:
            responseCode = "415 - This error indicates that the server is refusing to service the request because the body of the request is in a format that is not supported.";
            break;
        case 429:
            responseCode = "429 - This error indicates that the application has exhausted its maximum number of allotted API calls allowed for a given duration. If the client receives a Rate Limit Exceeded response the client should process this response and halt future API calls for the duration, in seconds, indicated by the Retry-After header. Due to the increased frequency of clients ignoring this response, applications that are in violation of this policy may be disabled to preserve the integrity of the API.";
            break;
        case 500:
            responseCode = "500 - This error indicates an unexpected condition or exception which prevented the server from fulfilling an API request.";
            break;
        case 503:
            responseCode = "503 - This error indicates the server is currently unavailable to handle requests because of an unknown reason. The Service Unavailable response implies a temporary condition which will be alleviated after some delay.";
            break;
        default:
            responseCode = "ok";
            break;
    }
    
    return errorCode,responseCode;
    
}
//tratar erro

exports.getChampionList = function(callback){
    request("https://br.api.pvp.net/api/lol/br/v1.2/champion?api_key="+apiKey,function(error,response,body){
        if(!error && response.statusCode == 200)
            callback(null,body);
        else 
            callback(null,{errorCode: response.statusCode, status: raiseError(response.statusCode)});
    });
};

exports.isJson = function(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};


exports.getChampion = function(idChamp,callback){
    request("https://global.api.pvp.net/api/lol/static-data/br/v1.2/champion/"+idChamp+"?locale=pt_BR&champData=info&api_key="+apiKey,function(error,response,body){
        if(!error && response.statusCode == 200)
            callback(null,body);
        else 
            callback(null,{errorCode: response.statusCode, status: "Deu ruim"});
    });
};