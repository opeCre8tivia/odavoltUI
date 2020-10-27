import React,{useState,useEffect} from 'react'
import{useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import Dropzone from 'react-dropzone'


const AddProduct =()=> {

    const maxSize = 1048576;

    //redux state
    const dispatch = useDispatch();
    

    //component state
        const [filePath, setFilePath] = useState("")
        const [allSupermarkets, setAllSupermarkets] = useState([])
        const [formState , setFormState] = useState({
            name:'',
            units:'',
            unitPrice:'',
            description:'',
            minPrice:'',
            category:'Select Item Category',
            supermarket:'Select Supermarket'
        
        })

        //diffrent state for file
        const [file,setFile] = useState('');
       
        const {name,units,unitPrice,description,minPrice,category,supermarket} = formState;

        useEffect(()=>{
            getSupermarkets()
        },[])

        async function getSupermarkets (){
           
             try {
                const res = await axios.get('http://localhost:5000/api/supermarkets-crud')
                if(res){
                    setAllSupermarkets(res.data.payload)
                    
                }
     
             } catch (error) {
                 console.log(error.message)
             }
         }
     

        const onChange =(event)=>{
            setFormState({
                ...formState,
               [event.target.name]:event.target.value
            })

       }

       const fileOnChange =(event)=>{
        setFile( event.target.files[0]);
   }



  const onSubmit = async (event) =>{
      event.preventDefault();
   
      const formData = new FormData();
     formData.append('file',file);
     formData.append('name',name);
     formData.append('units',units);
     formData.append('unitPrice',unitPrice);
     formData.append('minPrice',minPrice);
     formData.append('description',description);
     formData.append('category',category);
     
      

     try {
 
      const response= await axios.post(`/api/product`,formData) 
     
        if(response){
            console.log(response.data.msg);
         
            let msg = response.data.msg
            

            //reset form
            setFormState({
                ...formState,
                name:'',
                units:'',
                unitPrice:'',
                description:'',
                minPrice:'',
                category:''
            })
            setFile('')

        }
     } catch (err) {
         console.log(err.response);
         let msg = 'Something is  wrong'
        
     }//

  }


  async function uploadFiles(files){
        console.log(files[0])
        let pix = files[0]
        console.log(pix.path)
        try {

            const res = await axios.post("http://localhost:5000/api/upload", {files:files[0]} )
            
        } catch (error) {
            
        }
  }



    return (
        <>

        <form className="product-form">
                <div className="row" style={{justifyContent:"space-around"}}>
                <div className="col-lg-4 col-md-4" style={{position:"relative"}} >

                    <div className="form-group">
                    <input  type="text" placeholder="Product Name" className="form-control"
                     name="name" value={name}  autoComplete="off" onChange={onChange} />
                     </div>
                     <div className="form-group">
                     <input  type="text" placeholder="Units" className="form-control"
                     name="units" value={units}  autoComplete="off" onChange={onChange} />
                     </div>

                     <div className="form-group">
                     <input  type="number" placeholder="Unit Price" className="form-control"
                     name="unitPrice" value={unitPrice}  autoComplete="off" onChange={onChange} />
                     </div>

                     <div className="form-group">
                     <input  type="number" placeholder="min Price" className="form-control"
                     name="minPrice" value={minPrice}  autoComplete="off" onChange={onChange} />
                     </div>

                     

                     <div className="form-group">
                     <textarea  placeholder="description" className="form-control"
                     name="description" value={description}  autoComplete="off" onChange={onChange} />
                     </div>

                     <div className="form-group">
                     <select  className="form-control" name="category" value={category}   onChange={onChange} >
                     <option> Vegetables</option>
                         <option>Meat</option>
                         <option>Flour</option>
                         <option>Laundry</option>
                         <option>Cooking oil </option>
                         <option>Smearing Oil</option>
                         <option>Toiletries</option>
                         <option>Bread and Breakfast</option>
                         <option>Drinks</option>
                         <option>Households</option>
                     </select >
                         
                     
                     
                     </div>

                     <div className="form-group">
                     <label htmlFor="supermarket"> <span>*</span> Select supermarket</label>   
                     <select  className="form-control" name="supermarket" value={supermarket}   onChange={onChange}>
                         <option> Select Supermarket</option>
                     {allSupermarkets && allSupermarkets.map((sm)=><option key={sm._id}> {sm.name} </option>)}
                         
                     </select >
                       </div>

                </div>
               
                

               
                <div className="col-lg-4 col-md-4" style={{position:"relative"}} >
                    <div className="ov-dropzone">
                            <Dropzone
                            onDrop={acceptedFiles => uploadFiles(acceptedFiles)}
                            accept = "image/jpg, image/jpeg, image/png, image/webm"
                            minSize={0}
                            maxSize={maxSize}
                            
                            >
                                
                                {({getRootProps, getInputProps,isDragActive,isDragReject,rejectedFiles}) => {
                                
                                    return(
                                    
                                    <section style={{width:'100%',height:'100%'}}>
                                    <div {...getRootProps()} style={{width:'100%',height:'100%'}}>
                                        <input {...getInputProps()} />
                                        {isDragActive && !isDragReject ? "DROP HERE" :<p className="plus-sign"> + </p>}
                                        {isDragReject && "File type not accepted, sorry!"}
                                        {/* {isFileTooLarge && (
                                            <div className="text-danger mt-2">
                                            File is too large.
                                            </div>
                                        )} */}
                                    </div>
                                    </section>
                                )}
                                }
                            </Dropzone>

                     </div> 

                        <button type="submit" className="btn btn-info btn-block " style={{position:"absolute",bottom:"3px",left:0}} >SUBMIT</button>
                        {filePath && <div style={{width:'100px',height:'100px'}}>
                            <img src={require(filePath)} alt="preview"/>

                        </div>}
                    </div>
                </div>

              
            </form>
            
            
        </>
    )
}


export default AddProduct