import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
const trackReducer = (state: any, action: any) => {
  switch (action.type) {
    case "fetch_tracks":
      return action.payload;
    default:
      return state;
  }
};

const fetchTracks = (dispatch: Function) => async () => {
  const response = await trackerApi.get("/tracks");
  dispatch({ type: "fetch_tracks", payload: response.data });
};

const createTrack =
  (dispatch: Function) => async (name: string, locations: any) => {
    await trackerApi.post("/tracks", { name, locations });
  };

export const { Context, Provider } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack },
  []
);
