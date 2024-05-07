import axios from "axios";
import { setFavoritesCount } from "../slices/favoritesSlice";

export const fetchFavoritesCount = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:1000/LoggedInUser');
    const loggedInUserId = response.data.loggedInUser.userId;
    const userResponse = await axios.get(`http://localhost:1000/users/${loggedInUserId}`);
    //console.log(userResponse.data.user.favorites);

    const favoritesCount = userResponse.data.user.favorites.length;
    dispatch(setFavoritesCount(favoritesCount));
  } catch (error) {
    console.error('Error fetching favorites count:', error);
  }
};
