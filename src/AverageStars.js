import React from "react";
import { connect } from 'react-redux';


const AverageStars = ({fishes}) => {
  
   
    if (fishes.length === 0) return(
        <h1> There are no movies!</h1>
    )
    else return (
  <h1>Movies

<div>{fishes.length}</div>
<div>{fishes[0]}</div>
    </h1>
    );
  
}

export default connect(
    state => state,
    (dispatch)=> {
        return{
            create: (name) => {
                dispatch(createFish(name));
            }
        }
    }
)(AverageStars);