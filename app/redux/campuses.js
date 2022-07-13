import axios from 'axios';

const SET_CAMPUSES = 'SET_CAMPUSES';
const CREATE_CAMPUS = 'CREATE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';

export const setCampuses = (campuses) => ({
  type: SET_CAMPUSES,
  campuses,
});

const createCampus = (campus) => {
  return {
    type: CREATE_CAMPUS,
    campus,
  };
};

const updateCampus = (campus) => {
  return {
    type: UPDATE_CAMPUS,
    campus,
  };
};

const deleteCampus = (campus) => {
  return {
    type: DELETE_CAMPUS,
    campus,
  };
};

export const fetchCampuses = () => async (dispatch) => {
  const campusesResponse = await axios.get('/api/campuses');
  dispatch(setCampuses(campusesResponse.data));
};

export const createCampusThunk = (campus, history) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/campuses`, campus);
      dispatch(createCampus(response.data));
      history.push('/campuses');
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const updateCampusThunk = (campus, history) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(
        `/api/campuses/${campus.id}`,
        campus
      );
      dispatch(updateCampus(updated));
      console.log(`**********UPDATE-CAMPUS-THUNK**********`);
      history.push(`/campuses/${campus.id}`);
    } catch (err) {
      console.log(`**********UPDATE-CAMPUS-THUNK-ERROR**********`);
      console.log(err.response.data);
    }
  };
};

export const deleteCampusThunk = (id, history) => {
  return async (dispatch) => {
    try {
      const { data: campus } = await axios.delete(`/api/campuses/${id}`);
      dispatch(deleteCampus(campus));
      history.push('/campuses');
    } catch (err) {
      console.log(err.response);
    }
  };
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers

export default function campusesReducer(campuses = [], action) {
  switch (action.type) {
    case SET_CAMPUSES:
      return action.campuses;
    case CREATE_CAMPUS:
      return [...campuses, action.campus];
    case DELETE_CAMPUS:
      return campuses.filter((campus) => campus.id !== action.campus.id);
    case UPDATE_CAMPUS:
      return campuses.map((campus) => {
        return campus.id === action.campus.id ? action.campus : campus;
      });
    default:
      return campuses;
  }
}
