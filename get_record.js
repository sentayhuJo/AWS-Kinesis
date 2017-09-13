
const AWS = require('aws-sdk');
const config = require('./config');

let kinesis = new AWS.Kinesis({region: config.kinesis.region});

kinesis.describeStream({
  StreamName: config.clickStreamProducer.stream
}, (err, streamData) => {
  if (err) {
    console.log(err, err.stack); // an error occurred
  } else {
    console.log(streamData); // successful response
    streamData.StreamDescription.Shards.forEach(shard => {
      kinesis.getShardIterator({
        ShardId: shard.ShardId,
        ShardIteratorType: 'TRIM_HORIZON',
        StreamName: config.clickStreamProducer.stream
      }, (err, shardIteratordata) => {
        if (err) {
          console.log(err, err.stack); // an error occurred
        } else {
          console.log(shardIteratordata); // successful response
          kinesis.getRecords({
            ShardIterator: shardIteratordata.ShardIterator
          }, (err, recordsData) => {
            if (err) {
              console.log(err, err.stack); // an error occurred
            } else {
              console.log(recordsData); // successful response
            }
          });
        }
      });
    });
  }
});