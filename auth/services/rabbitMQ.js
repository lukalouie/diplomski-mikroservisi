var amqplib = require('amqplib/callback_api');

//var url = "amqp://default_user_GUOP6IHBHQW4GktwXCo:uYPnz5w8s5t02TmAT3NRNAebpeI8sjOu@poke.dev:5672";
var url = "amqps://regihlif:U_oYrlSjZtFPzBulpFYQY8EJ5cx5MVUO@cattle.rmq2.cloudamqp.com/regihlif"

function sendMessage(queue, msg){    
  amqplib.connect(url, function(err, con){
      if(err){
        console.log(err);
          throw err;
      }
  con.createChannel(function(chErr, chan){
      if(chErr){
        console.log(err)
          throw chErr;
      }
      chan.assertQueue(queue,{durable:false});
      chan.sendToQueue(queue, Buffer.from(msg));
      setTimeout(() => {
        con.close();    
      }, 500);          
  });
});
}

function receiveMessage(queue, callback) {
amqplib.connect(url, function(err, con){
  if(err){
      throw err;
  }
  con.createChannel(function(chErr, chan){
    if(chErr){
      console.log(err)
        throw chErr;
    }  
  chan.assertQueue(queue,{durable:false});
  chan.consume(queue, callback,{noAck:true});
 });
});
}

module.exports = {
  sendMessage,
  receiveMessage,
}