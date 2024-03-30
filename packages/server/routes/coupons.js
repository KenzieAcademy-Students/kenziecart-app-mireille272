import { Router, query } from "express"
import { Coupon } from "../models"

const router = Router()

router.route("/create").get(async (req, res, next) => {
  const { code, discount } = req.query

  if (!code || !discount) {
    return res
      .status(422)
      .json({ error: "You must enter a discount  coupon code" })
  }
  try {
    const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() })
    if (existingCoupon)
      return res.status(422).json({ error: "coupon Code is invalid" })

    const queryParams = { code, discount }
    await Coupon.create(queryParams)
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.route("/verify").get(async (req, res) => {
  const { code } = req.query

  if (!code) return res.status(422).json({ error: "coupon code is required" })

  try {
    const coupon = await Coupon.findOne({ code })
    console.log(coupon)
    return res.status(200).json({discount:coupon.discount, codeName: coupon.code})
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

module.exports = router
