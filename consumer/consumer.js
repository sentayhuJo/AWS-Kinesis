
const AWS = require('aws-sdk');
const config = require('../config');

let kinesis = new AWS.Kinesis( { region: config.kinesis.region } );

kinesis.describeStream({
  StreamName: config.clickStreamProducer.stream
}, (err, streamData) => {
  err ? console.log(err, err.stack) : // an error occurred
    streamData.StreamDescription.Shards.forEach(shard => {
      kinesis.getShardIterator({
        ShardId: shard.ShardId,
        ShardIteratorType: 'TRIM_HORIZON',
        StreamName: config.clickStreamProducer.stream
      }, (err, shardIteratordata) => {
        err ? console.log(err, err.stack) :// an error occurred
        kinesis.getRecords({ //successful response
          ShardIterator: shardIteratordata.ShardIterator
        }, (err, recordsData) => {
          err ? console.log(err, err.stack) : // an error occurred
            console.log(recordsData); // successful response
          });
      });
    });
});