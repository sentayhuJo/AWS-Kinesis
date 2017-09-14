const AWS = require('aws-sdk');
const config = require('../config');

let kinesis = new AWS.Kinesis( { region: config.kinesis.region } );

kinesis.putRecord({
  Data: '{ "action": "click", "productId": "product-123" } ',
  PartitionKey: 'user-123', 
  StreamName: config.clickStreamProducer.stream
}, (err, data) => 
  err ? console.log(err, err.stack) : console.log(data) // successful response
);