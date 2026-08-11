import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ActiveOrganization {
  id: string;
  name: string;
  slug: string;
  role: "OWNER" | "ADMIN" | "MANAGER" | "AGENT";
}

interface AuthState {
  activeOrganization: ActiveOrganization | null;
}

const initialState: AuthState = {
  activeOrganization: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setActiveOrganization: (state, action: PayloadAction<ActiveOrganization>) => {
      state.activeOrganization = action.payload;
    },
    clearActiveOrganization: (state) => {
      state.activeOrganization = null;
    },
  },
});

export const { setActiveOrganization, clearActiveOrganization } = authSlice.actions;
export default authSlice.reducer;