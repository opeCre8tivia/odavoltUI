import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchStores } from '../../redux/actions/index'

const Internet = (props) => {
  //local state
  const [__int,__setInt] = useState('')
  const { loading } = useSelector(state => state.LoadingReducer)
  const { networkOff } = useSelector(state => state.NetworkReducer)
  let [displayInternet, setdisplayInternet] = useState("none")
  const dispatch = useDispatch()

  useEffect(() => {
    if(loading === true){
      if(window.navigator.onLine === false || networkOff === true){
        setdisplayInternet("block")
        interNetChecker()
      }else{
        setdisplayInternet("none")
        clearInt()
      }
    }else{
      setdisplayInternet("none")
       clearInt()
    }
  },[networkOff])

  const interNetChecker = () => {
    let _int =   setInterval(() => {
          if(networkOff === true){
            console.log('checker...')
            dispatch(fetchStores())
            __setInt(_int)
          }

    }, 5000);
    
    }

      function clearInt(){
        clearInterval(__int)
      }

  return (
    <div className="container" style={{display: `${displayInternet}`}}>
      <div className="row">
        <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 internet-cont">
          <div className="internet-text">
            <p>You are Offline</p>
          </div>
          <div className="internet-icon">
            <i className="fa fa-times-circle"></i>
          </div>
        </div>
      </div>
    </div>

  ) 
}

export default Internet