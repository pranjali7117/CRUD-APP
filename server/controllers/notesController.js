const Note = require("../models/note");


const fetchNotes =  async (req, res) => {
    //find notes
    const notes =  await Note.find()
    //respond with notes
    res.json({notes});
};

const fetchNote = async (req, res) => {
    //get id off the url
    const noteId = req.params._id;
    //find notes by id
    const note = await Note.findById(noteId);
    //respond to note
    res.json({note});
};

const createNote = async (req, res) => {
    
    //get sent data of request bodyy
    const {title,body} = req.body;
    //create a nite with it
    const note = await Note.create({
        title,
        body,
    });
    //send response 
    res.json({note});
};

const updateNote = async (req,res) => {
    //get id by url
    const noteId = req.params._id;
    //get data from req body 
    const {title, body} = req.body;
    //find and update
    await Note.findByIdAndUpdate(noteId, {
        title,
        body,
    });
    //find updates note
    const note = await Note.findById(noteId);
    //respond with it
    res.json({note});
} ;

const deleteNote = async (req,res) => {
    //get id off url
    const noteId = req.params._id;
    //delete record
    await Note.deleteOne({_id: noteId});
    //respond
    res.json({success: "Record deleted"});
};

module.exports = {
    fetchNotes: fetchNotes,
    fetchNote: fetchNote,
    createNote: createNote,
    updateNote: updateNote,
    deleteNote: deleteNote,
}