const { json } = require('body-parser');
const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
    apiKey: 'd6d8090746094bf59b9a3e8e482428b0'
   });

const handleApiCall = (req,res) =>{
    app.models //this.state = req.body
        .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
        .then(data=>{
            res.json(data);
        })
        .catch(err=>res.status(400).json('unable to load API'))

}
const handleImage = (req,res,db)=> {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))

}
module.exports={
    handleImage,
    handleApiCall
}