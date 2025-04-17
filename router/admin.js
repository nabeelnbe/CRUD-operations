const express = require("express")
const router = express.Router()
const admincontroller = require('../controller/admincontroller')
const adminAuth = require('../midleware/adminAuth')


router.get('/login',adminAuth.isLogin,admincontroller.loadLogin)

router.post('/login',admincontroller.login)

router.get('/dashbord',adminAuth.checkSession,admincontroller.loadDashbord)

router.post('/edit-user',adminAuth.checkSession,admincontroller.edituser)

router.get('/deleteuser/:Id',adminAuth.checkSession,admincontroller.deleteuser)

router.post('/add-user',adminAuth.checkSession,admincontroller.adduser)

router.post('/search-user',adminAuth.checkSession,admincontroller.usersearch)

router.get('/logout',adminAuth.checkSession,admincontroller.logout);


module.exports = router;