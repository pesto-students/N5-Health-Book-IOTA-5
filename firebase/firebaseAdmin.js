import * as firebaseAdmin from "firebase-admin";

const privateKey = process.env.PRIVATE_KEY;//'-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQCULmnZuNMUWvn4\n3s98Zu6VEtSmTub/u0yu0xvSvkjOK/g15qUCBaPJQkTBQ+DE8H1fdSJF9GPqDQOh\n3+u4VHjN3bmnlvh3giVn3I+be5/V3tnOCcEn+KC5i7dsUoEWWmUbiN+T5ilxonHz\n2wzNyHjdb0fR/vqU6+Rxqx7P2HniujCZ6c6Hsnl4LKGfVRuTLrmf0Yx0SFCXYWqo\nofWsb2GzwY2Q/OHfWIBJgaMS+jbphViJEEvd9r8ZF5WgXhpbT6i3dOEST36S/Riz\nElCkArFuwpJH5VkEOo098cHmHkSBeTWMMsqM1gziEingIBCue/uP35c9pgyNQ6bx\n9R20AHzRAgMBAAECgf9hrTaZDfwVruKX6kda+X7LRV5nQhuC9zPVCdONV2EmhlVX\nMnISoyUTxVsNCnFfYCdEhTHSawZxgaKjUbdQCl6XVVDL5/hgzqlZjUocc6EomX15\nE3T/pCROKor+HGR7F5sOS2sVUuJ+xVXYKMyH2V3SmUf+ZNVI1TYAt4vX9hpiGNiM\nzqABdLB/yB+8R2PyyIoP52A63KEuqDvucnFoVWi2i+TxfHUvLJtfCkCXCm+vUWhl\nqemtpSX5aLQkEHOz0RdlcCSIFIV1WdCdZ95UDcDaQVKNKITwGdiRDNY5Jpqy6ulm\nRl8TYDBD4M/G2P53yTbTgW65Dh67gECwd+LoBjECgYEAyLcj8I9iZqccgFDBoL0y\nd1tNYhbgo420EWM4wy8UV82NnzUUBTNlynQE6k7oyFlfmA2Ydtg7NlKjbIjc8Xv7\nJ0Uml8MO6mm9P1+qJqXgNucWE0SDfcD368tfWxSlIWxw8iJ5cYAZwb+biDeNIBWS\n9le7PIYJdzYxX5UrZmQwx+kCgYEAvP78NwAnk3QwLiz4K/wG5ZVigWRAERhplpOk\njVpsYjIfScaprQF13xqrLuXBv2HfEbJaKLL3V0pZV6pAKl03PHo5v04n2L+hSIA0\nOxVjNUSIM3RuQ8raSHJZqMYdPRmM1hWf5+C+7T5taawf/ia1Kjdt6t5Qly3tg2A+\nytgZ5KkCgYBHUoy61riosYk3L3semxxrvU3qJSb990SdSRzKfthDuw8wG7RZhMIP\nBtsYR6IAT4HgjjQ3Ru8Dhqn7z0ZzqRK+CZyFIRMTyS8ubdgQk7Dw0XzOq/Htpbxz\nVXk07Ekhb19TK1zsMBD3ABdMeDD1zbTDRLmL8DU830z8Ig2h/Mg4wQKBgGP9f5DV\nyxpvQUJc1lvm9fsnIruUP3UL9mkM6eVDLs5w+C6/JWv7ttH3uRORyQSpEiy5sIuR\ny9xp4ITJ9TK0qJGdlMnK3rgFAp5p/bg4o4k+HdUjR2ckfoIPxbHORw/ZYbKuNDCo\nrjq0aYyb3T1IW1bfho7ZWcfyK5PzKqWE2YYpAoGANgWRlzYN+57KCcZGZDncnc1c\nKWhJ1ycdrUaQwj7TudHRWyzSmvjVdzCusZp+yrO/fUkfHQRIrTfbnoI9cC9JtF0M\nvUcglHfInWbSwwFgOiBul+Ry2vSoZj5kB7Fx6vBbwIBVu1eswN9MUjAdINIEMABj\na5075lBYQu6u2xoTb8w=\n-----END PRIVATE KEY-----\n';
const clientEmail = process.env.CLIENT_EMAIL; //'firebase-adminsdk-3medk@next-firebase-66632.iam.gserviceaccount.com';
const projectId = process.env.PROJECT_ID; //'next-firebase-66632';

if (!privateKey || !clientEmail || !projectId) {
  console.log(
    `Failed to load Firebase credentials. Follow the instructions in the README to set your Firebase credentials inside environment variables.`
  );
}

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: privateKey,
      clientEmail,
      projectId,
    }),
    databaseURL: `https://${projectId}.firebaseio.com`,
  });
}

export default firebaseAdmin;
