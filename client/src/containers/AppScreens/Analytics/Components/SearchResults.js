import React from 'react'
import { colors } from '../../../../constants'
import { Text } from '../../../../elements'
import classes from './Search.module.css'

function SearchResults(props) {
    return (
        <div className={classes.resultContainer}>

            <Text size={17} weight={500}>
                Stocks & ETFS
            </Text>
			{props.tickersList && props.tickersList.map((ticker, index_no) => (
				
					<div key={index_no} className='flex-row align-center space5'>
						<div className={'bg-grey ' + classes.searchedIcon} > </div>
						<a onClick={() => {props.setSelectedStock(ticker.symbol); props.setSelectedStockName(ticker.name)}}>	
						<div>
							<Text size={14} weight={500}>
								{ticker.name}
							</Text>
							<Text style={{ color: colors.textGrey }}>
								{ticker.symbol}
							</Text>
						</div>
						</a>	
					</div>
				
				)	
			)}
		</div>
	)
}

export default SearchResults