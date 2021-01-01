import React, {Component} from 'react'
import {connect} from 'react-redux'
import { fetchStores,addList } from '../../redux/actions'

class Test extends Component{
    constructor(props){
        super(props)

        this.state = {
            list:[]
        }
    }



    render(){
        const {list} = this.state
        console.log(list)
        console.log(this.state.testList)
        return(
            <>
            <div>TEST</div>
            {list && list.map((i)=> <div key={i.id}> {i.name}  </div> )}
            </>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        storeList:state.StoreReducer.storeList,
        testList:state.StoreReducer.testList
    }
}

const mapDispatchToProps = (dispatch) =>{
        return{
            fetchStores:()=>dispatch(fetchStores()),
            addList:()=>dispatch(addList())
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(Test)