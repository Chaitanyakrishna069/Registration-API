import { useState } from 'react';
import { CognitoUserPool, AuthenticationDetails, CognitoUser, CognitoRefreshToken } from 'amazon-cognito-identity-js';

var AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-south-1"
});

const poolData = {
    UserPoolId: 'ap-south-1_U6rIzz3EG',
    ClientId: '3f06tbiui1ngvkes5roo6cpovl'
};

export const ResetPassword = async ({ newpassword }) => {
    const [userda, setuser] = useState('')
    return new Promise((resolve, reject) => {
        userda.completeNewPasswordChallenge(newpassword, {}, {
            onSuccess: (result) => {
                resolve(1);
            },
            onFailure: (res) => {
                resolve(2);
            }
        })
    });
}