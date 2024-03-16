const { dirname } = require('path');
const { fileURLToPath }  = require('url')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const PORT = 5000;
const mongoDB = require("./config/DB");
const multer = require("multer");
const moment = require('moment')
const { createServer } = require('http')
const { Server } = require('socket.io')
const { ObjectId } = require('mongoose').Types;
const fs = require('fs')

const mongoose = require('mongoose');
const path = require('path');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));


const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
})




httpServer.listen(PORT, async () => {
  mongoDB().then(() => {
    console.log("Server is Running");
  })

});


const PATH = "./public/images";
const upload = multer({
  storage: multer.diskStorage({
    destination: PATH,
    filename: function (req, file, cb) {
      let origialname = file.originalname;
      let ext = origialname.split(".").pop();
      let filename = origialname.split(".").slice(0, -1).join(".");
      cb(null, filename + "." + ext);
    },
  }),
});

//models



//Admin Schema

const adminSchemaStucture = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
})

const Admin = mongoose.model('adminSchema', adminSchemaStucture)

// Admin Insert

app.post('/Admin', async (req, res) => {
  try {
    const { name, email, password } = req.body
    // let admin = await Admin.findOne({ email })

    // if (admin) {
    //     return res
    //         .status(400)
    //         .json({ errors: [{ msg: 'Admin already exists' }] })
    // }

    let admin = new Admin({
      name,
      email,
      password,
    })

    await admin.save()

    res.json({ message: 'Admin inserted successfully' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// select Admin

app.get('/Admin', async (req, res) => {
  const admin = await Admin.find()
  res.send({ admin })
})

//Delete Admin

app.delete('/Admin/:id', async (req, res) => {
  try {
    const Id = req.params.id
    console.log(Id)

    const deletedAdmin = await Admin.findByIdAndDelete(Id)

    if (!deletedAdmin) {
      return res.status(404).json({ message: 'Admin not found' })
    }

    res.json({ message: 'Admin deleted successfully', deletedAdmin })
  } catch (err) {
    console.error('Error deleting Admin:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

//Admin update

app.put('/updateAdmin/:id', async (req, res) => {
  const id = req.params.id
  try {
    const { name, email, password } = req.body
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    )
    res.json(updatedAdmin)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})


const collegeSchemaStructure = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  Bio: {
    type: String,
  },
  Photo: {
    type: String,
  },
  Proof: {
    type: String,
  }
});
//insert
const College = mongoose.model("collegeSchema", collegeSchemaStructure);

app.post("/College",
  upload.fields([
    { name: "Proof", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      var fileValue = JSON.parse(JSON.stringify(req.files));
      var Proof = `http://127.0.0.1:${PORT}/images/${fileValue.Proof[0].filename}`;

      const { name, email, password } = req.body;
      const collegeSchemaData = new College({
        name, email, password, Proof
      });
      await collegeSchemaData.save();

      res.json({ message: "College inserted succesfully" });

    }
    catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  })

//select
app.get("/CollegeOne/:Id", async (req, res) => {
  const Id = req.params.Id

  try {
    let CollegeData = await College.findOne({ _id: Id });

    res.json({ CollegeData });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

//select
app.get("/College", async (req, res) => {

  try {
    let Collegelist = await College.find({ __v: 0 });

    res.json({ Collegelist });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})


//select
app.get("/CollegeAccepted", async (req, res) => {

  try {
    let Collegelist = await College.find({ __v: 1 });

    res.json({ Collegelist });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})


//select
app.get("/CollegeRejected", async (req, res) => {

  try {
    let Collegelist = await College.find({ __v: 2 });

    res.json({ Collegelist });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

//Delete

app.delete("/College/:Id", async (req, res) => {

  try {
    const Id = req.params.Id;
    const deleteCollege = await College.findByIdAndDelete(Id)


    res.json({ message: "College Deleted" });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

//Update

app.put("/College/:id", async (req, res) => {
  try {
    const Id = req.params.id
    const { Name, Email, Password, Bio, Photo } = req.body;

    const updatedCollege = await College.findByIdAndUpdate(
      Id,
      { Name, Email, Password, Bio, Photo, },
      { new: true }
    );
    res.json(updatedCollege)
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");

  }
});


//Update

app.put("/acceptCollege/:id", async (req, res) => {
  try {
    const Id = req.params.id

    const updatedCollege = await College.findByIdAndUpdate(
      Id,
      { __v: 1 },
      { new: true }
    );
    res.json(updatedCollege)
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");

  }
});




//Update

app.put("/rejectCollege/:id", async (req, res) => {
  try {
    const Id = req.params.id

    const updatedCollege = await College.findByIdAndUpdate(
      Id,
      { __v: 2 },
      { new: true }
    );
    res.json(updatedCollege)
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");

  }
});




const UserSchemaStructure = new mongoose.Schema({
  name: {
    type: String,
  },
  UserName: {
    type: String,
  },
  password: {
    type: String,
  },
  Bio: {
    type: String,
  },
  ProfilePhoto: {
    type: String,
  },
  email: {
    type: String,
  },
  hierarchy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HierarchySchema",
    required: true
  },
  CollegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "collegeSchema",
    required: true
  },
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "batchSchema",
    required: true
  },

});
const User = mongoose.model("UserSchema", UserSchemaStructure);
//insert
app.post("/User", async (req, res) => {
  const { name, email, password, hierarchy, CollegeId, batch } = req.body;
  try {
    const UserSchemaData = new User({
      name, email, password, hierarchy, CollegeId, batch
    });
    await UserSchemaData.save();

    res.json({ message: "User inserted succesfully" });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})
//select
app.get("/User", async (req, res) => {

  try {
    let Userlist = await User.find().populate('CollegeId');

    res.json({ Userlist });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

app.post("/SearchUser", async (req, res) => {
  try {
    const { userName, Id } = req.body;
    const objectId = new mongoose.Types.ObjectId(Id); // Convert Id to ObjectId

    // Assuming you have access to the college ID of the authenticated user
    const user = await User.findById(objectId).populate('CollegeId'); // Assuming college field is populated in the user document
    if (!user || !user.CollegeId) {
      return res.status(404).json({ error: "User or user's college not found" });
    }

    const collegeId = user.CollegeId._id; // Assuming college ID is stored in the college field

    // Using a regular expression for a case-insensitive search
    const userData = await User.find({
      $and: [
        { _id: { $ne: objectId } }, // Exclude the currently authenticated user
        { CollegeId: collegeId }, // Filter users by the same college
        { name: { $regex: userName, $options: 'i' } }
      ]
    });
    if (userData && userData.length > 0) {
      // Check if there is a room with matching fromId or toId for the current user
      const chatList = await ChatList.find({
        $or: [
          { ChatListUserOne: objectId, ChatListUserTwo: { $in: userData.map(user => user._id) } },
          { ChatListUserTwo: objectId, ChatListUserOne: { $in: userData.map(user => user._id) } },
        ],
      });

      // console.log(chatList);

      // Add a field indicating whether a room exists or not
      // Use map to create a new array with the modified objects
      const userDataWithRooms = userData.map(user => ({
        ...user.toObject(),
        hasRoom: chatList.some(room =>
          (room.ChatListUserOne.equals(objectId) && room.ChatListUserTwo.equals(user._id)) ||
          (room.ChatListUserTwo.equals(objectId) && room.ChatListUserOne.equals(user._id))
        ),
      }));

      console.log(userDataWithRooms);
      return res.status(200).json({ userDataWithRooms });
    } else {
      return res.status(200).json({ userDataWithRooms: [] });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


//delete
app.delete("/User/:Id", async (req, res) => {

  try {
    const Id = req.params.Id;
    const deleteUser = await User.findByIdAndDelete(Id)


    res.json({ message: "User Deleted" });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})
//update

app.put("/User/:id", async (req, res) => {
  try {
    const Id = req.params.id
    const { FullName, UserName, Email, Password, Bio, ProfilePhoto, HierarchyId, CollegeId, DOB } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      Id,
      { FullName, UserName, Email, Password, Bio, ProfilePhoto, HierarchyId, CollegeId, DOB },
      { new: true }
    );
    res.json(updatedUser)
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");

  }
});

app.get("/singleFriendUser/:Clid/:Id", async (req, res) => {
  try {
    const { Clid, Id } = req.params;

    const otherUser = await ChatList.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(Clid)
        }
      },
      {
        $project: {
          otherUser: {
            $cond: [
              { $eq: ['$ChatListUserOne', new mongoose.Types.ObjectId(Id)] },
              '$ChatListUserTwo',
              '$ChatListUserOne'
            ]
          },
          chatListId: '$_id' // Project the ChatList ID

        }
      },
      {
        $lookup: {
          from: 'userschemas',
          localField: 'otherUser',
          foreignField: '_id',
          as: 'userData'
        }
      },
      {
        $unwind: '$userData' // Unwind the array
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$userData", { chatListId: "$chatListId" }] // Combine friend and chatListId into a single object
          }
        } // Promote the unwound document to the root level

      }
    ]);

    if (otherUser.length === 0) {
      return res.json({ message: 'Other user data not found' });
    }
    res.json(otherUser[0]);
  } catch (error) {
    console.error("Error retrieving other user data:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});






const BatchSchemaStructure = new mongoose.Schema({
  Name: {
    type: String,
  },

});
const Batch = mongoose.model("BatchSchema", BatchSchemaStructure);
//insert
app.post("/Batch", async (req, res) => {
  const { Name } = req.body;
  try {
    const BatchSchemaData = new Batch({
      Name,
    });
    await BatchSchemaData.save();

    res.json({ message: "Batch inserted succesfully" });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})
//select
app.get("/Batch", async (req, res) => {

  try {
    let Batchlist = await Batch.find();

    res.json({ Batchlist });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})




const HierarchySchemaStructure = new mongoose.Schema({
  Name: {
    type: String,
  },

});
const Hierarchy = mongoose.model("HierarchySchema", HierarchySchemaStructure);
//insert
app.post("/Hierarchy", async (req, res) => {
  const { Name } = req.body;
  try {
    const HierarchySchemaData = new Hierarchy({
      Name,
    });
    await HierarchySchemaData.save();

    res.json({ message: "Hierarchy inserted succesfully" });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})
//select
app.get("/Hierarchy", async (req, res) => {

  try {
    let Hierarchylist = await Hierarchy.find();

    res.json({ Hierarchylist });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})


const ChatListSchemaStructure = new mongoose.Schema({
  ChatListUserOne: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSchema",
    required: true
  },
  ChatListUserTwo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSchema",
    required: true
  }

});
const ChatList = mongoose.model("ChatListSchema", ChatListSchemaStructure);
//insert
app.post("/ChatList", async (req, res) => {
  const { ChatListUserOne, ChatListUserTwo } = req.body;
  try {
    const ChatListSchemaData = new ChatList({
      ChatListUserOne, ChatListUserTwo
    });
    await ChatListSchemaData.save();
    io.sockets.emit('fromServerFollowRequest')


    res.json({ message: "ChatList inserted succesfully" });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})
//select
app.get("/ChatList/:id", async (req, res) => {

  try {
    const Id = req.params.id
    let ChatListlist = await ChatList.find({ ChatListUserTwo: Id, __v: 0 }).populate('ChatListUserOne');

    console.log(ChatListlist);
    res.json({ ChatListlist });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

app.get("/ChatListFriends/:id", async (req, res) => {
  try {
    const ObjUser = new mongoose.Types.ObjectId(req.params.id);

    let ChatListlist = await ChatList.aggregate([
      {
        $match: {
          $or: [
            { ChatListUserOne: ObjUser },
            { ChatListUserTwo: ObjUser }
          ]
        }
      },
      {
        $lookup: {
          from: 'userschemas',
          localField: 'ChatListUserOne',
          foreignField: '_id',
          as: 'UserOneData'
        }
      },
      {
        $lookup: {
          from: 'userschemas',
          localField: 'ChatListUserTwo',
          foreignField: '_id',
          as: 'UserTwoData'
        }
      },
      {
        $project: {
          friend: {
            $cond: {
              if: { $eq: ['$ChatListUserOne', ObjUser] },
              then: { $arrayElemAt: ['$UserTwoData', 0] },
              else: { $arrayElemAt: ['$UserOneData', 0] }
            }
          },
          chatListId: '$_id', // Project the ChatList ID
          __v: 1 // Include the __v field
        }
      },
      {
        $unwind: "$friend" // Unwind the friend field
      },
      {
        $match: {
          $and: [
            { __v: 1 }
          ]
        }
      },
      {
        $lookup: {
          from: "chatschemas", // Assuming your Chat model is named "Chat"
          localField: "_id",
          foreignField: "ChatListId",
          as: "chats"
        }
      },
      // Unwind the chats array
      { $unwind: "$chats" },
      // Sort chats by ChatDateTime field in descending order
      { $sort: { "chats.ChatDateTime": -1 } },
      {
        $group: {
          _id: "$friend._id", // Group by friend ID
          friend: { $first: "$friend" }, // Use $first accumulator for all fields from the User collection
          chatListId: { $first: "$chatListId" }, // Preserve the ChatList ID
          latestChat: { $first: "$chats" } // Get the latest chat

        }
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              "$friend",
              { chatListId: "$chatListId" }, // Include chatListId
              { latestChat: "$latestChat" } // Include latest chat
            ]
          }
        }
      }
    ]);

    console.log(ChatListlist);
    res.json({ ChatListlist });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});



//delete
app.delete("/ChatList/:Id", async (req, res) => {

  try {
    const Id = req.params.Id;
    const deleteChatList = await ChatList.findByIdAndDelete(Id)


    res.json({ message: "ChatList Deleted" });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})


app.put("/ChatListAccept/:Id", async (req, res) => {

  try {
    const Id = req.params.Id
    const ChatListlist = await ChatList.findByIdAndUpdate(
      Id,
      { __v: 1 },
      { new: true }
    );


    res.json({ ChatListlist });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

app.put("/ChatListReject/:Id", async (req, res) => {

  try {
    const Id = req.params.Id
    const ChatListlist = await ChatList.findByIdAndUpdate(
      Id,
      { __v: 2 },
      { new: true }
    );


    res.json({ ChatListlist });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})


const ChatSchemaStructure = new mongoose.Schema({
  ChatFromId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSchema",
    required: true
  },
  ChatToId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSchema",
    required: true
  },
  ChatContent: {
    type: String,
  },
  ChatFile: {
    type: String,
  },
  ChatDateTime: {
    type: String,
  },
  ChatListId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatListSchema",
    required: true
  },

});
const Chat = mongoose.model("ChatSchema", ChatSchemaStructure);

app.get("/Chat/:ChatlistId", async (req, res) => {
  try {
    const ChatListId = new mongoose.Types.ObjectId(req.params.ChatlistId)

    const chats = await Chat.aggregate([
      {
        $match: {
          ChatListId: ChatListId
        }
      },

    ]);
    res.json(chats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


app.delete("/Chat/:Id", async (req, res) => {

  try {
    const Id = req.params.Id;
    const deleteChat = await Chat.findByIdAndDelete(Id)


    res.json({ message: "Chat deleted" });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})


const CollegeFeedSchemaStructure = new mongoose.Schema({
  CollegeFeedDateTime: {
    type: String,
  },
  CollegeFeedContent: {
    type: String,
  },
  CollegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "collegeSchema",
    required: true
  },
  CollegeDiscription: {
    type: String,
  },
  CollegeFeedTotalLike: {
    type: String,
  },
  CollegeFeedTotalComment: {
    type: String,
  },

});
const CollegeFeed = mongoose.model("CollegeFeedSchema", CollegeFeedSchemaStructure);


app.post("/CollegeFeed",
  upload.fields([
    { name: "CollegeFeedContent", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      var fileValue = JSON.parse(JSON.stringify(req.files));
      var CollegeFeedContent = `http://127.0.0.1:${PORT}/images/${fileValue.CollegeFeedContent[0].filename}`;

      const { CollegeId, CollegeDiscription } = req.body;

      const CollegeFeedSchemaData = new CollegeFeed({
        CollegeFeedDateTime: moment().format(), CollegeFeedContent, CollegeId, CollegeDiscription
      });
      await CollegeFeedSchemaData.save();

      res.json({ message: "College Feed inserted succesfully" });

    }
    catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  })


app.get("/CollegeFeed", async (req, res) => {
  try {
    let CollegeFeedlist = await CollegeFeed.find().populate('CollegeId');

    CollegeFeedlist = await Promise.all(CollegeFeedlist.map(async (feed) => {
      const uploadedTime = moment(feed.CollegeFeedDateTime);
      const currentTime = moment();
      const timeDifference = moment.duration(currentTime.diff(uploadedTime));
      feed = feed.toJSON(); // Convert Mongoose document to plain JavaScript object
      feed.timeDifference = timeDifference.humanize(); // Format the time difference

      return feed;
    }));
    res.json({ CollegeFeedlist });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});



app.get("/CollegeFeed/:Id", async (req, res) => {
  try {
    const Id = req.params.Id
    let CollegeFeedlist = await CollegeFeed.find({ CollegeId: Id }).populate('CollegeId');

    CollegeFeedlist = await Promise.all(CollegeFeedlist.map(async (feed) => {
      const uploadedTime = moment(feed.CollegeFeedDateTime);
      const currentTime = moment();
      const timeDifference = moment.duration(currentTime.diff(uploadedTime));
      feed = feed.toJSON(); // Convert Mongoose document to plain JavaScript object
      feed.timeDifference = timeDifference.humanize(); // Format the time difference

      return feed;
    }));
    res.json({ CollegeFeedlist });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});



app.delete("/CollegeFeed/:Id", async (req, res) => {

  try {
    const Id = req.params.Id;
    await CollegeFeed.findByIdAndDelete(Id)

    res.json({ message: "Feed Deleted" });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

app.put("/CollegeFeed/:id", async (req, res) => {
  try {
    const Id = req.params.id
    const { CollegeFeedDateTime, CollegeFeedContent, CollegeId, CollegeDiscription, CollegeFeedTotalLike, CollegeFeedTotalComment } = req.body;

    const updatedCollegeFeed = await CollegeFeed.findByIdAndUpdate(
      Id,
      { CollegeFeedDateTime, CollegeFeedContent, CollegeId, CollegeDiscription, CollegeFeedTotalLike, CollegeFeedTotalComment },
      { new: true }
    );
    res.json(updatedCollegeFeed)
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");

  }
});


const UserFeedSchemaStructure = new mongoose.Schema({
  UserFeedDateTime: {
    type: String,
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSchema",
  },
  UserFeedContent: {
    type: String,
  },
  UserFeedDescription: {
    type: String,
  },
  UserFeedTotalLike: {
    type: String,
  },
  UserFeedTotalComment: {
    type: String,
  }
});
const UserFeed = mongoose.model("userFeedSchema", UserFeedSchemaStructure);

app.post("/UserFeed",
  upload.fields([
    { name: "Image", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      var fileValue = JSON.parse(JSON.stringify(req.files));
      var UserFeedContent = `http://127.0.0.1:${PORT}/images/${fileValue.Image[0].filename}`;

      const { UserFeedDescription, } = req.body;
      const UserFeedSchemaData = new UserFeed({
        UserFeedContent, UserFeedDescription,
      });
      await UserFeedSchemaData.save();

      res.json({ message: "UserFeed inserted succesfully" });

    }
    catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  })

app.get("/UserFeed", async (req, res) => {

  try {
    let UserFeedlist = await UserFeed.find().populate('UserId');

    res.json({ UserFeedlist });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

app.delete("/UserFeed/:Id", async (req, res) => {

  try {
    const Id = req.params.Id;
    const deleteUserFeed = await UserFeed.findByIdAndDelete(Id)


    res.json({ message: "Feed Deleted" });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

app.put("/UserFeed/:id", async (req, res) => {
  try {
    const Id = req.params.id
    const { UserFeedDateTime, UserId, UserFeedContent, UserFeedDescription, UserFeedTotalLike, UserFeedTotalComment } = req.body;

    const updatedUserFeed = await UserFeed.findByIdAndUpdate(
      Id,
      { UserFeedDateTime, UserId, UserFeedContent, UserFeedDescription, UserFeedTotalLike, UserFeedTotalComment },
      { new: true }
    );
    res.json(updatedUserFeed)
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");

  }
});


const LikeSchemaStructure = new mongoose.Schema({
  CollegefeedId: {
    type: String,
  },
  UserFeedId: {
    type: String,
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSchema",
    required: true
  },


});
const Like = mongoose.model("LikeSchema", LikeSchemaStructure);

app.post("/LikeCollegeFeed", async (req, res) => {
  try {
    const { CollegefeedId, UserId } = req.body;
    const LikeSchemaData = new Like({
      CollegefeedId, UserId
    });
    await LikeSchemaData.save();

    res.json({ message: "Like inserted succesfully" });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})


app.post("/Like", async (req, res) => {
  try {
    const { UserFeedId, UserId } = req.body;
    const LikeSchemaData = new Like({
      UserFeedId, UserId
    });
    await LikeSchemaData.save();

    res.json({ message: "Like inserted succesfully" });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

app.get("/LikeDetails/:Uid/:Fid", async (req, res) => {
  try {
    const Fid = req.params.Fid
    const Uid = req.params.Uid
    let like = await Like.findOne({ CollegefeedId: Fid, UserId: Uid }) ? true : false;
    let count = await Like.countDocuments({ CollegefeedId: Fid })

    res.json({ like, count });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})




app.get("/commentDetails/:Uid/:Fid", async (req, res) => {
  try {
    const Fid = req.params.Fid
    const Uid = req.params.Uid
    let count = await Comment.countDocuments({ CollegefeedId: Fid, UserId: Uid })

    res.json({ count });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

app.delete("/Like/:Id/:fId", async (req, res) => {

  try {
    const Id = req.params.Id;
    const fId = req.params.fId
    await Like.deleteOne({ UserId: Id, CollegefeedId: fId })


    res.json({ message: "Deleted" });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})


const CommentSchemaStructure = new mongoose.Schema({
  CollegefeedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CollegeFeedSchema",
  },
  UserFeedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserFeedSchema",
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSchema",
    required: true
  },
  Content: {
    type: String,
  }

});
const Comment = mongoose.model("CommentSchema", CommentSchemaStructure);

app.post("/Comment", async (req, res) => {
  const { CollegefeedId, UserId, Content } = req.body;
  try {
    const CommentSchemaData = new Comment({
      CollegefeedId, UserId, Content
    });
    await CommentSchemaData.save();

    res.json({ message: "Comment inserted succesfully" });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

app.get("/CollegeComment/:Id", async (req, res) => {
  const Id = req.params.Id

  try {
    let Commentlist = await Comment.find({ CollegefeedId: Id }).populate('UserId');
    res.json({ Commentlist });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

app.delete("/Comment/:Id", async (req, res) => {

  try {
    const Id = req.params.Id;
    const deleteComment = await Comment.findByIdAndDelete(Id)


    res.json({ message: "Comment deleted" });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

app.put("/Comment/:id", async (req, res) => {
  try {
    const Id = req.params.id
    const { CollegefeedId, UserFeedId, UserId, Content } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      Id,
      { CollegefeedId, UserFeedId, UserId, Content },
      { new: true }
    );
    res.json(updatedComment)
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");

  }
});



const ComplaintSchemaStructure = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "collegeSchema",
    required: true
  },
  ToUserId: {
    type: String,
  },
  ComplaintContent: {
    type: String,
  },
  ComplaintReply: {
    type: String,
  },

});
const Complaint = mongoose.model("ComplaintSchema", ComplaintSchemaStructure);

app.post("/Complaint", async (req, res) => {
  const { UserId, ToUserId, ComplaintContent, ComplaintReply } = req.body;
  try {
    const ComplaintSchemaData = new Complaint({
      UserId, ToUserId, ComplaintContent, ComplaintReply
    });
    await ComplaintSchemaData.save();

    res.json({ message: "Complaint inserted succesfully" });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

app.get("/Complaint", async (req, res) => {

  try {
    let Complaintlist = await Complaint.find().populate('UserId');

    res.json({ Complaintlist });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})




app.post('/Login', async (req, res) => {
  try {
    const { email, password } = req.body
    console.log(req.body);
    const user = await User.findOne({ email })
    const college = await College.findOne({ email, __v: 1 })
    const admin = await Admin.findOne({ email })

    if (user) {
      if (user.password == password) {
        res.send({
          id: user._id,
          login: 'user',
        })
      }
    } else if (college) {
      if (college.password == password) {

        res.send({
          id: college._id,
          login: 'college',
        })
      }
    } else if (admin) {
      if (admin.password == password) {

        res.send({
          id: admin._id,
          login: 'admin',
        })
      }
    } else {
      res.send({
        id: user._id,
        login: 'Invalid credential',
      })
    }
  } catch (error) { }
})


io.on('connection', (socket) => {

  socket.on("createRoomFromClient", ({ CId }) => {
    const roomKey = CId
    socket.join(roomKey);
  })

  socket.on("typing-started", ({ CId }) => {
    socket.broadcast.to(CId).emit("typing-started-from-server")
  })

  socket.on("typing-stopped", ({ CId }) => {
    socket.broadcast.to(CId).emit("typing-stopped-from-server")
  })

  socket.on("toServer-sendMessage", async ({ message, Id, Uid, ToId }, callback) => {
    try {
      const ChatSchemaData = new Chat({
        ChatFromId: Uid,
        ChatToId: ToId,
        ChatListId: Id,
        ChatContent: message,
        ChatDateTime: moment().format(),
      });
      const chatDoc = await ChatSchemaData.save();
      callback(chatDoc);
      socket.broadcast.to(Id).emit("toServer-sendMessage", chatDoc);


    }
    catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  })




  socket.on("toServer-searchUser", async ({ userName, Id }) => {
    try {
      const ObjUser = new mongoose.Types.ObjectId(Id);

      // const regex = new RegExp(`^${userName}`, 'i'); // Case-insensitive regex
      // const usersData = await User.find({ name: { $regex: regex } });

      let ChatListlist = await ChatList.aggregate([
        {
          $match: {
            $or: [
              { ChatListUserOne: ObjUser },
              { ChatListUserTwo: ObjUser }
            ]
          }
        },
        {
          $lookup: {
            from: 'userschemas',
            localField: 'ChatListUserOne',
            foreignField: '_id',
            as: 'UserOneData'
          }
        },
        {
          $lookup: {
            from: 'userschemas',
            localField: 'ChatListUserTwo',
            foreignField: '_id',
            as: 'UserTwoData'
          }
        },
        {
          $project: {
            friend: {
              $cond: {
                if: { $eq: ['$ChatListUserOne', ObjUser] },
                then: { $arrayElemAt: ['$UserTwoData', 0] },
                else: { $arrayElemAt: ['$UserOneData', 0] }
              }
            },
            chatListId: '$_id', // Project the ChatList ID
            __v: 1 // Include the __v field
          }
        },
        {
          $unwind: "$friend" // Unwind the friend field
        },
        {
          $match: {
            $and: [
              { __v: 1 }, // Check if __v is equal to 2
              { $or: [{ "friend.name": { $regex: `^${userName}`, $options: 'i' } }] } // Case-insensitive regex for user name
            ]
          }
        },
        {
          $group: {
            _id: "$friend._id", // Group by friend ID
            friend: { $first: "$friend" }, // Use $first accumulator for all fields from the User collection
            chatListId: { $first: "$chatListId" } // Preserve the ChatList ID
          }
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: ["$friend", { chatListId: "$chatListId" }] // Combine friend and chatListId into a single object
            }
          }
        }
      ]);


      if (ChatListlist.length === 0) {
        socket.emit("fromServer-searchUser", { ChatListlist: [] });
      } else {
        socket.emit("fromServer-searchUser", { ChatListlist });
      }
    } catch (error) {
      console.error("Error searching users:", error);
    }
  })

  socket.on("myFriendsFromClient", async () => {

    socket.broadcast.emit("myFriendsFromSever")
  })


  socket.on("uploadFile", ({ data, CId, Uid, ToId, fileName },callback) => {

    const filePath = path.join(__dirname, 'upload', fileName); // Use path.join for file path




    fs.writeFile(filePath, data, { encoding: 'base64' }, async () => {


        const ChatSchemaData = new Chat({
          ChatFromId: Uid,
          ChatToId: ToId,
          ChatListId: CId,
          ChatFile:data.toString('base64'),
          ChatDateTime: moment().format(),
        });
        const chatDoc = await ChatSchemaData.save();
        callback(chatDoc);
        socket.broadcast.to(CId).emit("showuploadFile", chatDoc);

      

        

    });


  })
})
