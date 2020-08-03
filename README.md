# Automated Chromium Cluster REST API

This project serves a REST api to automate task on list of webpage URL to gather data on chromium clusters.
Have you ever got stuck in data gathering process. This api can help you automating data gathering using a simple POST request. you can write your javascript method to retrieve anything that you want from the page.

## What you need to do?

Steps are very simple, just hit a rest api and customize your own script. thats all!

### REST Configuration

If i want to get title from wikipedia main page then.

`POST` method on `http://localhost:3000/api/trigger` [link](http://localhost:3000/api/trigger) with Request/Response as JSON.

**Request JSON**

``` json
{
    "data": [
        {
            "urlPath": "https://en.wikipedia.org/wiki/Main_Page",
            "urlData": {
                "anything": "awesome",
                "name": "Harsh"
            }
        }
    ]
}
```

write your own script [here](./server/static/script.js) at `/server/static/script.js` .

``` js
function hello() {
    return 'hello ';
}

/*     
executeHell method will automatically be executed and data would be returned back. 
urlData will be available to this method from the request JSON */
function executeHell({
    urlData
}) {
    return {
        title: document.title,
        useUrlData: hello() + urlData.name
    };
}
```

Whatever `executeHell()` returns will be collected in `executeResults` in response JSON.

**Response JSON**

``` json
{
    "pageResults": [
        {
            "urlPath": "https://en.wikipedia.org/wiki/Main_Page",
            "urlData": {
                "anything": "awesome",
                "name": "Harsh"
            },
            "executeResults": {
                "title": "Wikipedia, the free encyclopedia",
                "useUrlData": "hello Harsh"
            },
            "error": ""
        }
    ]
}
```

### Why this API?

If you have list of 'n' number of webpages to process and you want to execute certain task or retrieve any information then you can configure concurrency in `.env` and its done.

## Installation

clone repo

``` sh
git clone https://github.com/hashlucifer/automated-chromium-cluster.git
```

to install

``` sh
npm run installer
```

to start

``` sh
npm start
```

this will start the server at [locahost:3000](http://localhost:3000/api/trigger)

> don't forget to create `.env` take sample from `.env.SAMPLE`

``` dosini
NODE_ENV=local

#logger
LOGGER_LOCATION=./dumps/
LOGGER_FILE=mydump.log
LOGGER_LEVEL=debug

#server
SERVER_PORT=3000
SERVER_HOST=0.0.0.0
SERVER_STATIC_PATH=./static

#puppeteer concurrency
CONCURRENCY=1
# can be any hosted js example http://localhost:3000/script.js from static/script.js 
# make sure it has executeHell method otherwize change code in puppet/page.executor
PAGE_SCRIPT_LOCATION=http://localhost:3000/script.js
```

### Tools used

* Automation tool `puppeteer` and `puppeteer-cluster`
* ENV Loader `dotenv`
* Logger `winston`
* Log Rotation `winston-daily-rotate-file`

### Check wiki for more...
Check out the [wiki](https://github.com/hashlucifer/automated-chromium-cluster/wiki) page for more instructions
