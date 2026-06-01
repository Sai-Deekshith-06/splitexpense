const express = require("express");
const routes = express.Router();
const { getAllGroups,createGroup,addMember,getGroupInfo,joinGroup} = require("../controllers/group.controller");


const auth = require("../middlewares/auth");

routes.get('/getall',auth,getAllGroups)
routes.post('/create',auth,createGroup)
routes.get('/:groupId',auth,getGroupInfo)
routes.post('/:groupId/member',auth,addMember)
routes.post('/:groupId/join',auth,joinGroup)

module.exports = routes;
