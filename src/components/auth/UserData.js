import React, {useState} from 'react' 
import {useDispatch,useSelector} from 'react-redux'
import {RegisterUserAction} from '../../redux/actions'




const UserData = ()=>{

    //redux state
    const dispatch = useDispatch()
    const {registered,error,token,loading} = useSelector((state)=>state.AuthReducer)

    const [userData,setUSerData] = useState({
        firstName:'',
        lastName:'',
        mobile:''
    })

    function handleChange(e){
        setUSerData({
            ...userData,
            [e.target.name] :e.target.value
        })
    }

    function handleFinalSubmit(e){
        e.preventDefault()
        dispatch(RegisterUserAction(userData))
    }
    

return (
     
    <div>
        <div className="instruction-text-small">
            Tell us a little a bout you
        </div>
        <form className="ov-auth-form" onSubmit={handleFinalSubmit} >
                    

                    
                        <input type="text"  className=" data-input " placeholder="First Name" name="firstName" onChange={handleChange} autoComplete='off' />
                 

                        <input type="text"  className="data-input "   placeholder="Last Name" name="lastName" onChange={handleChange}  autoComplete='off' />

                        <input type="text"  className="data-input "  placeholder="Mobile Number" name="mobile" onChange={handleChange} autoComplete='off' />
                    


                        {loading === false ?<div className="form-group">
                                <input type="submit"
                                    value="submit"
                                    className= "btn btn-block ov-auth-btn"
                                    />
                            </div> :
                            <div className="form-group">
                                <button type="submit" className= "btn btn-block ov-auth-btn">
                                <div className="spinner-border"></div>
                                </button>
                            </div>
                            
                            }
        </form>

    </div>
            
 )
}
export default UserData