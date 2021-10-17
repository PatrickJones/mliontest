import express, { NextFunction } from "express";
import path from 'path';
import fileUpload from 'express-fileupload';
import env, { EnvVarError } from "env-var";

import config from "./config.json";
import ResponseModel from "./ResponseModel";
import { resolveAny } from "dns";


const port: number = config.appPort;
const userName: string = env.get('USERNAME').asString() as string;
const app: express.Application = express();

app.use(express.urlencoded({ extended: false})); //needs to be false for file uploads
app.use(express.json());
app.use(fileUpload());

app.all('*', (req: express.Request, res: express.Response, next:NextFunction) => {
    let apiVersion = req.header('x-api-version');
    if (apiVersion === undefined)
    {
        res.status(400).send("Missing 'x-api-version' header");        
    }

    next();
});

app.get('/inputX/:x/inputY/:y', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let add = new ResponseModel(+req.params.x, +req.params.y);
    res.send(add.result().toString());
});

app.post('/postdata', (reqBody: express.Request, resBody: express.Response, next: express.NextFunction) => {
    let body = reqBody.body;
    console.log(body);
    resBody.send(body);

});

app.post("/postfiles", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let uploadedFile;
    let uploadPath: string;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were upload');
    }

    uploadedFile = req.files.testfile as fileUpload.UploadedFile; // name must match key in request
    console.log(uploadedFile);
    uploadPath = path.resolve(__dirname, '..') + "\\fileuploads\\" + uploadedFile.name;
    
    uploadedFile.mv(uploadPath, (err: string) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.send('File uploaded.')
    });
});

app.put('/updatedata', (reqBody: express.Request, resBody: express.Response, next: express.NextFunction) => {
    let body = reqBody.body;
    console.log(body);
    resBody.send(body);
});

app.delete('/deletedata/:d', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let delKey: number = +req.params.d;
    console.log(`Deleting ${delKey}`);
    let resValue: number = (delKey - 1);
    res.send({"Deleted" : resValue});
});

app.listen(port, () => console.log(`${config.appName} Server running on ${port}`));