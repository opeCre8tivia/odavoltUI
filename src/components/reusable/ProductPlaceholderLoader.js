import React from 'react' 
const ProductPlaceholderLoader = ()=>{
    let _dammyData = [
        {
            id:1,
            imgUrl:require('../../assets/img/ov-pix-placeholder.png')
        },
        {
            id:2,
            imgUrl:require('../../assets/img/ov-pix-placeholder.png')
        },
        {
            id:3,
            imgUrl:require('../../assets/img/ov-pix-placeholder.png')
        },
        {
            id:4,
            imgUrl:require('../../assets/img/ov-pix-placeholder.png')
        },
        {
            id:5,
            imgUrl:require('../../assets/img/ov-pix-placeholder.png')
        },
        {
            id:6,
            imgUrl:require('../../assets/img/ov-pix-placeholder.png')
        },
        {
            id:7,
            imgUrl:require('../../assets/img/ov-pix-placeholder.png')
        },
        {
            id:8,
            imgUrl:require('../../assets/img/ov-pix-placeholder.png')
        },
        // {
        //     id:9,
        //     imgUrl:require('../../assets/img/ov-pix-placeholder.png')
        // },
        // {
        //     id:10,
        //     imgUrl:require('../../assets/img/ov-pix-placeholder.png')
        // },
        // {
        //     id:11,
        //     imgUrl:require('../../assets/img/ov-pix-placeholder.png')
        // },
        // {
        //     id:12,
        //     imgUrl:require('../../assets/img/ov-pix-placeholder.png')
        // },
        // {
        //     id:13,
        //     imgUrl:require('../../assets/img/ov-pix-placeholder.png')
        // },
        // {
        //     id:14,
        //     imgUrl:require('../../assets/img/ov-pix-placeholder.png')
        // },
        // {
        //     id:15,
        //     imgUrl:require('../../assets/img/ov-pix-placeholder.png')
        // },
        // {
        //     id:16,
        //     imgUrl:require('../../assets/img/ov-pix-placeholder.png')
        // },
        // {
        //     id:17,
        //     imgUrl:require('../../assets/img/ov-pix-placeholder.png')
        // },
        // {
        //     id:18,
        //     imgUrl:require('../../assets/img/ov-pix-placeholder.png')
        // },
        // {
        //     id:19,
        //     imgUrl:require('../../assets/img/ov-pix-placeholder.png')
        // },
        // {
        //     id:20,
        //     imgUrl:require('../../assets/img/ov-pix-placeholder.png')
        // }
    ]
return (
            <div className="row product-placeolder-loader-cont" >
                {
                    _dammyData.map(placeholder =>(
                        <div className="product-placeholder" key={placeholder.id}>
                            <div className="placeholder-img-cont" > <img src={placeholder.imgUrl} width="50px" height="50px" alt="placeholders"/> </div>
                            <div className="placeholder-other-cont" > </div>
                            <div className="placeholder-other-cont" > </div>
                            <div className="placeholder-other-cont" > </div>
                            
                        </div>

                    ) )
                }
        
            </div>
 )
}
export default ProductPlaceholderLoader