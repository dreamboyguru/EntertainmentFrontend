import { createSlice } from "@reduxjs/toolkit"

const bookmarksSlice = createSlice({
    name: "bookmarks",
    initialState: {
        bookmarks: []
    },
    reducers: {
        getbookmarks: (state, action) => {
            state.bookmarks = action.payload.map(video => {
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

export const {getbookmarks} = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
