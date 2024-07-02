import express from 'express';

const router= express.Router();

router.get('/test',(req, res) => {
   res.send("Test route");
})
router.post('/test',(req, res) => {
    res.send("Test route");
 })
 router.put('/test',(req, res) => {
    res.send("Test route");
 })
 router.delete('/test',(req, res) => {
    res.send("Test route");
 })

export default router;