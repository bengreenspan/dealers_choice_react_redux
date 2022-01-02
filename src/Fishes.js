import React from "react";
import { connect } from 'react-redux';
import store, { deleteFish, toggle, createGrocery } from './store';

const fishes = ({fishes, decrementStar, incrementStar, deleteFish}) => {
return (
<ul>
{
        fishes.map(fish => {
        return(
            <li key={ fish.id}>
            <button onClick={()=> deleteFish(fish)}>x</button>
                {fish.name}(
                {fish.stars})
                <button onClick={()=> decrementStar(fish)}>-</button>
            <button onClick={()=> incrementStar(fish)}>+</button>
            </li>
          
        )
    })
}    
</ul>
)
}

const mapDispatchToProps = (dispatch) => {
    return {
      deleteFish: (fish) => {
        dispatch(deleteFish(fish));
      }
    };
};


export default connect(state => state, mapDispatchToProps)(fishes);