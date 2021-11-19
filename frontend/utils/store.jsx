import React from 'react'; 

export const StoreContext = React.createContext(null)

export default ({children}) => {
    const [listingId, setListingId] = React.useState([])

    const store = {
        listingIds: [listingId, setListingId]
    }

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}