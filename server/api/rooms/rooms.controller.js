'use strict';

var _ = require('lodash');
<<<<<<< HEAD
var Rooms = require('./rooms.model');
=======
var Rooms = require('./rooms.model').Rooms;
var RoomUser = require('./rooms.model').RoomUser;
>>>>>>> (fix) fix websocket errors on refresh (in deployed version) and refresh not loading marker data properly.
var User = require('../user/user.model')

// Get list of rooms
exports.index = function (req, res) {
  console.log('got into index');
};

// Get a single rooms' user objects
exports.show = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (!err) {
      var rooms = user.memberOfRooms;
      res.send(200, rooms);
    } else {
      res.send('error');
    }
  });

};

// Creates a new room in the Rooms Collection and also adds the room to 'memberOfRooms' property
// in for user in User Collection
<<<<<<< HEAD
exports.create = function (req, res) {
=======
exports.createRoom = function (req, res) {
>>>>>>> (fix) fix websocket errors on refresh (in deployed version) and refresh not loading marker data properly.
  console.log('req.body.user is ', req.body.user);
  var newRoom = {
    name: req.body.name,
    info: req.body.info,
    active: req.body.active,
    users: [req.body.user]
  };
  //create new roomId to user data in user collection
  Rooms.create(newRoom, function (err, room) {
<<<<<<< HEAD
    console.log('req.body.user._id ', req.body.user._id);
=======
    console.log('req.body.user._id ', req.body.user.userId);
>>>>>>> (fix) fix websocket errors on refresh (in deployed version) and refresh not loading marker data properly.
    if (err) {
      return handleError(res, err);
    }
    else {
      //add room to in users collection
<<<<<<< HEAD
      User.findById(req.body.user._id, function (err, user) {
        var roomId = room._id.toString();
        user.memberOfRooms.push({roomId: roomId, name: req.body.name});
        user.save(function (err) {
          if (err) return validationError(res, err);
=======
      //User.findById(req.body.user._id, function (err, user) {
      User.findById(req.body.user.userId, function (err, user) {
        var roomId = room._id.toString();
        user.memberOfRooms.push({roomId: roomId, name: req.body.name});
        user.save(function (err) {
          if (err) { console.log('err within create in rooms.controller is ', err);};
>>>>>>> (fix) fix websocket errors on refresh (in deployed version) and refresh not loading marker data properly.
          //res.send(200);
        });
      });
    }
    //call method in rooms.socket.js to create listener for chat in specific room
    //RoomSockets.createRoomListener(roomId);
    return res.json(201, room);
  });
};
//REPLACED BY addUserToRoomOrUpdate (keep until we sure not using http requests. originally called by http request)
// Updates an existing room in the DB. Called when a user joins a room in 'midup.controller.js'
// Will add user to room if not already part of room
exports.joinRoomHTTP = function (req, res) {
  console.log('req.body is ', req.body);
<<<<<<< HEAD
  var userId = req.body.user._id;
=======
  var userId = req.body.userId;
  //var userId = req.body.user._id;
>>>>>>> (fix) fix websocket errors on refresh (in deployed version) and refresh not loading marker data properly.
  var roomId = req.body.roomId;
  var userRoomObj = req.body;
  var usersInRoom = addUserToRoomOrUpdateRoom(userId, roomId, userRoomObj, function(data) {
    res.json(200, data);
  });
};

// Deletes a rooms from the DB.
exports.destroy = function (req, res) {
  Rooms.findById(req.params.id, function (err, rooms) {
    if (err) {
      return handleError(res, err);
    }
    if (!rooms) {
      return res.send(404);
    }
    rooms.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
<<<<<<< HEAD
  });
=======
  })
>>>>>>> (fix) fix websocket errors on refresh (in deployed version) and refresh not loading marker data properly.
};

function handleError(res, err) {
  return res.send(500, err);
}


/**
 * Function is called by socket.io listener to update room DB and user DB with user data
 * @param data
 * @param cb
 */
/*exports.updateRoom = function (data, cb) {
  var userId = data.user._id;
  var roomId = data.roomId;
  Rooms.update({'users._id': userId}, {
    '$set': {
      'users.$.coords': data.user.coords
    }
  }, function (err) {
    if (err) {
      return handleError(res, err);
    }
    else {
      User.findById(userId, function (err, user) {
        var flag = false;
        var userRooms = user.memberOfRooms;
        for (var i = 0, len = userRooms.length; i < len; i++) {
          if (userRooms[i].roomId === roomId) {
            flag = true;
            break;
          }
        }
        if (!flag) {
          userRooms.push({roomId: roomId, name: req.body.name});
        }
        user.save(function (err) {
          if (err) return validationError(res, err);
        });
      });
    }
    //return json array of all users in room
    //return res.json(200, room.users);
    Rooms.findById(roomId, function (err, room) {
      var usersObj = room.users.reduce(function (a, b) {
        a[b._id] = b;
        return a;
      }, {});
      cb(usersObj);
    });
  });
};*/

/**
 * Function is called by socket.io listener to get users for a Room (with all data)
 * @param data
 * @param cb
 */
exports.getUsersForRoom = function (data, cb) {
  var userId = data.userId;
  var roomId = data.roomId;
  Rooms.findById(roomId, function (err, room) {
    if (err) {
      console.log('getUsersForRoom in rooms.controller ', err);
    }
    if (!room) {
      console.log('theres no room dude... im in getUsersForRoom in rooms.controller');
    }
    var usersObj = room.users.reduce(function (a, b) {
      a[b._id] = b;
      return a;
    }, {});
    console.log('USER OBJ!!!!!!!!!!', usersObj);
    cb(usersObj);
  });
};

/**
 * Handler for socket.io 'join-room'. Adds user to room in Rooms Collection and adds room to user object
 * in User Collection
 * @param userRoomObj
 * @param cb -- callback used to send data back to client
 */
exports.joinOrUpdateRoomViaSocket = function (userRoomObj, cb) {
  //console.log('called addUserToRoom');
  //console.log('userRoomObj', userRoomObj);
<<<<<<< HEAD
=======
  //var userId = userRoomObj.user.userId;
>>>>>>> (fix) fix websocket errors on refresh (in deployed version) and refresh not loading marker data properly.
  var userId = userRoomObj.user._id;
  var roomId = userRoomObj.roomId;
  var roomName;
  var usersInRoom;
  addUserToRoomOrUpdateRoom(userId, roomId, userRoomObj, cb);
};

exports.updateRoomChats = function (roomId, userId, username, message, callback) {
  //Create the message object
  var chatObj = {
    userId: userId,
    username: username,
    message: message,
    date: new Date()
  };
  //push new chat message to MidUp room messages array
  Rooms.update(
    {"_id": roomId},
    {"$push": {"messages": chatObj}},
    function (err, numAffected) {
      if (err) {
        console.log('updateRoomChats error:' + err);
      } else {
        //console.log('updateRoomChats numAffected:' + numAffected);
        callback(chatObj);
      }
    }
  );
};

exports.getRecentChatMessages = function (roomId, callback) {
  Rooms.findById(roomId, function (err, room) {
    if (err) {
      console.log(err);
<<<<<<< HEAD
=======
    } else if ( !room ) {
      console.log('room does not exist in getRecentChatMessages');
>>>>>>> (fix) fix websocket errors on refresh (in deployed version) and refresh not loading marker data properly.
    } else {
      var messages = room.messages.slice(0, 100);
      callback(messages, err);
    }
  });
};

function addUserToRoomOrUpdateRoom(userId, roomId, userRoomObj, cb) {
<<<<<<< HEAD
  console.log(123);
  var roomName, usersInRoom;
  var result;
  Rooms.findById(roomId, function (err, room) {
    //console.log('room is ', room);
    if (err) {
      return cb(_, err);
    }
    if (!room) {
      return cb(_, err);
    }
    roomName = room.name;
    room.info = "changed to not awesome";
    var preExistingUser = false;
    usersInRoom = room.users;
    for (var j = 0, len = usersInRoom.length; j < len; j++) {
      //console.log('got here Jonah');
      if (usersInRoom[j]._id === userId) {
        if (userRoomObj.user.coords.latitude !== "") {
          usersInRoom[j].coords.latitude = userRoomObj.user.coords.latitude;
        }
        if (userRoomObj.user.coords.longitude !== "") {
          usersInRoom[j].coords.longitude = userRoomObj.user.coords.longitude;
        }
        usersInRoom[j].name = userRoomObj.user.name;
        //add user profile imageUrl to the user in the room so we can return imageUrl for markers
        User.findById(userId, function (err, user) {
          if (err) {
            console.log('err in User.findById is ', err);
          } else {
            //usersInRoom[j].imageUrl = user.imageUrl;
          }
        });
        preExistingUser = true;
        break;
      }
    }
    if (!preExistingUser) {
      // if( userRoomObj.user.coords.latitude !== "" || userRoomObj.user.coords.longitude !== "" ) {
      usersInRoom.push(userRoomObj.user);
      // }
    }
    //console.log('usersInRoom ', usersInRoom);
    Rooms.findById(roomId, function (err, room) {
      if (!err) {
        room.users = usersInRoom;
        room.save();
        User.findById(userId, function (err, user) {
          if (err) {
            return cb(_, err);
          } else if (user === null || user === undefined) {
            //return cb(_, _, true);
          }
          else {
            var flag = false;
            var userInRooms = user.memberOfRooms;
            for (var i = 0, len = userInRooms.length; i < len; i++) {
              if (user.memberOfRooms[i].roomId === roomId) {
                //console.log('user already a member of this room');
                flag = true;
                break;
              }

            }
            if (!flag) {
              user.memberOfRooms.push({roomId: roomId, name: roomName});
            }
            user.save(function (err) {
              if (err) return cb(_, err);
            });
            //callback for sending data back to client
            Rooms.findById(roomId, function (err, room) {
              //console.log('+++++++ROOM: ', room);
              var usersObj = room.users.reduce(function (a, b) {
                a[b._id] = b;
                return a;
              }, {});
              console.log('usersObj is ', usersObj);
              //use callback to send useObj object of user objects back to client
              cb(usersObj);
            });
          }
        });
      }
    });
  });
};


exports.updateRoomChats = function(roomId, userId, username, message, callback){
  //Create the message object
  var chatObj = {
    userId: userId,
    username: username,
    message: message,
    date: new Date()
  };
  //push new chat message to MidUp room messages array
  Rooms.update(
    { "_id": roomId },
    { "$push": {"messages": chatObj }},
    function(err, numAffected){
      if(err){
        console.log('updateRoomChats error:' + err);
      } else {
        console.log('updateRoomChats numAffected:' + numAffected);
        callback(chatObj);
      }
    }
  );
};

exports.getRecentChatMessages = function(roomId, callback) {
  Rooms.findById(roomId, function(err, room) {
    if(err){
      console.log(err);
    } else {
      var messages = room.messages.slice(0, 100);
      callback(messages, err);
    }
  });
};

exports.updateVote = function(roomId, likeType, userId, locData, callback){
Rooms.findById(roomId, function(err, room) {
    if(err){
      console.log('updateVote Error:' + err);
    } else {
      var locations = room.locations;
      var returnloc = {};
      locations.forEach(function(x){
        if(x.id === locData.id) {
          if(!(_.contains(x.voters, userId)) || likeType === -1) {
            console.log('found record', x.name, likeType, x.votes + likeType);
            x.votes = x.votes + likeType;
            console.log('result', x.votes);
            if(likeType === 1){
              console.log('adding to record');
              x.voters.push(userId);
            } else {
              x.voters = _.without(x.voters, userId);
            }
          }
          returnloc = x;
        }
      });
      room.locations = locations;
      room.save();
      console.log('room ',room.locations);
      
      console.log('update vote');
      callback(returnloc);
    }
    
  });
};

exports.addLoc = function (roomId, locData, userId, callback){
   console.log('roomId', roomId);
   var found = 0;
   Rooms.findById(roomId, function(err, room) {
    if(err){
      console.log('addLoc Error:' + err);
    } else {
      for(var x = 0; x < room.locations.length; x++){
        if(room.locations[x].id === locData.id){
          console.log('found id call updateVote');
          exports.updateVote(roomId, 1, userId, locData, callback);
          found = 1;
          break;
        }
      }
      if(!found){
        Rooms.update(
        { "_id": roomId },
        { "$push": {"locations": locData }},
        function(err, numAffected){
          if(err){
            console.log('updateVotes error:' + err);
          } else {
            console.log('updateVotes numAffected:' + numAffected);
            callback(locData);
          }
        });
      }
    } 
  });
};

exports.getVotes = function(roomId, callback) {
  Rooms.findById(roomId, function(err, room) {
    if(err){
      console.log('getVotes Error:' + err);
    } else {;
      callback(room.locations);
    }
  });
}

=======
  //console.log('123 ', userRoomObj);
  //console.log('userId is ', userId);
  var roomName;
  var query = {'_id': roomId, 'users.userId': userId};
  var update = { 'userId': userId,
    'name': userRoomObj.user.name,
    'coords': { 'latitude': userRoomObj.user.coords.latitude, 'longitude': userRoomObj.user.coords.longitude },
    'owner': userRoomObj.user.owner,
    'imageUrl': userRoomObj.user.imageUrl
  };
  //Query Rooms for a room that has specific user; if user does not exist, push user to users array
  //if user exists, update user data
  Rooms.findOne(query,
    function(err, query) {
      if( err ) { console.dir('ERROR IN addUserToRoomOrUpdateRoom, ', err);}
      //if user in room does not exist
      else if( !query ) {
        Rooms.findById(roomId, function(err, room) {
          if( err) console.log('ERROR in findById inside addUserToRoomOrUpdateRoom ', err);
          else if( !room ) { console.log('room does not exist in addUserToRoomOrUpdateRoom '); }
          else {
            roomName = room.name;
            room.users.push(update);
            room.save(function(err, data) {
              if(err) console.log('error in room.save in addUserToRoomOrUpdateRoom ', err);
              else {
                //add room to user.isMemberOf in User Collection
                User.findById(userId, function (err, user) {
                  //console.log('USER got here');
                  if (err) {
                    console.log('error in updating User Coll. in  addUserToRoomOrUpdateRoom ', err);
                    return cb(_, err);
                  } else if (user === null || user === undefined) {
                    //return cb(_, _, true);
                  }
                  else {
                    var flag = false;
                    var userInRooms = user.memberOfRooms;
                    for (var i = 0, len = userInRooms.length; i < len; i++) {
                      if (user.memberOfRooms[i].roomId === roomId) {
                        //console.log('user already a member of this room');
                        flag = true;
                        break;
                      }
                    }
                    if(!flag) {
                      user.memberOfRooms.push({roomId: roomId, name: roomName});
                      user.save(function (err) {
                        if (err) {
                          console.log('err is ', err);
                          return cb(_, err);
                        }
                      });
                    }
                  }
                });
                //create object of user objects to send back to client
                var usersObj = data.users.reduce(function (a, b) {
                  a[b.userId] = b;
                  return a;
                }, {});
                //console.log('usersObj in query.save is ', usersObj);
                cb(usersObj);
              }
            });
          }
        });
      }
      //else update user already in room
      else {
        //console.log('query is ', query);
        var userArray = query.users;
        for(var i = 0, len = userArray.length; i < len; i++) {
          if(userArray[i].userId === userId) {
            userArray[i].name = update.name;
            if( update.coords.longitude !== "" || update.coords.latitude !== "") {
              userArray[i].coords = update.coords;
            }
            userArray[i].owner = update.owner;
            userArray[i].imageUrl = update.imageUrl;
          }
        }
        query.users = userArray;
        query.save(function(err, data) {
          if(err) console.log('error saving query.save in addUserToRoomOrUpdateRoom ', err);
          else {
            console.log('UPDATE data is ', data);
            //create Object of user objects to send to client to populate map markers
            var usersObj = data.users.reduce(function (a, b) {
                a[b.userId] = b;
                return a;
              }, {});
            //console.log('usersObj in query.save is ', usersObj);
            cb(usersObj);
          }
        });
      }
    }
  );


  //Rooms.update(query, update,
  //  function(err, room) {
  //    if( err ) { console.log('ERROR IN addUserToRoomOrUpdateRoom, ', err);}
  //    else {
  //      console.log('room is ', room);
  //    }
  //});

  //Rooms.findById(roomId, function (err, room) {
  //  //console.log('room is ', room);
  //  if (err) {
  //    return cb(_, err);
  //  }
  //  if (!room) {
  //    return cb(_, err);
  //  }
  //  roomName = room.name;
  //  room.info = "changed to not awesome";
  //  var preExistingUser = false;
  //  usersInRoom = room.users;
  //  for (var j = 0, len = usersInRoom.length; j < len; j++) {
  //    //console.log('got here Jonah');
  //    if (usersInRoom[j]._id === userId) {
  //      if (userRoomObj.user.coords.latitude !== "") {
  //        usersInRoom[j].coords.latitude = userRoomObj.user.coords.latitude;
  //      }
  //      if (userRoomObj.user.coords.longitude !== "") {
  //        usersInRoom[j].coords.longitude = userRoomObj.user.coords.longitude;
  //      }
  //      usersInRoom[j].name = userRoomObj.user.name;
  //      //add user profile imageUrl to the user in the room so we can return imageUrl for markers
  //      User.findById(userId, function (err, user) {
  //        if (err) {
  //          console.log('err in User.findById is ', err);
  //        } else {
  //          usersInRoom[j].imageUrl = user.imageUrl;
  //        }
  //      });
  //      preExistingUser = true;
  //      break;
  //    }
  //  }
  //  if (!preExistingUser) {
  //    // if( userRoomObj.user.coords.latitude !== "" || userRoomObj.user.coords.longitude !== "" ) {
  //    usersInRoom.push(userRoomObj.user);
  //    // }
  //  }
  //  //console.log('usersInRoom ', usersInRoom);
  //  Rooms.findById(roomId, function (err, room) {
  //    if (!err) {
  //      room.users = usersInRoom;
  //      room.save();
  //      User.findById(userId, function (err, user) {
  //        if (err) {
  //          return cb(_, err);
  //        } else if (user === null || user === undefined) {
  //          //return cb(_, _, true);
  //        }
  //        else {
  //          var flag = false;
  //          var userInRooms = user.memberOfRooms;
  //          for (var i = 0, len = userInRooms.length; i < len; i++) {
  //            if (user.memberOfRooms[i].roomId === roomId) {
  //              //console.log('user already a member of this room');
  //              flag = true;
  //              break;
  //            }
  //
  //          }
  //          if (!flag) {
  //            user.memberOfRooms.push({roomId: roomId, name: roomName});
  //          }
  //          user.save(function (err) {
  //            if (err) return cb(_, err);
  //          });
  //          //callback for sending data back to client
  //          Rooms.findById(roomId, function (err, room) {
  //            //console.log('+++++++ROOM: ', room);
  //            var usersObj = room.users.reduce(function (a, b) {
  //              a[b._userId] = b;
  //              return a;
  //            }, {});
  //            console.log('usersObj is ', usersObj);
  //            //use callback to send useObj object of user objects back to client
  //            cb(usersObj);
  //          });
  //        }
  //      });
  //    }
  //  });
  //});
}

//function addUserToRoomOrUpdateRoom(userId, roomId, userRoomObj, cb) {
//  console.log(123);
//  var roomName, usersInRoom;
//  var result;
//  Rooms.findById(roomId, function (err, room) {
//    //console.log('room is ', room);
//    if (err) {
//      return cb(_, err);
//    }
//    if (!room) {
//      return cb(_, err);
//    }
//    roomName = room.name;
//    room.info = "changed to not awesome";
//    var preExistingUser = false;
//    usersInRoom = room.users;
//    for (var j = 0, len = usersInRoom.length; j < len; j++) {
//      //console.log('got here Jonah');
//      if (usersInRoom[j]._id === userId) {
//        if (userRoomObj.user.coords.latitude !== "") {
//          usersInRoom[j].coords.latitude = userRoomObj.user.coords.latitude;
//        }
//        if (userRoomObj.user.coords.longitude !== "") {
//          usersInRoom[j].coords.longitude = userRoomObj.user.coords.longitude;
//        }
//        usersInRoom[j].name = userRoomObj.user.name;
//        //add user profile imageUrl to the user in the room so we can return imageUrl for markers
//        User.findById(userId, function (err, user) {
//          if (err) {
//            console.log('err in User.findById is ', err);
//          } else {
//            usersInRoom[j].imageUrl = user.imageUrl;
//          }
//        });
//        preExistingUser = true;
//        break;
//      }
//    }
//    if (!preExistingUser) {
//      // if( userRoomObj.user.coords.latitude !== "" || userRoomObj.user.coords.longitude !== "" ) {
//      usersInRoom.push(userRoomObj.user);
//      // }
//    }
//    //console.log('usersInRoom ', usersInRoom);
//    Rooms.findById(roomId, function (err, room) {
//      if (!err) {
//        room.users = usersInRoom;
//        room.save();
//        User.findById(userId, function (err, user) {
//          if (err) {
//            return cb(_, err);
//          } else if (user === null || user === undefined) {
//            //return cb(_, _, true);
//          }
//          else {
//            var flag = false;
//            var userInRooms = user.memberOfRooms;
//            for (var i = 0, len = userInRooms.length; i < len; i++) {
//              if (user.memberOfRooms[i].roomId === roomId) {
//                //console.log('user already a member of this room');
//                flag = true;
//                break;
//              }
//
//            }
//            if (!flag) {
//              user.memberOfRooms.push({roomId: roomId, name: roomName});
//            }
//            user.save(function (err) {
//              if (err) return cb(_, err);
//            });
//            //callback for sending data back to client
//            Rooms.findById(roomId, function (err, room) {
//              //console.log('+++++++ROOM: ', room);
//              var usersObj = room.users.reduce(function (a, b) {
//                a[b._id] = b;
//                return a;
//              }, {});
//              console.log('usersObj is ', usersObj);
//              //use callback to send useObj object of user objects back to client
//              cb(usersObj);
//            });
//          }
//        });
//      }
//    });
//  });
//}


>>>>>>> (fix) fix websocket errors on refresh (in deployed version) and refresh not loading marker data properly.
