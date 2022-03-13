import React, { PureComponent, useEffect, useState } from "react";
import styles from "./Analytics.module.css";
import green from '../../../assets/artboard/green.png'
import blue from '../../../assets/artboard/blue.png'
import orange from '../../../assets/artboard/orange.png'
import { Text } from '../../../elements'


import { doc, setDoc, collection, onSnapshot, query, where } from "firebase/firestore";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Image } from "@react-pdf/renderer";
import { colors } from "../../../constants";
import { useAuth } from "../../../hooks/UserContext";
import { db } from "../../../fbconfig";
import moment from "moment";
import { convertHMS } from "../../../helpers";
import SearchBar from "./Components/Search";
import SearchResults from "./Components/SearchResults";
import { FaBitcoin } from "react-icons/fa";
import Button from "../../../elements/Button";


let days = Array.from({ length: moment('2020-02').daysInMonth() }, (x, i) => { return { date: moment().startOf('month').add(i, 'days').format('DD/MM'), totalClients: 0, newClients: 7 } })
const data1 = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Analytics() {
const API_KEY_MARKET_STACK = '5c9444b94cf01ee44697c38c8d49edb5';
const MAP_API_KEY = '90423E19D4EE45D2B00A1001D2D5125D';
  const { isLoggedIn, additionalUserInfo, updateUser } = useAuth()
  const [data, setdata] = useState(days)
  const [record, setrecord] = useState([])


  const [tickersList, setTickers] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
   const [selectedStock, setSelectedStock] = useState('');
   const [selectedStockName, setSelectedStockName] = useState('');
   
   const [selectedStockDetails, setSelectedStockDetails] = useState('{ name: "", code: "" , price: "", volume: "" }');
   
   
	const stockSearchHandler = (value) => {
		setSearchText(value);
	}

const IframeChart = ({selectedStock}) => {
	if(!selectedStock) {return null;}
	let frmaeurl = `https://api.stockdio.com/visualization/financial/charts/v1/HistoricalPrices?app-key=${MAP_API_KEY}&symbol=${selectedStock}&days=1&displayPrices=Candlestick&dividends=true&splits=true&showUserMenu=false&palette=Financial-Light`;          
	return (  
			<iframe width="100%" height="400px;" frameBorder="0" scrolling="no" src={frmaeurl} />
	)
}


	//stock List API 
		useEffect(() => {
			if(searchText && searchText.length > 2){
				fetch(`http://api.marketstack.com/v1/tickers?access_key=${API_KEY_MARKET_STACK}&search=${searchText}`)
				.then(response => response.json())
				// 4. Setting *tickersList* to the data that we received from the response above
				.then((tickers_data) => { 
										setIsLoaded(true);
										setTickers(tickers_data.data)
									},
									// Note: it's important to handle errors here
									// instead of a catch() block so that we don't swallow
									// exceptions from actual bugs in components.
									(error) => {
									  setIsLoaded(true);
									  //setError(error);
									}						
									
				)
			}
		},[searchText]) // Note: the empty deps array [] means this useEffect will run once similar to componentDidMount() i.e //Runs only on the first render // useEffect runs after the component is rendered.
	
	//stock Detail API 
		useEffect(() => {
			if(selectedStock && searchText && searchText.length > 2){
				//console.log(selectedStock);
				fetch(`http://api.marketstack.com/v1/eod/latest?access_key=${API_KEY_MARKET_STACK}&symbols=${selectedStock}`)
				.then(response => response.json())
				// 4. Setting *tickersList* to the data that we received from the response above
				.then((ticker_data) => { 
				//console.log(ticker_data);
										//setIsLoaded(true);
										        setSelectedStockDetails(prevState => ({
													...prevState,
													name: ticker_data.data[0].symbol,
													code: ticker_data.data[0].symbol,
													price: ticker_data.data[0].close,
													volume: ticker_data.data[0].volume
												 }));
									},
									// Note: it's important to handle errors here
									// instead of a catch() block so that we don't swallow
									// exceptions from actual bugs in components.
									(error) => {
									  setIsLoaded(true);
									  //setError(error);
									}						
									
				)
			}
		},[selectedStock]) // Note: the empty deps array [] means this useEffect will run once similar to componentDidMount() i.e //Runs only on the first render // useEffect runs after the component is rendered.



  return (
    <div className="flex1">
      <div className={"flex-row flex1 justify-between space5"}>
        {
          [1, 2, 3, 4].map(item => {
            return <div className={"flex1 flex-col " + styles.cards}>
              <div style={{ margin: 10 }} className='flex-row align-center'>

                <FaBitcoin size={20} />
                <Text weight={600} size={16} style={{ color: colors.textGrey, }}>
                  Bitcoin
                </Text>
              </div>
              <div className="flex-row " >
                <div style={{ margin: 5, alignSelf: 'center' }}>



                  <Text weight={600} size={16} style={{ color: colors.textGrey, }}>
                    $33.568,60
                  </Text>

                </div>

                <div className="flex1">



                  <ResponsiveContainer>
                    <AreaChart
                      width={200}
                      height={100}
                      data={data1}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >

                      <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          })
        }


      </div>
      <div className="space10"></div>

      <div className="flex-row">
        <div className="flex1 space10">

          <SearchBar stockSearchHandler={stockSearchHandler} searchText={searchText} />

          <SearchResults tickersList={tickersList} setSelectedStock={setSelectedStock} setSelectedStockName={setSelectedStockName}/>

        </div>

        <div
          style={{
            width: "100%",

            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 10,
            flex: 1
          }}
        >
          <div className="flex-row flex1">
              <div className="flex1" style={{ borderRight: 'solid black 1px ', padding: '10px' }}>
                <Text style={{ color: colors.textGrey }}>
				{selectedStockName}
                </Text>
				<Text weight={600} size={17}>{selectedStockDetails.code}</Text>
              </div>
            
			 <div className="flex1" style={{ borderRight: 'solid black 1px ', padding: '10px' }}>
                <Text style={{ color: colors.textGrey }}>
                  Price
                </Text>
				<Text weight={600} size={17}>{selectedStockDetails.price}</Text>
              </div>
			  
				<div className="flex1" style={{ borderRight: 'solid black 1px ', padding: '10px' }}>
                <Text style={{ color: colors.textGrey }}>
                  Volume
                </Text>
				<Text weight={600} size={17}>{selectedStockDetails.volume}</Text>
              </div>

            <div>
              <div>

                <Text weight={600} size={17}>
                  Suggestion
                </Text>
              </div>
              <div className="flex-row">
                <Button style={{ margin: 5 }} color="green">
                  Buy
                </Button>
                <Button color="red" style={{ margin: 5 }}>
                  Sell
                </Button>
              </div>

            </div>


          </div>
          <div style={{ height: 300 }} className="flex1">



            <ResponsiveContainer>
				<IframeChart selectedStock={selectedStock}/>
	

{/* G            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
{ /* G               <XAxis dataKey="date" />
                <YAxis />
                {/* <Tooltip /> */}
                {/* <Legend /> */}
{ /* G               <Line
                  type="monotone"
                  dataKey="totalClients"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <Line type="monotone" dataKey="completed" stroke="#82ca9d" />
</LineChart>																			G */}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
