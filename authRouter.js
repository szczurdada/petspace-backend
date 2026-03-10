const Router = require("express");
const router = new Router();
const controller = require("./authController");
const { check } = require("express-validator");
const authMiddleware = require("./middleware");

router.post(
  "/signup",
  [
    check("username", "The username can't be empty").notEmpty(),
    check("email", "Invalid email").isEmail(),
    check(
      "password",
      "The password can`t be less than 8 and more that 64 characters",
    ).isLength({ min: 8, max: 64 }),
  ],
  controller.signup,
);
router.post("/signin", controller.signin);

router.get("/users", controller.getUsers);
router.get("/user/:username", controller.getUser);
router.put("/user/:username", authMiddleware, controller.updateUser);
router.patch("/registrationsSteps", authMiddleware, controller.registrationsSteps);

module.exports = router;
