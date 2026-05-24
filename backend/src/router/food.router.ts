import { sample_foods, sample_tags } from "../data";
import { Router } from "express";
import asyncHandler from "express-async-handler";   
import { FoodModel } from "../models/food.model";

const router = Router();

router.get("/seed", async (req, res) => {
  console.log("🔥 SEED HIT");

  const foodCount = await FoodModel.countDocuments();
  console.log("COUNT =", foodCount);

  if (foodCount > 0) {
    return res.send("Seed already done");
  }

  await FoodModel.create(sample_foods);

  console.log("DONE");
  res.send("Seed done");
});





router.get("/",asyncHandler(
    async (req,res)=>{
const foods = await FoodModel.find();
res.send(foods);
}));



router.get("/search/:searchTerm",asyncHandler(
    async (req,res)=>{
        const searchTerm: string = req.params.searchTerm as string;
        const foods = await FoodModel.find({ name: { $regex: searchTerm, $options: "i" } });
        res.send(foods);
    }
));


router.get( "/tags",asyncHandler(async (req, res) => { const tags = await FoodModel.aggregate([
      { $unwind: "$tags" },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count"
        }
      },
      { $sort: { count: -1 } }
    ]);

    const all = {
      name: "All",
      count: await FoodModel.countDocuments()
    };

    tags.unshift(all);

    res.send(tags);
  })
);
router.get(
  "/tag/:tagName",
  asyncHandler(async (req, res) => {
    const tagName = req.params.tagName;

    const foods = await FoodModel.find({
      tags: {
        $elemMatch: {
          $regex: new RegExp(`^${tagName}$`, "i")
        }
      }
    });

    res.send(foods);
  })
);


router.get(
  "/:foodId",
  asyncHandler(async (req, res) => {
    const foodId = req.params.foodId as string;

    console.log("➡️ GET FOOD BY ID:", foodId);

    if (!foodId.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).send({ message: "Invalid ID format" });
      return;
    }

    const food = await FoodModel.findById(foodId);

    if (!food) {
      res.status(404).send({ message: "Food not found" });
      return;
    }

    res.send(food);
  })
);

export const foodRouter = router;
