
import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const fishes = ({fishes}) => {
return (
<ul>
{
        fishes.map(fish => {
        return(
            <li key={ fish.id}>
                <Link to ={`/fishes/${ fish.id }`}>
                {fish.name}
                </Link>
            </li>
        )
    })
}    
</ul>


)
}


export default connect(
    state => state
)(fishes);