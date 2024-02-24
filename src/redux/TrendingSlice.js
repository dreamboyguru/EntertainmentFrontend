import { createSlice } from "@reduxjs/toolkit"

const TrendingSlice = createSlice({
    name: "trending",
    initialState: {
        trending: []
    },
    reducers: {
        getTrending: (state, action) => {
            state.trending = action.payload.map(video => {
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

export const {getTrending} = TrendingSlice.actions;
export default TrendingSlice.reducer;
