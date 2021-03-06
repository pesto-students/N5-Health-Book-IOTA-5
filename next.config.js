const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
// const { withSentryConfig } = require("@sentry/nextjs");

// const SentryWebpackPluginOptions = {
//   // Additional config options for the Sentry Webpack plugin. Keep in mind that
//   // the following options are set automatically, and overriding them is not
//   // recommended:
//   //   release, url, org, project, authToken, configFile, stripPrefix,
//   //   urlPrefix, include, ignore

//   silent: true, // Suppresses all logs
//   // For all available options, see:
//   // https://github.com/getsentry/sentry-webpack-plugin#options.
// };
module.exports= (phase, { defaultConfig }) => {
  console.log("phase",phase);
  // console.log(defaultConfig);
  if (phase === PHASE_DEVELOPMENT_SERVER) {  

    return {
      webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Important: return the modified config
        console.log("dev phase",dev);
        return config;
      },    
      env: {
        API: 'http://localhost:3000',
        GCID: '26122348563-5sb0k4cg489bs2t7bo47uf253e1muokb.apps.googleusercontent.com',
        FB_APP_ID:'423291018981918',
        PRIVATE_KEY:'-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQCULmnZuNMUWvn4\n3s98Zu6VEtSmTub/u0yu0xvSvkjOK/g15qUCBaPJQkTBQ+DE8H1fdSJF9GPqDQOh\n3+u4VHjN3bmnlvh3giVn3I+be5/V3tnOCcEn+KC5i7dsUoEWWmUbiN+T5ilxonHz\n2wzNyHjdb0fR/vqU6+Rxqx7P2HniujCZ6c6Hsnl4LKGfVRuTLrmf0Yx0SFCXYWqo\nofWsb2GzwY2Q/OHfWIBJgaMS+jbphViJEEvd9r8ZF5WgXhpbT6i3dOEST36S/Riz\nElCkArFuwpJH5VkEOo098cHmHkSBeTWMMsqM1gziEingIBCue/uP35c9pgyNQ6bx\n9R20AHzRAgMBAAECgf9hrTaZDfwVruKX6kda+X7LRV5nQhuC9zPVCdONV2EmhlVX\nMnISoyUTxVsNCnFfYCdEhTHSawZxgaKjUbdQCl6XVVDL5/hgzqlZjUocc6EomX15\nE3T/pCROKor+HGR7F5sOS2sVUuJ+xVXYKMyH2V3SmUf+ZNVI1TYAt4vX9hpiGNiM\nzqABdLB/yB+8R2PyyIoP52A63KEuqDvucnFoVWi2i+TxfHUvLJtfCkCXCm+vUWhl\nqemtpSX5aLQkEHOz0RdlcCSIFIV1WdCdZ95UDcDaQVKNKITwGdiRDNY5Jpqy6ulm\nRl8TYDBD4M/G2P53yTbTgW65Dh67gECwd+LoBjECgYEAyLcj8I9iZqccgFDBoL0y\nd1tNYhbgo420EWM4wy8UV82NnzUUBTNlynQE6k7oyFlfmA2Ydtg7NlKjbIjc8Xv7\nJ0Uml8MO6mm9P1+qJqXgNucWE0SDfcD368tfWxSlIWxw8iJ5cYAZwb+biDeNIBWS\n9le7PIYJdzYxX5UrZmQwx+kCgYEAvP78NwAnk3QwLiz4K/wG5ZVigWRAERhplpOk\njVpsYjIfScaprQF13xqrLuXBv2HfEbJaKLL3V0pZV6pAKl03PHo5v04n2L+hSIA0\nOxVjNUSIM3RuQ8raSHJZqMYdPRmM1hWf5+C+7T5taawf/ia1Kjdt6t5Qly3tg2A+\nytgZ5KkCgYBHUoy61riosYk3L3semxxrvU3qJSb990SdSRzKfthDuw8wG7RZhMIP\nBtsYR6IAT4HgjjQ3Ru8Dhqn7z0ZzqRK+CZyFIRMTyS8ubdgQk7Dw0XzOq/Htpbxz\nVXk07Ekhb19TK1zsMBD3ABdMeDD1zbTDRLmL8DU830z8Ig2h/Mg4wQKBgGP9f5DV\nyxpvQUJc1lvm9fsnIruUP3UL9mkM6eVDLs5w+C6/JWv7ttH3uRORyQSpEiy5sIuR\ny9xp4ITJ9TK0qJGdlMnK3rgFAp5p/bg4o4k+HdUjR2ckfoIPxbHORw/ZYbKuNDCo\nrjq0aYyb3T1IW1bfho7ZWcfyK5PzKqWE2YYpAoGANgWRlzYN+57KCcZGZDncnc1c\nKWhJ1ycdrUaQwj7TudHRWyzSmvjVdzCusZp+yrO/fUkfHQRIrTfbnoI9cC9JtF0M\nvUcglHfInWbSwwFgOiBul+Ry2vSoZj5kB7Fx6vBbwIBVu1eswN9MUjAdINIEMABj\na5075lBYQu6u2xoTb8w=\n-----END PRIVATE KEY-----\n',
        CLIENT_EMAIL:'firebase-adminsdk-3medk@next-firebase-66632.iam.gserviceaccount.com',
        PROJECT_ID:'next-firebase-66632',
        API_KEY: 'AIzaSyC6mu7yDiP1vmxqEPgI-htfdswurpS1l4A',
        AUTH_DOMAIN: 'next-firebase-66632.firebaseapp.com',
        STORAGE_BUCKET:'next-firebase-66632.appspot.com',
        MESSAGING_SENDER_ID: '75659322457',
        APP_ID: '1:75659322457:web:eea39aa17f026946cdbd48',
        MEASUREMENT_ID:'G-NMQZ6GJFV6',
        DATA_BASE_URL: 'https://next-firebase-66632-default-rtdb.firebaseio.com',
        }
    }
  }

  return {
    /* config options for all phases except development here */
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Important: return the modified config
      // config.mode="development";
     
      console.log("config",config);
      return config
    },  
    env: {
      API: 'https://healthbookapp.netlify.app/',
      GCID: '26122348563-5sb0k4cg489bs2t7bo47uf253e1muokb.apps.googleusercontent.com',
      FB_APP_ID:'423291018981918',
      PRIVATE_KEY:'-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQCULmnZuNMUWvn4\n3s98Zu6VEtSmTub/u0yu0xvSvkjOK/g15qUCBaPJQkTBQ+DE8H1fdSJF9GPqDQOh\n3+u4VHjN3bmnlvh3giVn3I+be5/V3tnOCcEn+KC5i7dsUoEWWmUbiN+T5ilxonHz\n2wzNyHjdb0fR/vqU6+Rxqx7P2HniujCZ6c6Hsnl4LKGfVRuTLrmf0Yx0SFCXYWqo\nofWsb2GzwY2Q/OHfWIBJgaMS+jbphViJEEvd9r8ZF5WgXhpbT6i3dOEST36S/Riz\nElCkArFuwpJH5VkEOo098cHmHkSBeTWMMsqM1gziEingIBCue/uP35c9pgyNQ6bx\n9R20AHzRAgMBAAECgf9hrTaZDfwVruKX6kda+X7LRV5nQhuC9zPVCdONV2EmhlVX\nMnISoyUTxVsNCnFfYCdEhTHSawZxgaKjUbdQCl6XVVDL5/hgzqlZjUocc6EomX15\nE3T/pCROKor+HGR7F5sOS2sVUuJ+xVXYKMyH2V3SmUf+ZNVI1TYAt4vX9hpiGNiM\nzqABdLB/yB+8R2PyyIoP52A63KEuqDvucnFoVWi2i+TxfHUvLJtfCkCXCm+vUWhl\nqemtpSX5aLQkEHOz0RdlcCSIFIV1WdCdZ95UDcDaQVKNKITwGdiRDNY5Jpqy6ulm\nRl8TYDBD4M/G2P53yTbTgW65Dh67gECwd+LoBjECgYEAyLcj8I9iZqccgFDBoL0y\nd1tNYhbgo420EWM4wy8UV82NnzUUBTNlynQE6k7oyFlfmA2Ydtg7NlKjbIjc8Xv7\nJ0Uml8MO6mm9P1+qJqXgNucWE0SDfcD368tfWxSlIWxw8iJ5cYAZwb+biDeNIBWS\n9le7PIYJdzYxX5UrZmQwx+kCgYEAvP78NwAnk3QwLiz4K/wG5ZVigWRAERhplpOk\njVpsYjIfScaprQF13xqrLuXBv2HfEbJaKLL3V0pZV6pAKl03PHo5v04n2L+hSIA0\nOxVjNUSIM3RuQ8raSHJZqMYdPRmM1hWf5+C+7T5taawf/ia1Kjdt6t5Qly3tg2A+\nytgZ5KkCgYBHUoy61riosYk3L3semxxrvU3qJSb990SdSRzKfthDuw8wG7RZhMIP\nBtsYR6IAT4HgjjQ3Ru8Dhqn7z0ZzqRK+CZyFIRMTyS8ubdgQk7Dw0XzOq/Htpbxz\nVXk07Ekhb19TK1zsMBD3ABdMeDD1zbTDRLmL8DU830z8Ig2h/Mg4wQKBgGP9f5DV\nyxpvQUJc1lvm9fsnIruUP3UL9mkM6eVDLs5w+C6/JWv7ttH3uRORyQSpEiy5sIuR\ny9xp4ITJ9TK0qJGdlMnK3rgFAp5p/bg4o4k+HdUjR2ckfoIPxbHORw/ZYbKuNDCo\nrjq0aYyb3T1IW1bfho7ZWcfyK5PzKqWE2YYpAoGANgWRlzYN+57KCcZGZDncnc1c\nKWhJ1ycdrUaQwj7TudHRWyzSmvjVdzCusZp+yrO/fUkfHQRIrTfbnoI9cC9JtF0M\nvUcglHfInWbSwwFgOiBul+Ry2vSoZj5kB7Fx6vBbwIBVu1eswN9MUjAdINIEMABj\na5075lBYQu6u2xoTb8w=\n-----END PRIVATE KEY-----\n',
      CLIENT_EMAIL:'firebase-adminsdk-3medk@next-firebase-66632.iam.gserviceaccount.com',
      PROJECT_ID:'next-firebase-66632',
      API_KEY: 'AIzaSyC6mu7yDiP1vmxqEPgI-htfdswurpS1l4A',
      AUTH_DOMAIN: 'next-firebase-66632.firebaseapp.com',
      STORAGE_BUCKET:'next-firebase-66632.appspot.com',
      MESSAGING_SENDER_ID: '75659322457',
      APP_ID: '1:75659322457:web:eea39aa17f026946cdbd48',
      MEASUREMENT_ID:'G-NMQZ6GJFV6',
      DATA_BASE_URL: 'https://next-firebase-66632-default-rtdb.firebaseio.com',
      }
  }
}
// module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);