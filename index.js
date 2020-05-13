let appInsights = require("applicationinsights");
appInsights.setup("a555e061-6101-48ee-8728-23f203518eaa")
  .setAutoDependencyCorrelation(true)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true, true)
  .setAutoCollectExceptions(true)
  .setAutoCollectDependencies(true)
  .setAutoCollectConsole(true)
  .setUseDiskRetryCaching(true)
  .setSendLiveMetrics(true)
  .setDistributedTracingMode(appInsights.DistributedTracingModes.AI)
  .start();

let client = appInsights.defaultClient;

const port = 8080;
const express = require('express');
const http = require('http');
const app = express();
const server = http.Server(app);
server.listen(port, () => console.log('listenting on port', port));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello, Azure.' })
});

app.get('/error', (req, res) => {
  try {
    const wrong = 1
    wrong = 2
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
  res.json({ message: '' })
});

app.get('/custom', (req, res) => {
  res.json({ message: 'custom even send' })
  client.trackEvent({
    name: "my custom event",
    properties: { customProperty: "custom property value" }
  });
});
