const express = require('express'),
router = express.Router(),
multer = require('multer'),
upload = multer(),
fscrud = require('./FS_crud')

router.post('/createfolder', async (req,res)=>{
    const folderName = req.body.foldername
    try{
       const result = await fscrud.createFolder(folderName)
       if(!result) throw { code: 400, message: "can't create folder" }
       else{
        const folders = fscrud.readFolder()
         res.status(200).send(folders)}
    }catch (err){
        res.status(err.code||400).send(err.message)
    }
})

router.get('/folders/:foldername?',async (req,res)=>{
    const folderName = req.params.foldername
    console.log(folderName);
    try{
       result = folderName? await fscrud.readFolder(folderName): await fscrud.readFolder()
       if(!result) throw {code:404, message:'wait a second'}
       res.status(200).send(result)
    }catch (err){
        res.status(400||err.code).send(err.message)
    }
})

router.post('/upload/:foldername', upload.single("new_file"), async(req,res)=>{
    const folderName = req.params.foldername
    try{
    const {file} = req
    const result = await fscrud.createFile(folderName,file.originalname,file.buffer)
     if(!result) throw { code: 400, message: "file already exists" }
   else{ 
    const filesList = await fscrud.readFolder(folderName)
    res.status(200).send(filesList)
    }
    }catch (err){
        res.status(err.code||400).send(err.message)
    }
})

router.post('/changename/:foldername/:newname/:filename?',async (req,res)=>{
    const folderName = req.params.foldername
    const fileName = req.params.filename
    const newName = req.params.newname
    console.log('foldername: ',folderName,"filename: ",fileName,"new: ", newName);
    try{
        fileName? await fscrud.rename(folderName,fileName,newName):
        await fscrud.rename(folderName,null,newName)
        const result = fileName? await fscrud.readFolder(folderName)
        : await fscrud.readFolder()
        res.status(200).send(result)
    }catch (err){
        res.status(err.code||400).send(err.message)
    }
})

router.get('/onefile/:foldername/:filename', async (req,res)=>{
    const folderName = req.params.foldername
    const fileName = req.params.filename
    console.log('foldername: ',folderName,'filename: ', fileName);
    try{
        const result = await fscrud.readFile(folderName,fileName)
        if(!result) throw { code: 400, message: "cant read file" }
        res.status(200).send(result)
    }catch (err){
        res.status(400).send(err.message)
    }
})
router.get('/one/:filename', async (req,res)=>{//get one file without know his path
    const fileName = req.params.filename
    console.log('filename: ', fileName);
    // let fileIndex = 0
    try{
// TO DO למצוא מי התיקייה של הקובץ שנשלח
        const folders = await fscrud.readFolder()
        console.log({folders});
        if(!folders) throw ({code: 400, message: "no folders"})
        const file = folders.find(folder=>{
           if ( fscrud.readFolder(folder).includes(fileName)) return true
          
        })
        console.log('folderindex: ',file);
        if(!file) throw {code: 400, message: "no files"}
        const result = await fscrud.readFile(file, fileName)
        // console.log('result' ,result);
        if(!result) throw { code: 400, message: "cant read file" }
        res.status(200).send({result,folder:file})
    }catch (err){
        res.status(400).send(err.message)
    }
})

router.get('/allfiles', async (req,res)=>{
    try{
        const folders = await fscrud.readFolder()
        if(!folders) throw ({code: 400, message: "no folders"})
        const files = folders.map((folder)=>fscrud.readFolder(folder))
        if(!files) throw {code: 400, message: "no files"}
        // console.log('files: ', files);
       res.status(200).send(files);
    }catch (err){
        res.status(err.code||400).send(err.message)
    }
})

router.delete('/deletefolder/:foldername',async(req,res)=>{//delete folder
    try{
    await fscrud.removeFolder(req.params.foldername)
    const folders = await fscrud.readFolder()
    console.log(folders)
    res.status(200).send(folders)
    }catch(err){
        res.status(400).send('cant delete this folder')
    }
})

router.delete('/deletefile/:foldername/:filename', async (req,res)=>{//delete file
    const folderName = req.params.foldername
    const fileName = req.params.filename
    try{
        await fscrud.removeFile(folderName,fileName)
        const files = await fscrud.readFolder(folderName)
        res.status(200).send(files)
    }catch(err){
        res.status(400).send('cant delete this file')
    }
})

module.exports = router