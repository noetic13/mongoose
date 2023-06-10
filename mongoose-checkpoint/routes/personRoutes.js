const express= require("express")
const router=express.Router()
const Person = require("../models/personSchema")

// @ POST METHOD

router.post ('/users' , async (req,res) =>{
    try {
        const newPerson = new Person(req.body)
        await newPerson.save()
        res.status(200).json({msg:"success", newPerson})
    } catch (err) {res.status(500).json({msg: err.message})}
})

// @ GET METHOD

router.get ('/users' , async (req,res) =>{
    try {
        const newPerson = await Person.find()
        res.status(200).json({msg:"success", newPerson})
    } catch (err) {res.status(500).json({msg: err.message})}
})

// @ GET BY ID METHOD

router.get ('/users/id/:id' , async (req,res) =>{
    try {
        const newPerson = await Person.findById(req.params.id)
        if (!newPerson) return res.status(404).json({msg:'Person not found'})
        res.status(200).json({msg:"success", newPerson})
    } catch (err) {res.status(500).json({msg: err.message})}
})


// @ GET ONE METHOD

router.get('/users/favouriteFood', async (req, res) => {
    try {
        const { favouriteFoods } = req.query;
        const newPerson = await Person.findOne({ favouriteFoods })
        if (!newPerson) {
            return res.status(404).json({ msg: 'Person not found' });
        }
        res.status(200).json({ msg: 'Success', newPerson });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});


// @ UPDATE METHOD


router.put('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { favouriteFoods } = req.body;
        const updatedPerson = await Person.findByIdAndUpdate(
        id,
        { favouriteFoods },
        { new: true }
        );
        
        if (!updatedPerson) {
        return res.status(404).json({ msg: 'Person not found' });
        }
        const response = {
        msg: 'Person updated successfully',
        person: {
            _id: updatedPerson._id,
            name: updatedPerson.name,
            age: updatedPerson.age,
            favouriteFoods: updatedPerson.favouriteFoods
        }
    };
    
    res.status(200).json(response);
    } catch (err) {
    res.status(500).json({ msg: err.message });
    }});


// @ FIND ONE AND UPDATE AGE METHOD


router.put('/users/updateAge/:name', async (req, res) => {
    try {
        const personName = req.params.name;
    
      // Find the person by Name and update their age
        const updatedPerson = await Person.findOneAndUpdate(
        { name: personName },
        { age: 20 },
        { new: true }
    );
    
    if (!updatedPerson) {
        return res.status(404).json({ msg: 'Person not found' });
    }
    
        res.status(200).json({ msg: 'Age updated successfully', person: updatedPerson });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});


// @ FIND BY ID AND DELETE METHOD 


router.delete('/users/id/:id', async (req, res) => {
    try {
      const personId = req.params.id;
      
      // Find the person by _id and remove them
      const removedPerson = await Person.findByIdAndRemove(personId);
      
      if (!removedPerson) {
        return res.status(404).json({ msg: 'Person not found' });
      }
      
      res.status(200).json({ msg: 'Person deleted successfully', person: removedPerson });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
});


// @ DELETE MANY WITH NAME



router.delete('/users/delete/:name', async (req, res) => {
    try {
      const personName = req.params.name;
      
      const deletionResult = await Person.deleteMany({ name: personName });
      
      if (deletionResult.deletedCount === 0) {
        return res.status(404).json({ msg: 'No person found with the specified name' });
      }
      
      res.status(200).json({ msg: 'People deleted successfully', count: deletionResult.deletedCount });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  });
  


















module.exports=router
