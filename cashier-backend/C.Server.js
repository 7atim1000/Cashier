/*
const app = express()
require(dotenv).config()

const PORT = process.env.PORT ;
app.get('/' ,(req, res) => {
    res.json({ message: 'Hellow from POS Server'})
})
app.listent(PORT ,()=>{
    console.log(`POS server listening on port ${PORT}`, bg.Cyan)
})
const connectDB = async() => {
   try{
        const conn = await mongoose.connect(process.env.MONGODB) 

   } catch (error){
        console.log(`Error: ${error.message}`, bgRed)
   }    
}
*/