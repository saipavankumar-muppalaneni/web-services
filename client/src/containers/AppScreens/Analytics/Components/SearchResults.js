import React from 'react'
import { colors } from '../../../../constants'
import { Text } from '../../../../elements'
import classes from './Search.module.css'

function SearchResults() {
    return (
        <div className={classes.resultContainer}>

            <Text size={17} weight={500}>
                Stocks & ETFS
            </Text>

            {
                [1, 2, 3, 4, 5,].map(item => {

                    return <div className='flex-row align-center space5'>

                        <div className={'bg-grey ' + classes.searchedIcon} >


                        </div>
                        <div>
                            <Text size={14} weight={500}>
                                Bitcoin
                            </Text>
                            <Text style={{ color: colors.textGrey }}>
                                BNB
                            </Text>
                        </div>
                    </div>
                })
            }

        </div>
    )
}

export default SearchResults