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
    email: string | null;
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
    email: null,
  },
  isLoading: false,
  isError: false,
  error: null,
};
type IUserDB = {
  email: string;
  password: string;
  role?: string;
  uid: string;
  emailVerified: boolean;
  displayName: string;
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
      password,
      uid: newUser.user.uid,
      email: newUser.user.email as string,
      emailVerified: newUser.user.emailVerified,
      displayName: newUser.user.displayName || '',
    };

    const {
      data: {
        data: { email: dbEmail },
      },
    } = await axios({
      method: 'post',
      url: 'http://localhost:5000/api/v1/auth/signup',
      data: userDbData,
    });
    // eslint-disable-next-line consistent-return
    return dbEmail;
  }
);
// export const createUser = createAsyncThunk(
//   'user/createUser',
//   async ({ email, password }: ICredentials) => {
//     let userEmail: string;
//     const isInFirebase = await checkUserExists(email);

//     const {
//       data: { data: isInDb },
//     } = await axios({
//       method: 'get',
//       url: `http://localhost:5000/api/v1/users/check/${email}`,
//     });

//     if (!isInFirebase && !isInDb) {
//       await createUserWithEmailAndPassword(auth, email, password).then(
//         async (newUser) => {
//           console.log(newUser.user);
//           if (!newUser?.user?.email) {
//             console.log('Something went wrong while creating new user');
//             return;
//           }

//           const userDbData: IUserDB = {
//             password,
//             uid: newUser.user.uid,
//             email: newUser.user.email,
//             emailVerified: newUser.user.emailVerified,
//             displayName: newUser.user.displayName || '',
//           };

//           const { data: dbData } = await axios<IUserDB>({
//             method: 'post',
//             url: 'http://localhost:5000/api/v1/auth/signup',
//             data: userDbData,
//           });

//           userEmail = dbData.email;
//         }
//       );
//     }

//     return userEmail;
//   }
// );
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: ICredentials) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user.email;
  }
);
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      state.user.email = action.payload;
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
        state.user.email = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.user.email = action.payload as string;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message as string;
        state.user.email = null;
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.user.email = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.user.email = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message as string;
        state.user.email = null;
      });
  },
});
export const { setUser, setLoading } = userSlice.actions;
export const userReducer = userSlice.reducer;
