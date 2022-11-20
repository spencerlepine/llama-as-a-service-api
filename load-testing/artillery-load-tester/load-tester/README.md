# LaaS Load Tester (Manual Configuration)

Load testing the [LaaS API](https://github.com/spencerlepine/laas-api) using [Artillery](https://github.com/artilleryio/artillery)

## Usage
- Start the API server (in seperate terminal)
- Run the following commands to execute the load test
  ```sh
  # $ yarn run start testing.yml --output report.json && yarn run report report.json
  $ yarn run start config.yml --output report.json && yarn run report report.json
  # open "report.json.html" in the browser
  ```