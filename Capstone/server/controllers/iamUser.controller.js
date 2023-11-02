const AWS = require("aws-sdk");
const iamUserModel = require("../models/iamUser.model");
const iamRoleModel = require("../models/iamRole.model");

const iam = new AWS.IAM();

// Retrieve a list of IAM users in the AWS account.
const getAllIamUser = async (req, res) => {
  try {
    const users = await iam.listUsers().promise();

    const userData = await iamUserModel.find({});
    if(!userData){
      for (i = 0; i < users.Users.length - 1; i++) {
        const user = await iamUserModel.create({
          UserName: users.Users[i].UserName,
          UserId: users.Users[i].UserId,
          Arn: users.Users[i].Arn,
          CreatedDate: users.Users[i].CreateDate,
        });
  
        console.log( "User saved in DB");
      }
    }
    else{
      return res.send(userData)
    }

 
  } catch (error) {
    console.error("Error listing IAM users:", error);
    throw error;
  }
};

//Retrieve detailed information about a specific IAM user.
const getUserById = async (req, res) => {
  console.log(req.params);
  const { userid } = req.params;
  try {
    const user = await iamUserModel.findOne({ userid });

    if (user) {
      console.log(user);
      // res.json(user);
    } else {
      console.log("not found");
      // res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.log(`Something wrong ${error.message}`);
  }
};

//Retrieve detailed information about a specific IAM user.
const getAllRole = async (req, res) => {
  try {
    const data = await new Promise((resolve, reject) => {
      iam.listRoles({}, (err, data) => {
        if (err) {
          console.error("Error listing IAM roles:", err);
          reject(err);
        } else {
          resolve(data.Roles);
        }
      });
    });

    for (let i = 0; i < data.length; i++) {
      const roleData = data[i];
      const iamRoles = new iamRoleModel({
        RoleName: roleData.RoleName,
        RoleId: roleData.RoleId,
        Arn: roleData.Arn,
        CreateDate: roleData.CreateDate,
        AssumeRolePolicyDocument: roleData.AssumeRolePolicyDocument,
        Description: roleData.Description,
        MaxSessionDuration: roleData.MaxSessionDuration,
      });

      const roleDocument = await iamRoleModel.find({});
      if (!roleDocument) {
        const role = await iamRoles.save(); // Use 'await' to wait for the document to be saved
       return res.send(roleDocument);
        console.log("Role Saved");
      }
      else{
        return( res.send(roleDocument));
      }

      
    }

    //   res.json({ message: 'Roles Saved' });
  } catch (error) {
    console.log(`Something wrong ${error.message}`);
    res.send({ message: "Internal server error" });
  }
};

//Retrieve detailed information about a specific IAM user.
const getSpecificRole = async (req, res) => {
  console.log(req.params);
  const { roleid } = req.params;
  try {
    const role = await iamRoleModel.findOne({ roleid });

    if (role) {
      console.log(role);
      // res.json(user);
    } else {
      console.log("not found");
      // res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.log(`Something wrong ${error.message}`);
  }
};

module.exports = { getAllIamUser, getUserById, getAllRole, getSpecificRole };
