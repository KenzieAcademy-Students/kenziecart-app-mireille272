import { Router, query } from "express"
import { Coupon } from "../models"

const router = Router()

router.route("/create").get(async (req, res, next) => {
  const { code, discount, expirationDate } = req.query

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
    if (expirationDate) queryParams.expirationDate = new Date(expirationDate)

    await Coupon.create(queryParams)
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.route("/verify").get(async (req, res) => {
  const { code } = req.query

  if (!code) return res.status(422).json({ error: "coupon code is required" })

  try {
    const coupon = await Coupon.findOne({ code: code.toUpperCase() })
    if (coupon.expirationDate > new Date()) {
      return res.status(422).json({ error: "coupon is expired" })
    }
  } catch (error) {
    res.sendStatus(500)
  }
})

module.exports = router
