
export const socketurls = (function (){

    if (process.env.NODE_ENV === "development"){
     return "http://localhost:5000"
      //return "https://odavoltadmin.herokuapp.com/" 
    
    }
    else if(process.env.NODE_ENV === "production"){

      return "https://odavoltadmin.herokuapp.com/"
    }
      
    } ());