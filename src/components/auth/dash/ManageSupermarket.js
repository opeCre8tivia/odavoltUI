import React, {useState,useEffect} from 'react'
import axios from 'axios'

const ManageSupermarket =()=> {
    let token = "0098feuruur0098frfudsksf"
    //component state

    const [allSupermarkets,setAllSupermarkets] = useState([])
    const [_supermarket, set_supermarket] = useState({})
    const [reloadFactor,setReloadFactor] = useState(0)
    
    const [formState , setFormState] = useState({
        name:"",
        district:'',
        streetLocation:'',
        tel:'',
        email:'',
        description:'',
        logoUrl:'',
       
    
    })

    const { name,district,streetLocation,tel,email,description} = formState

    const [showEditForm , setShowEditForm] = useState({
        _edit:false,
        _id:0,
        _name:'',
        _district:'',
        _streetLocation:'',
        _tel:'',
        _email:'',
        _description:'',
        _logoUrl:'',
    })
    const {_id, _edit,_name,_district,_streetLocation,_tel,_email,_description} = showEditForm
   


    const onChange =(event)=>{
        setFormState({
            ...formState,
           [event.target.name]:event.target.value
        })

   }

   const _onChange =(event)=>{
    setShowEditForm({
        ...showEditForm,
       [event.target.name]:event.target.value
    })

}


//     const fileOnChange =(event)=>{
//         setFile( event.target.files[0]);
//    }

   useEffect(() => {
       getSupermarkets()
      
   }, [reloadFactor])

   useEffect(()=>{
        if(_edit=== true){
            editSupermarket(_supermarket)
        }
   },[_edit])


    async function getSupermarkets (){
       axios.defaults.headers.common['x-aut-token'] = token
        try {
           const res = await axios.get('http://localhost:5000/api/supermarkets-crud')
           if(res){
               setAllSupermarkets(res.data.payload)
               console.log("fetched.....")
           }

        } catch (error) {
            console.log(error.message)
        }
    } 

    async function addSupermarket(e){
        e.preventDefault()
        try {
            const headers = {
                "Content-Type":"application/json"
            }

            const res = await axios.post("http://localhost:5000/api/supermarkets-crud",
            {
                name: name,
                district:district,
                tel:tel,
                email:email,
                description:description,
                streetLocation:streetLocation
             },
             headers 
            
            )

            //reset form
            setFormState({
                ...formState,
                name: "",
                district:"",
                tel:"",
                email:"",
                description:"",
                streetLocation:""
            })

            //update page
            setReloadFactor(Math.random())

        } catch (error) {
           console.log(error.message) 
        }
    }

   function editSupermarket(supermarket){
       let {_id, name,district,streetLocation,tel,email,description} = supermarket
              //populate value of showEditForm with supermarket values
       setShowEditForm({
           ...showEditForm,
           _id:_id,
           _name:name,
           _district:district,
           _streetLocation:streetLocation,
           _tel:tel,
           _email:email,
           _description:description
       })
   }

    async function updateSupermarket(e){
            e.preventDefault()
            
        try {
            const headers = {
                "Content-Type":"application/json"
            }
            const res = await axios.put(`http://localhost:5000/api/supermarkets-crud/${_id}`,
                     {
                        name: _name,
                        district: _district,
                        tel: _tel,
                        email: _email,
                        description: _description,
                        streetLocation: _streetLocation
                     },
                     headers )
              if(res){
                  alert(res.data.msg)
              }
        //refresh  form 
        
        //update page
        setReloadFactor(Math.random())
            
        } catch (error) {
            console.log(error.message)
        }
   }


   async function deleteSupermarket(id){
        try {
            const res =await axios.delete(`http://localhost:5000/api/supermarkets-crud/${id}`)
            if(res){
                alert(res.data.msg)
            }

            //update page
            setReloadFactor(Math.random())

        } catch (error) {
            console.log(error.message)
        }
   }

    return (
        <div className="ov-dash-component-wrapper">
            <div className="row row-reset">
                <div className="col-lg-6 col-md-6 col-sm-11 m-2 cont-theme" style={{minHeight:"90vh"}}>

                    {_edit === false ?
                      
                      <form style={{marginTop:"20px"}} onSubmit={addSupermarket}>
                                <div className="form-group">
                                    <input  type="text" placeholder="Supermarket Name" className="form-control"
                                    name="name" value={name}  autoComplete="off" onChange={onChange} />
                                </div>

                                <div className="form-group">
                                    <input  type="text" placeholder="District" className="form-control"
                                    name="district" value={district}  autoComplete="off" onChange={onChange} />
                                </div>

                                <div className="form-group">
                                    <input  type="text" placeholder="Street Location" className="form-control"
                                    name="streetLocation" value={streetLocation}  autoComplete="off" onChange={onChange} />
                                </div>

                                <div className="form-group">
                                    <input  type="text" placeholder="Tel number" className="form-control"
                                    name="tel" value={tel}  autoComplete="off" onChange={onChange} />
                                </div>

                                <div className="form-group">
                                    <input  type="text" placeholder="Description" className="form-control"
                                    name="description" value={description}  autoComplete="off" onChange={onChange} />
                                </div>

                                {/* TODO: add image upload for image url */}

                                <button className="btn btn-sm btn-info">ADD</button>

                    </form> :
                    <form style={{marginTop:"20px"}} onSubmit={updateSupermarket}>
                            <div className="form-group">
                                <input  type="text" placeholder="Supermarket Name" className="form-control"
                                name="_name" value={_name}  autoComplete="off" onChange={_onChange} style={{color:"tomato"}} />
                            </div>

                            <div className="form-group">
                                <input  type="text" placeholder="District" className="form-control"
                                name="_district" value={_district}  autoComplete="off" onChange={_onChange} style={{color:"tomato"}}  />
                            </div>

                            <div className="form-group">
                                <input  type="text" placeholder="Street Location" className="form-control"
                                name="_streetLocation" value={_streetLocation}  autoComplete="off" onChange={_onChange} style={{color:"tomato"}}  />
                            </div>

                            <div className="form-group">
                                <input  type="text" placeholder="Tel number" className="form-control"
                                name="_tel" value={_tel}  autoComplete="off" onChange={_onChange} style={{color:"tomato"}}  />
                            </div>

                            <div className="form-group">
                                <input  type="text" placeholder="Description" className="form-control"
                                name="_description" value={_description}  autoComplete="off" onChange={_onChange} style={{color:"tomato"}}  />
                            </div>

                            {/* TODO: add image upload for image url */}

                            <button className="btn btn-sm btn-info">UPDATE</button>

                    </form>         
                
                    }
                    
                </div>
                <div className="col-lg-4 col-md-4 col-sm-11 m-2 cont-theme" style={{minHeight:"90vh"}}>

                    {allSupermarkets.map((supermarket)=> <div className="edit-item-main-cont" key={supermarket._id}>

                    <div > {supermarket.name} <span>Supermarket</span> </div>
                    <div style={{display:"flex",minWidth:"50px",justifyContent:"space-between"}}>
                        <div style={{width:"10px"}} >
                             <span>
                                  <i className="fa fa-pen" onClick={()=>{
                                      setShowEditForm({
                                          ...showEditForm,
                                          _edit:true
                                         
                                      })
                                      set_supermarket(supermarket)

                                    //   
                                    //  console.log(supermarket)
                                    //  console.log(_edit)
                                  }} >
                                 </i>
                            </span> 
                        </div>
                        <div style={{width:"10px"}} onClick={()=>{
                                deleteSupermarket(supermarket._id)
                        }}> 
                         <span>
                              <i className="fa fa-trash" ></i>
                         </span>
                        </div>
                    </div>
                    </div>
                    
                    )}


               
                </div>
            </div>
            
        </div>
    )
}

export default ManageSupermarket