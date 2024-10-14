const {S3} = require("aws-sdk")
// const AWS = require("aws-sdk")
const uuid = require("uuid").v4
const {S3Client, PutObjectCommand, DeleteObjectCommand} = require("@aws-sdk/client-s3")

// AWS.config.update({
//     accessKeyId: "AKIAQNLFCYRRCS6HW6VF",
//     secretAccessKeyId: "IEtA4et2G5HI3kCxX5rpar3Y1ZxYwfHXy+vpWRrp",
//     region: 'ap-south-1'
// })

// exports.s3uploadv2 = async (files) =>{
//     const s3 = new S3();
//     try{
//     const params = files.map((file) => {
//         return {
//             Bucket: process.env.AWS_BUCKET_NAME,
//             Key: `uploads/${uuid()}-${file.originalname}`,
//             Body: file.buffer
//         }
//     })
//     return await Promise.all(
//         params.map((param) => s3.upload(param).promise()))
//     } catch(err){console.log(err)}
// }
exports.s3uploadv3 = async (files) =>{
    console.log("s3uploadv3 is called")
    const s3client = new S3Client({region: "ap-south-1"});
    var objecturls = []
    console.log(files)
    const params = files.map((file) => {
        // console.log(file)
        // console.log(file.mimetype)
        // console.log(file.originalname)
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `uploads/${uuid()}-${file.originalname}`,
            Body: file.buffer
        }
    })
    params.map((param) => 
    objecturls.push(`https://lms-kicstrt.s3.ap-south-1.amazonaws.com/${param.Key}`))
    const results = await Promise.all(
        params.map((param) => s3client.send(new PutObjectCommand(param))))
    return ({result : results, urls: objecturls})
}
// exports.s3uploadv3 = async (files) =>{
//     const s3client = new S3Client({region: "ap-south-1"});
//     var objecturls = []
//     try{
//     const params = files.map((file) => {
//         return {
//             Bucket: process.env.AWS_BUCKET_NAME,
//             Key: `uploads/${uuid()}-${file.originalname}`,
//             Body: file.buffer
//         }
//     })
//     params.map((param) => 
//     objecturls.push(`https://lms-kicstrt.s3.ap-south-1.amazonaws.com/${param.Key}`))
//     const results = await Promise.all(
//         params.map((param) => s3client.send(new PutObjectCommand(param))))
//     return ({result : results, urls: objecturls})
//     } catch(err){
//         console.log(err)
//         return "Error uploading images to AWS"
//     }
// }
exports.s3deletev3 = async (file) =>{
    const s3client = new S3Client({region: "ap-south-1"});
    try{
    const param = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: file,
            Body: file.buffer
        }
    
    return await s3client.send(new DeleteObjectCommand(param))
    } catch(err){
        console.log(err)
        return "Error deleting fle in AWS"
    }
}
       