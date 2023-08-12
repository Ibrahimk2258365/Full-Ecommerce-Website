import React, { useState } from 'react'

const CategoryForm = ({handleSubmit,value,setValue,buttonName}) => {
 
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    
                    <input type="text" className="form-control catInputAdd" placeholder='Add New Category' value={value} onChange={(e)=>{setValue(e.target.value)}} />
                   
                </div>
                
               
                <button type="submit" className="btn btn-primary addcatBtn">{buttonName}</button>
            </form>

        </>
    )
}

export default CategoryForm
