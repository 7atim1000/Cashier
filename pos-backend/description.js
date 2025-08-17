/*
npm i razorpay crypto for payment
-----------------------------------
1- create project directory
2- create NPM project and install all dependencies

npm init -y
npm project and create package.json

3- dependencies :
   - express mongoose dotenv
Dev dependencies:
   - nodemon
npm install express dotenv mongoose 
to install dependencies and created folder node_mondules

cls or clear to clear the terminal screen 

npm install nodemon --save-dev

4- create express server = app.js
5 folder structure
6- database setup
7 error handling setup
8- API Creation

-----------------------------
require('dotenv').config()
const app = express();
const PORT = process.env.PORT;

const PORT = process.env.PORT;
app.get('/' ,(req, res) => {
    res.json({ message: 'Hellow from POS Server'})    
})
app.listen(PORT , ()=>{
    console.log(`server is listening on ${PORT}`)
})
run on terminal :-
npm run dev
on dotenv file PORT=80000
------------------------------
Error Handling flow :-
CLIENT send request throgh router->middleware->request handler->globalErrorHandling -> sen response to CLIENT


*/
/*


{
	"email": "admin@gmail.com",
	"password": "sec123"	
	
 "customerDetails": {
	"name": "Hatim taha",
	"phone": "0123456",
	"guests": 4
},

"orderStatus": "In Progress",

"bills": {
	"total": 100,
	"tax": 10,
	"totalWithTax": 110
},

"items": [
	{"name":"Pizza", "quantity": 2, "price": 25},
	{"name":"Pizza", "quantity": 2, "price": 25},
    {"name":"Pizza", "quantity": 2, "price": 25}
]

}


*/