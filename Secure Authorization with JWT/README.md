# Secure Authorization with JWT

<img src='./images/hero.jpg' width='100%'/>

## What is in store?

Who does not like a story while learning a technical concept? Let us try to get a grasp of what we would learn via a story. Imagine going to a bank to open an account. You submit all documents, get all verification done and then once the account is ready, you get a passbook. The next time you go to the bank for any purpose like cash-withdrawal or cheque deposition, you do not need to do a full document verification again. As long as you have the passbook to identify yourself, you are good to go. Now you might be wondering, how is this related to security? Ever thought how you sign-in to an app and you stay signed and you do not have to enter the password for every page you navigate to? One of the secure ways to do this is using JWT. Are you excited to learn? Follow along! 

## Prerequisite

JWTs are used primarily for authorization. Having prior knowledge of one or many of the following topics will give you a clearer context.
- Any kind of authentication on a backend server
- Use of protected APIs
- Node.js(only for Challenge Activities)

## Introduction: What, Where and Why?

JWT is a way for securely transmitting information across the network as a JSON object. This information can be verified and trusted because it is digitally signed.

> Well, what does JWT stand for? 

JWT is the abbreviation for JSON Web Token. 

> Now what is JSON? 

That is secret. Actually no. In the spirit of 'Learn by Doing', it will be awesome if you do a bit of research on it if you are hearing it for the first time.

> What does it look like?

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJDcmlvLmRvIGhlbHBzIHlvdSBsZWFybiBieSBkb2luZyEifQ.QKVJvVR80IMeoRzcLPWh6AIceQs-HkNlMey4swkHOX0`

Intimidating? Let us try to break it down. If you look closely, it contains three parts separated by two `.`.

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiJDcmlvLmRvIGhlbHBzIHlvdSBsZWFybiBieSBkb2luZyEifQ.
QKVJvVR80IMeoRzcLPWh6AIceQs-HkNlMey4swkHOX0
```

> But where is the JSON? This looks like random characters and not JSON.

Yes, you are right; this is not a standard JSON at first sight. This is base64url encoded JSON. base64url is a way to convert a human-readable string into URL friendly string. So, what you saw above is a JSON itself, just a different representation.

The three parts of JWT are
- Header
- Payload 
- Signature 

Having understood what JWT, can you do a bit of digging and fill the next section on Where and Why is JWT used. Once you find it, do send a pull request.

> Where is JWT used?

> Why is JWT used?

**OAuth 2.0 is the industry-standard protocol for authorization. It uses JWT under the hood for its implementation. Hence, JWT plays an important role in authorization systems.**


## Activity: Decode JWT

Enough theory, isn't it? Let us do some activity. We will try to decode a JWT we saw above using an online decoder. You can use any decoder of your choice, or even better if you make your program. If you do make your program, do send a pull request. <br>

