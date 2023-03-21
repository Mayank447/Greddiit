import React from 'react'

const SavedPostContext = React.createContext({
    PostsSaved: {}, 
    updatePostsSaved: () => {}
});
export default SavedPostContext;