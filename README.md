# Freezing Pharaoh
Search your YouTube history by the video content

## How to Use?
For first time user, since the HP IDOL API's transcribing process takes a long time, one needs to run /populate_videos first.
After running, the data including description and transcribed data will be cached into the system.

For detailed commercial API usage, check /api/services/YouTubeService.js file.

Keep reading for API provided by the Watched service.

## APIs Used
- HP IDOL OnDemand API
- YouTube API
- Google Voice Recognition API (iOS)
- Webkit Voice Recognition API (Web)

- Heroku Platform

## Watched REST APIs

### Search
#### Request
```
GET /search?q=query
```

#### Response
```
[
    {
        ...
    },
    {
        ...
    }
]
```

### PrePopulate (Transcribe) Videos
#### Request
```
GET /populate_videos
```

#### Response
```
{
    ...
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
