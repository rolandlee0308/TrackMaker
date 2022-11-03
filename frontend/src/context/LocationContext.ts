import createDataContext from "./createDataContext";

const locationReducer = (state: any, action: any) => {
  switch (action.type) {
    case "add_current_location":
      return { ...state, currentLocation: action.payload };
    case "start_recording":
      return { ...state, recording: true };
    case "stop_recording":
      return { ...state, recording: false };
    case "add_location":
      return { ...state, locations: [...state.locations, action.payload] };
    case "change_name":
      return { ...state, name: action.payload };
    case "reset":
      return { ...state, name: "", locations: [] };
    default:
      return state;
  }
};

const changeName = (dispatch: Function) => (name: string) => {
  dispatch({ type: "change_name", payload: name });
};

const startRecording = (dispatch: Function) => () => {
  dispatch({ type: "start_recording" });
};

const stopRecording = (dispatch: Function) => () => {
  dispatch({ type: "stop_recording" });
};

const addLocation =
  (dispatch: Function) => (location: any, recording: boolean) => {
    dispatch({ type: "add_current_location", payload: location });
    if (recording) {
      dispatch({ type: "add_location", payload: location });
    }
  };

const reset = (dispatch: Function) => () => {
  dispatch({ type: "reset" });
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation, changeName, reset },
  { recording: false, locations: [], currentLocation: null, name: "" }
);
