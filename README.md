# nexrender-action-upload-s3-presigned
Upload to AWS S3 given a presignedUrl with `putObject` permissions

## Install

`npm install nexrender-action-upload-s3-presigned@latest`

## How to use

1. Add this module to `postrender`
2. in params provide `url` 
2. optionally configure a `content_type`, the plugin will first try to take the content-type from the `url`, if not, it will take it from the param


```json
{
    "template": {
            "src": "https://example.com/templates/ae-template-to-use.aep",
            "composition": "my_composition"
        },
    "assets": [],
    "actions": {
        "postrender": [
            {
                "module": "nexrender-action-upload-s3-presigned",
                "input": "output.mp4",
                "params": {
                    "url": "https://some-bucket.s3.us-west-2.amazonaws.com/some.jpg?X-Amz-Algorithm=SHA256&X-Amz-Credential=XXX%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211114T141656Z&X-Amz-Expires=3600&Content-Type=text%2Fplain&X-Amz-SignedHeaders=host&X-Amz-Signature=8497XXX",
                    "content_type": "video/mp4"
                }
            }
        ]
    }
}
```
