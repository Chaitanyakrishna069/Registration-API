import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import axios from 'axios';
import S3FileUpload from "react-s3";


var AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-south-1"
});

const poolId = process.env.REACT_APP_UserPoolId
const ClientId = process.env.REACT_APP_ClientId


const poolData = {
    UserPoolId: poolId,
    ClientId: ClientId
};



const userPool = new CognitoUserPool(poolData);


let loggedInUser = ""

const getuser = (username) => {
    return new CognitoUser({ Username: username, Pool: userPool });
}


export const LoginCheck = async (val) => {


    return new Promise((resolve, reject) => {
        let { username, password } = val;
        // username = '8106483285'
        // password = 'LPcsn@069'
        const user = getuser(username);
        loggedInUser = user;
        console.log(user)
        const authDetails = new AuthenticationDetails({ Username: username, Password: password })
        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                var accessToken = data.getAccessToken().getJwtToken();
                const token = data.refreshToken.token;
                console.log(token);
                // AWS.config.region = 'ap-south-1';
                // const u = userPool.getCurrentUser();
                // u.getSession((err, session) => {
                //     console.log(session);
                //     if (session.isValid()) {
                //         console.log('Hi');
                //     }
                //     console.log(session);
                // });
                resolve(1);
                // return 1;
            },
            onFailure: (err) => {
                //     console.log(err);
                //     console.log("Invalid Username or Password")
                // return 2;
                resolve(2);
            },
            newPasswordRequired: (data) => {
                // console.log(data);
                // console.log("new Password Required");
                // return 3;
                resolve(3);
            },
        })

        // return finalRes;
    });
}

export const ResetPassword = async (newpassword) => {
    return new Promise((resolve, reject) => {
        console.log(newpassword, 'hai')
        const user = loggedInUser;

        console.log(user)
        user.completeNewPasswordChallenge(newpassword, {}, {
            onSuccess: result => {
                console.log(result);
                resolve(1);
            },
            onFailure: err => {
                console.log(err);
                resolve(2);
            }
        })
    });
}

export const Mailchecker = async (email) => {
    return new Promise((resolve, reject) => {
        // const email = 'balupremchand6@gmail.com';
        loggedInUser = getuser(email);
        axios.post("/fieldofficer_profile", { "admin": email }).then(data => {
            if (data.data.Status == "Success") {
                loggedInUser.forgotPassword({
                    onSuccess: data => {
                        console.log(data);
                    },
                    onFailure: err => {
                        console.log(err);
                    },
                    inputVerificationCode: data => {
                        console.log("code sent successfully");
                        resolve(1);
                    }
                });

            }
            if(data.data.Status == "Not Found") {
                resolve(2)
            }
        }).catch(err => { resolve(3) })
    })
}


export const ForgetPassword = async (val) => {
    return new Promise((resolve, reject) => {
        let {OTP,password} = val;
        const user = loggedInUser
        user.confirmPassword(OTP, password, {
            onSuccess: data => {
                console.log("Success Changed Successfully");
                resolve(1);
            },
            onFailure: err => {
                console.error("Something Went Wrong! Please try again");
                resolve(2)
            }
        });
    })
}

export const uploadFileToS3 = async (fileToUpload) => {
    const config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      region: "ap-south-1",
      accessKeyId: process.env.REACT_APP_S3_ACCESS_TOKEN,
      secretAccessKey: process.env.REACT_APP_S3_SECRET_KEY,
    };
  
    let loc = "";
  
    console.log(config,'in uplaodfunciton');
  
    try {
      const result = await S3FileUpload.uploadFile(fileToUpload, config);
      loc = result["location"];
      console.log(result);
      console.log("SUCCESS");
    } catch (error) {
      console.log(error);
    }
    console.log()
    return loc;
  };
  