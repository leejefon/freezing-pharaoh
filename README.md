# Freezing Pharaoh
Search your YouTube history by the video content

## APIs Used
- HP IDOL OnDemand API
- YouTube API
- Google Voice Recognition API (iOS)
- Webkit Voice Recognition API (Web)

- Heroku Platform

## REST APIs

### Search
#### Request
```
GET /search?q=query
```

#### Response
```
{
    status: 'OK',
    data: [
        ...
    ]
}
```


### Transcribe Video
#### Request
```
GET /transcribe?title=TITLE&url=URL
```

#### Response
```
{
    jobid: '---jobid---'
}
```


### Check Transcribe Job Status
#### Request
```
GET /transcribe/status/jobid
```

#### Response
```
{
    results: ...
}
```
