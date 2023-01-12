import admin from "firebase-admin";

import serviceAccount from "../config/firebase-key.json";

const BUCKET = "algorhythm-a44a1.appspot.com";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: BUCKET,
  });
}

const bucket = admin.storage().bucket();

function uploadImageAsPromise(imageFile) {
  const image = imageFile;

  const file = bucket.file(image);

  const name = Date.now() + "." + image.originalname.split(".").pop();

  console.log("*****", name);

  const stream = file.createWriteStream({
    metadata: {
      contentType: image.mimetype,
    },
  });

  stream.on("error", (e) => {
    throw new Error(e);
  });

  stream.on("finish", async () => {
    await file.makePublic();

    imageFile.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${name}`;
  });

  stream.end(image.buffer);

  return (url = `https://storage.googleapis.com/${BUCKET}/${name}`);
}

export default uploadImageAsPromise;
