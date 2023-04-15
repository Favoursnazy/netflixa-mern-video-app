import express from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import storage from "../config/firebase.js";

const uploadRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

uploadRouter.post("/", upload.single("file"), async (req, res) => {
  try {
    //get file from request
    const file = req.file;
    if (file) {
      //create a new filename
      const fileName = `${uuidv4()}${path.extname(file.originalname)}`;

      const blob = storage.file(fileName);
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype,
        },
      });

      //if error
      blobStream.on("error", (error) => {
        res.status(400).json({ message: error.message });
      });

      //if success
      blobStream.on("finish", () => {
        //get the public URL of the file
        const publicURL = `https://firebasestorage.googleapis.com/v0/b/${storage.name}/o/${fileName}?alt=media`;
        //return the file name and public URL
        res.status(200).json(publicURL);
      });
      blobStream.end(file.buffer);
    } else {
      //when the file
      res.status(400).json({
        message: "Please upload a file",
      });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default uploadRouter;
