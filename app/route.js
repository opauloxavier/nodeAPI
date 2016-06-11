var User = require('./models/user');
GLOBAL.request = require('request');

var lib=require('./library/lib');

module.exports = function(app){

    app.get('/api/champions/', function(req, res){
        lib.getChampionList(function(err, result){
            if(err){
              res.send(500, { error: err });
            } else {
              res.send(result);
            }
        });
    });
    
	app.get('/api/champions/f2p/', function(req, res){
        lib.getChampionList(function(err, result){
           if(err){
            res.send(500, { error: err });
           } else {
               var champList = JSON.parse(result);
               var freeToPlay = [];
               
               for(i=0;i < champList.champions.length;i++){
                   if(champList.champions[i].freeToPlay){
                       freeToPlay.push(champList.champions[i]);
                   }
               }
               res.send(freeToPlay);
           }
            
        });

	});
    
    app.get('/api/champions/:id',function(req,res){
       lib.getChampion(req.params.id,function(err,result){
           if(err){
            
               res.send(500, { error: err });
               
           } else {
            
               var champData = JSON.parse(result);
               
               res.send(champData);
           }
       });
        
        
    });

	app.get('*', function(req, res){
		res.json("Provavelmente uma rota incorreta!");
	});

};