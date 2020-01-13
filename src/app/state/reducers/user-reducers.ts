import { User } from "../../components/models/User";
import { DELETE_USER, ADD_USER, EDIT_UER } from "src/app/utils/Constants";
export function addUserReducer(state: User[] = [], action) {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.payload];
    case DELETE_USER:
      return [...state, action.payload];
    case EDIT_UER:
      return [...state, action.payload];
    default:
      return state;
  }
}
