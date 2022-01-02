import React from "react";
import { connect } from 'react-redux';
import store, { increaseStars, decreaseStars, destroyFish } from './store';

const fishes = ({fishes, increaseStars,decreaseStars, destroy}) => {
    
return (
    <ul>
{
        fishes.map(fish => {
        return(
            <li key={ fish.id}>
            <button onClick={()=> destroy(fish)}>x</button>
                {fish.name}(
                {fish.stars})
                <button onClick={()=> decreaseStars(fish)}>-</button>
            <button disables={fish.stars}  onClick={()=> increaseStars(fish)}>+</button>
            </li>
          
        )
    })
}    
</ul>
)
}

const mapDispatchToProps = (dispatch, {history}) => {
    return { 
     destroy: (fish) => dispatch(destroyFish(fish, history)),
     decreaseStars: (fish) => 
        dispatch(decreaseStars(fish)),
        increaseStars: (fish) => 
            dispatch(increaseStars(fish)),
        }
}


export default connect(state => state, mapDispatchToProps)(fishes);