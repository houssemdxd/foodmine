import { sample_foods, sample_tags } from "../data";
import { Router } from "express";
const router = Router();


router.get("/",(req,res)=>{

res.send(sample_foods)

});
router.get("/search/:searchTerm",(req,res)=>{
    const searchTerm = req.params.searchTerm;
    const food = sample_foods.filter((item)=>{return item.name.toLowerCase().includes(searchTerm.toLowerCase())})
    res.send(food)

})
router.get("/tags",(req,res)=>{
    res.send(sample_tags);
})

router.get('/tag/:tagName',(req,res)=>{
    const tagName = req.params.tagName;
    const foods=sample_foods.filter(food=> food.tags.map((item: string)=>item.toLowerCase()).includes(tagName.toLowerCase()))
    res.send(foods)
})

router.get("/:foodId",(req,res)=>{

const  foodId= req.params.foodId;
const food = sample_foods.find((food)=>{return food.id == foodId})
res.send(food); 
})
export  const foodRouter = router;