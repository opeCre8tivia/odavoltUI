import React from 'react'

const SearchSuggestions =({suggestionArray,handleSearch})=> {
    
    return (
        <>
        {suggestionArray && suggestionArray.map(item=> <div key={item._id} className="suggestions" onClick={handleSearch} >  
                    <div className="suggestions-img-cont">
                        <img src={item.product.imageUrls[0]} alt="product"  />
                    </div> 
                    <div className="suggestions-name" > {item.product.name}</div>
                    <div className="suggestions-icon" > <i className="fa fa-search" ></i></div>
               </div>)}
        </>
    )
}

export default SearchSuggestions
