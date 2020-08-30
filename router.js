const express = require('express')
const Bookmark =  require('./bookmark')
const Tag = require('./tags')

const router = new express.Router()


router.post('/bookmarks', async (req, res)=>{
    const bookmark = new Bookmark(req.body)

    try {
        await bookmark.save()
        res.status(201).send(bookmark)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/bookmarks', async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({})
        res.send(bookmarks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/bookmarks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const bookmark = await Bookmark.findById(_id)

        if (!bookmark) {
            return res.status(404).send()
        }

        res.send(bookmark)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/bookmarks/:id', async(req, res) => {
    try{
        const bookmark = await Bookmark.findByIdAndDelete(req.params.id)

        if(!bookmark){
            res.status(404).send()
        }
        res.send(bookmark)
    }catch(e){
        res.send(500).send()
    }
})

router.patch('/bookmarks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'publisher', 'link','tags']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const bookmark = await Bookmark.findById(req.params.id)

        updates.forEach((update) => bookmark[update] = req.body[update])
        await bookmark.save()

        if (!bookmark) {
            return res.status(404).send()
        }

        res.send(bookmark)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/tags', async (req, res) => {
    const tag = new Tag(req.body)

    try {
        await tag.save()
        res.status(201).send(tag)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tags', async(req, res) =>{
 
    try {
        const tags = await Tag.find({})
        res.send(tags)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tags/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const tag = await Tag.findById(_id)

        if (!tag) {
            return res.status(404).send()
        }

        res.send(tag)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/tags/:id', async(req, res) => {
    try{
        const tag = await Tag.findByIdAndDelete(req.params.id)

        if(!tag){
            res.status(404).send()
        }
        res.send(tag)
    }catch(e){
        res.send(500).send()
    }
})

router.patch('/tags/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const tag = await Tag.findById(req.params.id)

        updates.forEach((update) => tag[update] = req.body[update])
        await tag.save()

        if (!tag) {
            return res.status(404).send()
        }
        res.send(tag)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/addtag/:id', async (req, res)=> {
    try{

        const bookmark =  await Bookmark.findById(req.params.id)
        const title =  req.body.title

        const tag =  await Tag.findOne({title})

        if (!tag) {
            return res.status(400).send({ error: 'Tag not available!' })
        }

        if(!bookmark.tags.includes(tag.id))
        {
            await bookmark.tags.push(tag.id)
        }
        await bookmark.save()

        res.send({bookmark,tag})
    }catch(e)
    {
        console.log(e)
    }
    
})

router.patch('/removetag/:id', async (req, res)=> {
    try{

        var bookmark =  await Bookmark.findById(req.params.id)
        const title =  req.body.title

        const tag =  await Tag.findOne({title})

        if (!tag) {
            return res.status(400).send({ error: 'Tag not available!' })
        }
        const index = bookmark.tags.indexOf(tag.id)
        if (index > -1) {
            bookmark.tags.splice(index, 1);
        }
        else{
            return res.status(400).send({ error: 'Tag not present!' })
        }
        
        await bookmark.save()
        res.send({bookmark,tag})
    }catch(e)
    {
        console.log(e)
    }
    
})
module.exports = router