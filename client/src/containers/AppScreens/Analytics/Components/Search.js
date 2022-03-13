import React from 'react'
import { FaSearch } from 'react-icons/fa'

function SearchBar(props) {
    return (
        <div className='flex-row' style={{ backgroundColor: 'black', borderRadius: 25, height: 45, overflow: 'hidden' }}>
            <FaSearch color='white' style={{ alignSelf: 'center', margin: 5 }} />
            <input placeholder="Type in to get info about your stock" value={props.searchText} onChange={(e) => props.stockSearchHandler(e.target.value)}  style={{ outline: 'none', border: 'transparent', flex: 1, color: "white", backgroundColor: 'transparent' }} />
        </div>
    )
}

export default SearchBar