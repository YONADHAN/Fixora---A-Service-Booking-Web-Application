import type { IVendor } from '@/types/user.type'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface AdminState {
  vendor: IVendor | null
}

const initialState: AdminState = {
  vendor: null,
}

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    vendorLogin: (state, action: PayloadAction<IVendor>) => {
      state.vendor = action.payload
    },
    vendorLogout: (state) => {
      state.vendor = null
    },
  },
})

export const { vendorLogin, vendorLogout } = vendorSlice.actions
export default vendorSlice.reducer
