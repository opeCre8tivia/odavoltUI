

export const rootapi = (function (){

if (process.env.NODE_ENV === "development"){
   // 
   return "http://localhost:5000"
   // "https://odavoltapi.herokuapp.com" 
}
else if(process.env.NODE_ENV === "production"){
  return "https://odavoltapi.herokuapp.com"
}
  
} ());
