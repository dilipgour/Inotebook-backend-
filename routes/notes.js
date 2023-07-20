const express = require('express')
const router = express.Router()
const {
  body,
  validationResult
} = require('express-validator');
const Note = require('../Models/Notes')
const fetchuser = require('../Middleware/fetchuser')


router.post('/addnote', fetchuser,
  body('title', 'title should be 5 character long').isLength({
    min: 5
  }), body('description', 'description should be 5 character long').isLength({
    min: 5
  }), async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
     return res.status(400).json(result)
    }
    
    note= new Note({
      'title':req.body.title,
      'description':req.body.description,
      'tag':req.body.tag,
      'user':req.user.id
    } )
    note.save()
   res.json(note)
     })
  
  
router.get('/fetchallnotes', fetchuser,
   async (req, res) => {
    const notes= await Note.find({'user':req.user.id})
    res.json(notes)
    
   })
  
  
  router.delete('/deletenote/:id', fetchuser,
   async (req, res) => {
    let note= await Note.findById(req.params.id)
    if(!note){
     return res.status(404).send("No such note found ")
    }
    if(req.user.id==note.user){
    note= await Note.findByIdAndDelete(req.params.id)
    }
   res.send("the note has been deleted")
   
    
   })
  
  
  router.put('/updatenote/:id', fetchuser,
   async (req, res) => {
     let {title,description,tag}=req.body;
     let newnote={}
     if(title){newnote.title=title}
     if(description){newnote.description=description}
     if(tag){newnote.tag=tag}
     
    let note= await Note.findById(req.params.id)
    if(!note){
     return res.status(404).send("No such note found ")
    }
    
    if(req.user.id!=note.user){
    return res.status(404).send("No such user found ")
    }
   
    note = await Note.findByIdAndUpdate(
      { _id: req.params.id },
newnote,
    );
    res.send("the note has been updated")
   })
  
  module.exports = router