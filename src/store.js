import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const LOAD = 'LOAD';
const CREATE = 'CREATE';
const DESTROY = 'DESTROY';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

const fishesReducer = (state = [], action)=> {
  if(action.type === LOAD){
    state = action.fishes; 
  }
  if(action.type === CREATE){
    state = [...state, action.fish]; 
  }
  if(action.type === DESTROY){
    state = state.filter(fish => fish.id !== action.fish.id)
  }
  if(action.type === INCREASE){
    state = [...state].map((fish) => {
      if (fish.id === action.fish.id) {
        fish.stars++;
        return fish;
      } else {
        return fish;
      }
    });
  }
  if(action.type === DECREASE){
    state = [...state].map((fish) => {
      if (fish.id === action.fish.id) {
        fish.stars--;
        return fish;
      } else {
        return fish;
      }
    });
  }

  return state;
};

const reducer = combineReducers({
  fishes : fishesReducer 
});


const _loadFishes = fishes=> ({ type: LOAD, fishes}); 

const loadFishes = ()=> {
  return async(dispatch)=> {
    const fishes = (await axios.get('/api/fishes')).data;
    dispatch(_loadFishes(fishes));
  };
};

const _createFish = fish=> ({ type: CREATE, fish}); 

const createFish = (name)=> {
  return async(dispatch)=> {
    const fish = (await axios.post('/api/fishes', { name})).data;
    dispatch(_createFish(fish));
  };
};

const _destroyFish = fish=> ({ type: DESTROY, fish}); 

const destroyFish = (fish, history)=> {
  return async(dispatch)=> {
    await axios.delete(`/api/fishes/${fish.id}`);
    dispatch(_destroyFish(fish));
    history.push('/fishes');
  };
};

const _increaseStars= fish=> ({ type: INCREASE, fish}); 


const increaseStars = (fish)=> {
  return async(dispatch)=> {
    await axios.put(`/api/fishes/${fish.id}`);
    dispatch(_increaseStars(fish));
  };
};

const _decreaseStars = fish=> ({ type: DECREASE , fish}); 

const decreaseStars = (fish)=> {
  return async(dispatch)=> {
    await axios.put(`/api/fishes/${fish.id}`);
    dispatch(_decreaseStars(fish));
  };
};



const store = createStore(reducer, applyMiddleware(thunk));


export default store;
export { loadFishes, createFish, destroyFish, increaseStars, decreaseStars };