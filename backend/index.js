const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const PORT = 5000;
const mongoDB = require("./config/DB");
const multer = require("multer");

const mongoose = require('mongoose');


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));


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



app.listen(PORT, () => {
  mongoDB().then(() => {
    console.log("Server is Running");
  })

});


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
  ChatListUser1: {
    type: String,
  },
  ChatListUser2: {
    type: String,
  }

});
const ChatList = mongoose.model("ChatListSchema", ChatListSchemaStructure);
//insert
app.post("/ChatList", async (req, res) => {
  const { ChatListUser1, ChatListUser2 } = req.body;
  try {
    const ChatListSchemaData = new ChatList({
      ChatListUser1, ChatListUser2
    });
    await ChatListSchemaData.save();

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
    let ChatListlist = await ChatList.find();

    // const id = req.params.id
    // let ChatListlist= await ChatList.find({ChatListUser1:id});

    res.json({ ChatListlist });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})
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


const ChatSchemaStructure = new mongoose.Schema({
  ChatFromId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatListSchema",
    required: true
  },
  ChatToId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatListSchema",
    required: true
  },
  ChatListId: {
    type: String,
  },

});
const Chat = mongoose.model("ChatSchema", ChatSchemaStructure);

app.post("/Chat", async (req, res) => {
  const { ChatFromId, ChatToId, ChatListId } = req.body;
  try {
    const ChatSchemaData = new Chat({
      ChatFromId, ChatToId, ChatListId
    });
    await ChatSchemaData.save();

    res.json({ message: "Chat inserted succesfully" });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

app.get("/Chat", async (req, res) => {

  try {
    let Chatlist = await Chat.find().populate('ChatFromId').populate('ChatToId');

    res.json({ Chatlist });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

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

      const { CollegeFeedDateTime, CollegeId, CollegeDiscription } = req.body;

      const CollegeFeedSchemaData = new CollegeFeed({
        CollegeFeedDateTime, CollegeFeedContent, CollegeId, CollegeDiscription
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

    res.json({ CollegeFeedlist });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

app.delete("/CollegeFeed/:Id", async (req, res) => {

  try {
    const Id = req.params.Id;
    const deleteCollegeFeed = await CollegeFeed.findByIdAndDelete(Id)


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

app.post("/Like", async (req, res) => {
  const { CollegefeedId, UserFeedId, UserId } = req.body;
  try {
    const LikeSchemaData = new Like({
      CollegefeedId, UserFeedId, UserId
    });
    await LikeSchemaData.save();

    res.json({ message: "Like inserted succesfully" });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

app.get("/Like", async (req, res) => {

  try {
    let Likelist = await Like.find().populate('UserId');

    res.json({ Likelist });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

app.delete("/Like/:Id", async (req, res) => {

  try {
    const Id = req.params.Id;
    const deleteLike = await Like.findByIdAndDelete(Id)


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
    required: true
  },
  UserFeedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserFeedSchema",
    required: true
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
  const { CollegefeedId, UserFeedId, UserId, Content } = req.body;
  try {
    const CommentSchemaData = new Comment({
      CollegefeedId, UserFeedId, UserId, Content
    });
    await CommentSchemaData.save();

    res.json({ message: "Comment inserted succesfully" });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

app.get("/Comment", async (req, res) => {

  try {
    let Commentlist = await Comment.find().populate('UserId');

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
