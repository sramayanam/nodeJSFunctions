module.exports = async function (context, eventHubMessages) {
    context.log(`JavaScript eventhub trigger function called for message array ${eventHubMessages}`);
    eventHubMessages.forEach((message, index) => {
        var mydate = new Date(Date.parse(message.currentTime));
        var year = mydate.getYear() + 1900;
        var month = mydate.getMonth() + 1;
        var day = mydate.getDate();
        var hour = mydate.getHours();
        var sensorId = message.sensorTag;
        console.log("year:", mydate.getYear() + 1900);
        console.log("month:", mydate.getMonth() + 1);
        console.log("Day:", mydate.getDate());
        console.log("Hours:", mydate.getHours());
        message.sensorId = sensorId;
        message.year = year;
        message.month = month;
        message.day = day;
        message.hour = hour;
        context.log(`Processed message ${JSON.stringify(message)}`);
        context.bindings.outputDocument = JSON.stringify(message);
    });
};