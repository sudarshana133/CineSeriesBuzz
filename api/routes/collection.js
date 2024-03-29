const router = require('express').Router();
const Collection = require('../models/Collection');
const verify = require('../verifyToken');

// create
router.post('/create',verify,async(req,res)=>{
    const newCollection = new Collection({
        username: req.body.username,
        title: req.body.title,
        desc : req.body.desc,
        objects : req.body.objects,
        movieOrTV:req.body.movieOrTV
    })
    try {
        const collection =await newCollection.save();
        res.status(200).json(collection);
    } catch (error) {
        res.status(500).json(error);
    }
})
router.delete('/delete/:title/',verify,async(req,res)=>{
    const title = req.params.title;
    const username = req.body.username;
    try {
        const foundCollection = await Collection.findOne({title:title,username:username});
        if(!foundCollection) return res.status(404).json("Collection not found");
        else
        {
            await Collection.findOneAndDelete({title:title});
            res.status(200).json("Collection deleted");
        }
    } catch (error) {
        res.status(500).json(error)
    }
})
// get all collections
router.post('/:movieOrTV/',async(req,res)=>{
    const {username} = req.body;
    const movieOrTV = req.params.movieOrTV;
    try {
        const collections = await Collection.find({username:username,movieOrTV:movieOrTV});
        if(collections.length>0)
        {
            return res.status(200).json(collections);
        }
        else{
            return res.status(404).json("No collection found!");
        }
    } catch (error) {
        res.status(500).json(error)
    }
})
// get collection details
router.get('/:movieOrTV/:collectionName/',async(req,res)=>{
    try {
        const collectionName = req.params.collectionName;
        const movieOrTV = req.params.movieOrTV;
        const collectionFound = await Collection.find({title:collectionName,movieOrTV:movieOrTV});
        if(!collectionFound) return res.status(404).json("Collection not found");
        
        return res.status(200).json(collectionFound)
    } catch (error) {
        return res.status(500).json("Error in finding the collection");
    }
})
// handling the title update
router.post('/update/:title',verify,async(req,res)=>{
    const title = req.params.title;
    const username = req.body.username;
    try {
        const foundCollection = await Collection.findOne({title:title,username:username});
        if(!foundCollection) return res.status(404).json("Collection not found");
        else
        {
            const {title} = req.body;
            const updatedCollection = await Collection.findOneAndUpdate({title:foundCollection.title},{$set:{title:title}},{new:true});
            return res.status(200).json(updatedCollection);
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})
router.put('/update/:title/:username',verify,async(req,res)=>{
    const title = req.params.title;
    const username = req.params.username;
    try {
        const foundCollection = await Collection.findOne({title:title,username:username});
        if(!foundCollection) return res.status(404).json("Collection not found");

        else
        {
            const {title,desc,objects} = req.body;
            const updatedCollection = await Collection.findOneAndUpdate({title:foundCollection.title},{$set:{title:title,desc:desc,objects:objects}},{new:true});
            
            return res.status(200).json(updatedCollection);
        }
    } catch (error) {
       return res.status(500).json(error);
    }
})
module.exports = router;