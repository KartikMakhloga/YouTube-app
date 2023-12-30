import { createSlice } from "@reduxjs/toolkit"
import { OFFSET_LIVE_CHAT } from "./constants"
const liveChatSlice = createSlice({
    name: `liveChat`,
    initialState : {
        messages : []
    },
    reducers : {
        addMessages : (state,action)=>{
            state.messages.unshift(action.payload)
            state.messages.splice(OFFSET_LIVE_CHAT,1)
        }
    }
})

export default liveChatSlice.reducer

export const { addMessages } = liveChatSlice.actions