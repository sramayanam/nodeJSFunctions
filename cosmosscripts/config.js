exports.connection = {
      endpoint: process.env.COSMOS_SAMPLE_ENDPOINT || "https://scrcosmosdb.documents.azure.com:443/",
      authKey: process.env.COSMOS_SAMPLE_ENDPOINT ||
          "JWHOgD669BIaVAdkur8QVEzRn8b9D1p7xzFCZ4eoFviXcBtcxMbHDj5ftKttwewWzRunJBWIk1iVjBgGtbfHmA=="
  };
  
  if (exports.connection.endpoint.includes("https://localhost")) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }
  
  exports.names = {
      database: "iot",
      container: "sensordata"
  };