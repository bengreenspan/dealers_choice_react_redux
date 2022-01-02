import React from "react";
import { connect } from 'react-redux';
import faker from 'faker';
import {createFish} from './store';


const Nav = ({create}) => {
    return (
      <nav>
    <button onClick={()=> create(faker.random.words())}>Generate Random Movie!</button>
</nav>
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
)(Nav);