Head over to [www.base64url.com](http://www.base64url.com/) <br> 

Paste the base64url encoded string to form to get its plain text representation. Let us try to decode the Header first. 
<details>
<summary>What did you get? (click to expand)</summary>

`{"alg":"HS256","typ":"JWT"}`

</details>

<br>Next, let us do the Payload. There is a message there for you. 

<details>
<summary>What did you get? (click to expand)</summary>

`{"sub":"Crio.do helps you learn by doing!"}`

Incredible, isn't it?

</details>

Similarly, try doing the signature part. You would see random characters. That is the Signature of the message. 
As you would have guessed by now, signed JWT is tamper-proof, but the information in it is still readable. 

Let us check the validity of the Signature. You can use any verifier of your choice, or even better if you make your program. If you do make your program, do send a pull request. <br>

Head over to [jwt.io](https://jwt.io/) and scroll to the debugger section<br> 
Paste the JWT into the encoded area. You will get the decoded JWT on the right. 

Do you see a prompt at the bottom that said invalid Signature, even when the information is visible?

![](./images/jwt-1.png)

To verify the Signature, you need a secret key that is securely stored on the server that signed the JWT. Signed JWT is like an identity card for you that is sealed in a shatter-proof glass. Anyone can see and access the information, but only the server has the key to open the seal.

The secret key used to sign above JWT is
<details>
<summary>Secret (click to expand)</summary>

`this is super secret info but you know it`

Paste into verify sign at right in place of your-256-bit-secret

</details>

Once you paste the secret and then verify, you can see that JWT is verified. Hence, JWT can be used to securely communicate with a server without worrying about tampering.

## Understand how Signature works

Signed JWTs are signed by cryptographic hash functions. Unline encryption that can be decrypted, a crypographic hash cannot be reversed(without sufficiently high time and compute resources beyond present day availability). JWTs can be signed using any of the crypographic functions available. The one we used here is HS256 that stands for HMAC using SHA-256. 
Read more about them to get in-depth knowledge.

![](./images/jwt-2.png)<br>
Credits: JWT Handbook by Sebastián Peyrott

## Activity: Encode JWT

To make your own JWT, the process is the reverse of decoding. Take the JSON representation, convert to base64url form and then concatenate the Header, Payload and Signature with a `.`. You can do the same using your own program or an online tool like [jwt.io](https://jwt.io/)

Let us make a JWT that uses the same secret and type as above, but with a different message.

Can you make a signed JWT that has the Payload as
```
{
    "sub":"You are awesome. Happy Hacktoberfest"
}
```
Once done, this is how the JWT would look like

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJZb3UgYXJlIGF3ZXNvbWUuIEhhcHB5IEhhY2t0b2JlcmZlc3QifQ.ijnFajeCsPnvuyJ5iC63nGYrUVxchuvuCFmcrpedjeo`

<details>
<summary>Does your JWT match above one? (click to expand)</summary>
We sneakily changed the secret to test if you are actually following along. We added an exclamation at end to the secret. Use the following as the secret to get the same JWT as above

`this is super secret info but you know it!`

Paste into verify sign at right, and verify.

</details>

## Activity: Try Tampering JWT

You are wondering that JWT by design is secure and cannot be tampered, isn't it? As with all tools, unless implemented properly, even JWT can have an insecure implementation.

<img src='./images/hacker-stealing-representation.jpg' width='100%'/>

<details>
<summary>Can you think of a way to tamper? (click to expand)</summary>
JWT by design does not require it to be signed. What if you take a JWT, strip off the signature part and modify the Header to say unsigned JWT. Once you do this, you can modify the JWT to your liking and the JWT in principle is valid. 

</details>

<details>
<summary>How do I prevent this? (click to expand)</summary>
The server-side code should not check the Header to decide the signing algorithm of the JWT. Since it was the server that signed the JWT while creation, it should use the same algorithm while checking as the signing algorithm would always be the same. So, even if an unsigned valid JWT comes to the server, it throws an error as the server expects the JWT to have the same signing algorithm as the one it used to create.

</details>

Unsigned JWT will have the Header with
`"alg": "none"`

Can you take the first JWT shown above from the Introduction section and create an unsigned JWT of the same with a modified message? 

## Challenge Activity: Create JWT on server

Process
1. Authenticate to see if request parameters matches the username and password on server
2. Create a signed JWT and pass to response
3. On subsequent requests, verify the JWT to provide access

Go to `src` folder and open `server-js`. Install packages, create `.env` from `.env.example` and run the server.

This example uses username and password stored directly as variable in file. Actual server would have it on a database. 

To create the JWT, let us check code at `/getjwt`. <br>
**Mini-Activity**
- Presently, the API gives the signed JWT with username without checking if API request contains the right password. Can you modify the code to check password and then only give JWT?
- Once done, verify that the user gets JWT only with right password, else error message.

To verify the JWT, let us check code at `/verifyjwt`. <br>
**Mini-Activity**
- Can you extarct token from the Authorization header? Once done, pass it to `jwt.verify(token, process.env.TOKEN_SECRET)` to verify. 
- If JWT is not valid, the `jwt.verify()` throws an error. Can you handle this exception to prevent server crashing?

**Additional Activity**
- `jwt.verify()` by default uses HS256. Modify the code try different signing method
- The example token is not a secure one. Use a package like `crypto` to generate a secure and random key

## Challenge Activity: Get and use JWT

Process
1. Authenticate yourself with username password or equivalent depending on the service
2. Get JWT as response. Store this for subsequent requests
3. Pass the JWT in Authorization header

Go to `src` folder and open `server-js`. Install packages and run the server

Use an API client like [Postman](https://www.postman.com/) to make API calls

To get the JWT, authenticate yourself with username and password at `/getjwt`. <br>
**Mini-Activity**
- API should give error if username password is invalid
- Check if jwt is signed and contains correct information at [jwt.io](https://jwt.io/)

To verify the JWT, pass the JWT as authorization header to `/verifyjwt`. <br>
**Mini-Activity**
- API should give unauthorized error if jwt is invalid or tampered 
- Are you able to get success response when passing the signed JWT?
<details>
<summary>Sample Request (click to expand)</summary>
<img src ='./images/jwt-3.png'/>

</details>

## Quiz: Recap of Learning

This is a self-assessment quiz to summarize the learning.

> JWT by design is secure irrespective if its implementation

- True
- False

<details>
<summary>Answer (click to expand)</summary>
False <br>
Refer Activity: Try Tampering JWT for details
</details>

> JWT is so secure that I can use a signed JWT to even store passwords 

- True
- False

<details>
<summary>Answer (click to expand)</summary>
False <br>
Signed JWT are tampered-proof but the information in it is still readable
</details>

> What is the widely used pronunciation of JWT? 

- Jay - Double U - Tee
- jot

<details>
<summary>Answer (click to expand)</summary>
jot 
</details>

## What next?
We believe that there can be no one-stop solution to learn it all. And, JWT is no exception. For more insight and further learning, few keywords are mentioned below so that you can learn. We do not want to provide a link to a specific article or video for a topic because everyone has a different taste on the type of content that suits them and additionally, we want you to refer to the latest article on the topic whenever you are reading this.

- Encrypted JWT
- Cryptographic Hash
- HMAC
- Claims in JWT
- Base64 Encoding
- Access Token and Refresh Token
- Session Token

## References and Credits
1. https://jwt.io/
2. http://www.base64url.com/
3. https://unsplash.com/