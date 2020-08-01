import { createSlice, configureStore } from "@reduxjs/toolkit";

import authService from "../Auth/authService";
import userData from "../data/users.json";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    authUser: null,
    data: null,
    gettingAccountInfo: false,
    error: false,
  },
  reducers: {
    startFetchingAccountData(state) {
      state.gettingAccountInfo = true;
    },
    updateUser(state, action) {
      const { authData, userData } = action.payload;
      state.authUser = authData;
      state.data = userData;
      state.gettingAccountInfo = false;
    },
    accountErr(state, action) {
      const msg =
        typeof action.payload === "string"
          ? action.payload
          : action.payload.message
          ? action.payload.message
          : action.payload.error
          ? action.payload.error
          : "Undefined error";
      console.warn("ACCOUNT ERROR: " + msg);
      state.error = msg;
      state.gettingAccountInfo = false;
    },
    logoutUser(state) {
      state.authUser = null;
      state.data = null;
      authService.logout({ returnTo: window.location.origin + "/login" });
    },
  },
});

export const {
  updateUser,
  accountErr,
  startFetchingAccountData,
  logoutUser,
} = accountSlice.actions;

export function attemptLogin(username, password) {
  return dispatch => {
    authService.login(
      {
        realm: "Username-Password-Authentication",
        responseType: "token",
        username,
        password,
      },
      err => dispatch(accountErr(err))
    );
  };
}

export function getUserAuthData(hash) {
  // TESTING
  // return dispatch => {
  //   dispatch(
  //     updateUser({
  //       authData: {
  //         sub: "auth0|5f2489f932cea30221142414",
  //         nickname: "clontz.chris",
  //         name: "clontz.chris@gmail.com",
  //         picture:
  //           "https://s.gravatar.com/avatar/639364c5cd704cb8fa7fd7897511b415?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fcl.png",
  //         updated_at: "2020-08-01T21:46:27.154Z",
  //         email: "clontz.chris@gmail.com",
  //         email_verified: true,
  //       },
  //       userData: userData.users["clontz.chris@gmail.com"],
  //     })
  //   );
  // };
  return dispatch => {
    authService.parseHash({ hash }, (err, authResult) => {
      if (err) {
        return dispatch(accountErr(err));
      }
      if (!authResult || !authResult.accessToken) {
        return dispatch(accountErr("Unable to parse hash."));
      }
      authService.client.userInfo(authResult.accessToken, (err, user) => {
        if (err) {
          return dispatch(accountErr(err));
        }
        if (!userData.users[user.name]) {
          dispatch(accountErr("User data not found."));
        }
        dispatch(
          updateUser({
            authData: user,
            userData: userData.users[user.name],
          })
        );
      });
    });
  };
}

const store = configureStore({
  reducer: accountSlice.reducer,
});

export default store;
