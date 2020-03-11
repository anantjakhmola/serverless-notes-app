export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
      REGION: "ap-south-1",
      BUCKET: "anant-app-upload"
    },
    apiGateway: {
      REGION: "ap-south-1",
      URL: "https://57galy01fh.execute-api.ap-south-1.amazonaws.com/prod"
    },
    cognito: {
      REGION: "ap-south-1",
      USER_POOL_ID: "ap-south-1_MBORALG0v",
      APP_CLIENT_ID: "1oaut994qi4jvhtqh1j1i7as2v",
      IDENTITY_POOL_ID: "ap-south-1:adb24e84-f29b-4086-bd90-18262ada5bf2"
    }
  };
  