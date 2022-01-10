import React from "react";
import { connect } from 'react-redux';
import { createFish} from './store';




const AverageStars = (props) => {
    let sum = 0;
    console.log(typeof sum);
 props.fishes.forEach(element =>  sum += (element.stars));
 let average = (sum / props.fishes.length)
    if (props.fishes.length === 0) return(
        <h1> There are no movies!</h1>
    )
    else return (
        <>
        <h2> Average rating is {(average).toFixed(1)} </h2>
  <h1>Movies


({props.fishes.length})

    </h1>
    </>
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