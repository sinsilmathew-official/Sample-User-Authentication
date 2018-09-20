# Sample-User-Authentication
For Run the Application set the following environment variables

1. Setting PORT

Ubuntu -- export PORT=3000
Windows -- set PORT=300

2.Setting MongoDB 

Ubuntu -- export MONGO_URL="mongodb://localhost:27017/db_name"

Windows -- set MONGO_URL=mongodb://localhost:27017/db_name

3.Setting Email configuration (SendGrid)

Ubuntu -- export SENDGRID_API_KEY="your secret api key"

Windows -- set SENDGRID_API_KEY=your secret api key


Code Base Contain API DOCS inside apidocument folder

OR RUN API DOC Using

apidoc -i C:\path-to-application-routefolder\routes\ -o C:\path-to-apidocfolder\apidocument\

