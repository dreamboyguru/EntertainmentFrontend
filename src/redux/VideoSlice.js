import { createSlice } from "@reduxjs/toolkit"

const videoSlice = createSlice({
    name: "video",
    initialState: {
        video: []
    },
    reducers: {
        getVideo: (state, action) => {
            state.video = action.payload.map(video => {
                return {
                    id: video._id,
                    type: video.type, 
                    tittle: video.tittle, 
                    desc: video.desc,
                    year: video.year,
                    grade: video.grade,
                    actors: video.actors,
                    date: video.date,
                    image: video.image,
                    joinedData: video.joinedData
                }
            })
        }
    }
})

export const {getVideo} = videoSlice.actions;
export default videoSlice.reducer;
