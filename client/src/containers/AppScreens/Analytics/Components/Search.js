import React from 'react'
import { FaSearch } from 'react-icons/fa'

function SearchBar() {
    return (
        <div className='flex-row' style={{ backgroundColor: 'black', borderRadius: 25, height: 45, overflow: 'hidden' }}>
            <FaSearch color='white' style={{ alignSelf: 'center', margin: 5 }} />
            <input style={{ outline: 'none', border: 'transparent', flex: 1, color: "white", backgroundColor: 'transparent' }} />
        </div>
    )
}

export default SearchBar