import AWS from 'aws-sdk';

AWS.config.region = 'us-west-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-west-1:f43e45a3-2e1c-46d2-94d5-23c52d5aadb6',
});

// Create a CloudWatchLogs service object
var cloudwatchlogs = new AWS.CloudWatchLogs({apiVersion: '2014-03-28'});

function handleError(error) {
    console.error(error);

    var params = {
        logEvents: [{
            message: JSON.stringify(error), 
            timestamp: Date.now()
        }],
        logGroupName: 'frontend', 
        logStreamName: 'schedule'
    };

    cloudwatchlogs.putLogEvents(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
    });
}

export default handleError;
