# mailer-api
Simple api that use Node.Js &amp; Express with node mailer to send email via smtp

#### Error: self signed certificate
if you get Error: self signed certificate , add below line to your .ENV variables

```javascript
NODE_TLS_REJECT_UNAUTHORIZED='0'
```