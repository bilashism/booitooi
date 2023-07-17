/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { auth } from '../../../lib/firebase';

interface IUserState {
  user: {
    email: string;
    uid: string;
    id: string;
    role: string;
    accessToken: string;
  };
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}
interface ICredentials {
  email: string;
  password: string;
}
const initialState: IUserState = {
  user: {
    email: '',
    uid: '',
    id: '',
    role: '',
    accessToken: '',
  },
  isLoading: false,
  isError: false,
  error: null,
};
type IUserDB = {
  email: string;
  role?: string;
  uid: string;
  emailVerified: boolean;
  displayName: string;
};
export type IAuthenticatedUser = {
  uid: string;
  email: string;
  id: string;
  role: string;
  accessToken: string;
};
// Check if a user exists with the provided email
const checkUserExists = async (email: string): Promise<boolean> => {
  let isInFirebase: boolean;

  const methods = await fetchSignInMethodsForEmail(auth, email);
  if (methods.length > 0) {
    isInFirebase = true;
    return isInFirebase;
  }
  isInFirebase = false;
  return isInFirebase;
};
export const createUser = createAsyncThunk(
  'user/createUser',
  async ({ email, password }: ICredentials) => {
    const isInFirebase = await checkUserExists(email);

    const {
      data: { data: isInDb },
    } = await axios({
      method: 'get',
      url: `http://localhost:5000/api/v1/users/check/${email}`,
    });

    if (isInFirebase && isInDb) return;

    const newUser = await createUserWithEmailAndPassword(auth, email, password);

    const userDbData: IUserDB = {
      uid: newUser.user.uid,
      email: newUser.user.email as string,
      emailVerified: newUser.user.emailVerified,
      displayName: newUser.user.displayName || '',
    };

    const {
      data: { data: savedData },
    } = await axios({
      method: 'post',
      url: 'http://localhost:5000/api/v1/auth/signup',
      data: userDbData,
    });

    const loginData = await axios({
      method: 'post',
      url: 'http://localhost:5000/api/v1/auth/login',
      data: { email: userDbData.email, uid: userDbData.uid },
    });
    if (!loginData?.data?.data?.accessToken) return;

    const validUser: IAuthenticatedUser = {
      email: savedData.email,
      id: savedData.id,
      role: savedData.role,
      uid: savedData.uid,
      accessToken: loginData?.data?.data?.accessToken,
    };
    // eslint-disable-next-line consistent-return
    return validUser;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: ICredentials) => {
    const loggedInUser = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const loginData = await axios({
      method: 'post',
      url: 'http://localhost:5000/api/v1/auth/login',
      data: { email: loggedInUser.user.email, uid: loggedInUser.user.uid },
    });
    if (!loginData?.data?.data?.accessToken) return;
    const {
      data: { data: savedData },
    } = await axios({
      method: 'get',
      url: `http://localhost:5000/api/v1/users/email/${email}`,
    });

    const validUser: IAuthenticatedUser = {
      email: savedData.email,
      id: savedData.id,
      role: savedData.role,
      uid: savedData.uid,
      accessToken: loginData?.data?.data?.accessToken,
    };
    // eslint-disable-next-line consistent-return
    return validUser;
  }
);
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setUser: (state, action: PayloadAction<IAuthenticatedUser | null>) => {
      state.user = action.payload as IAuthenticatedUser;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.user = {
          email: '',
          uid: '',
          id: '',
          role: '',
          accessToken: '',
        };
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.user = action.payload as IAuthenticatedUser;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message as string;
        state.user = { email: '', uid: '', id: '', role: '', accessToken: '' };
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.user = {
          email: '',
          uid: '',
          id: '',
          role: '',
          accessToken: '',
        };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.user = action.payload as IAuthenticatedUser;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message as string;
        state.user = { email: '', uid: '', id: '', role: '', accessToken: '' };
      });
  },
});
export const { setUser, setLoading } = userSlice.actions;
export const userReducer = userSlice.reducer;
