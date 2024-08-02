const { Router } = require("express");
const DataServices = require("../services/dataservice");
const verifyToken = require("../middleware/isuser");
const router = Router({ strict: true });

router.post("/login",DataServices.login);
router.get("/donations",verifyToken,DataServices.getDonations);
router.put("/donations/accept",verifyToken,DataServices.acceptDonation);
router.put("/donations/addvolunteer",verifyToken,DataServices.assignVolunteer);
router.put("/donations/pickup",verifyToken,DataServices.pickUpDonation);
router.put("/donations/deliver",verifyToken,DataServices.deliverDonation);
router.post("/donations",DataServices.donate); 
router.post("/volunteers",DataServices.register); 
router.post("/recipients",DataServices.addRecipient);

module.exports = router;