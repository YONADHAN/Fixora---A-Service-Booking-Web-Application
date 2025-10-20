import type { ICustomer } from '@/types/user.type'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CustomerState {
  customer: ICustomer | null
}

const initialState: CustomerState = {
  customer: null,
}

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    customerLogin: (state, action: PayloadAction<ICustomer>) => {
      state.customer = action.payload
    },
    customerLogout: (state) => {
      state.customer = null
    },
  },
})

export const { customerLogin, customerLogout } = customerSlice.actions
export default customerSlice.reducer
