import React from 'react';
import CurrencyConverter from "./currencyConverter";

const CurrencyConverterWrapper = (props) => {
			var rows = [];
			for (var i = 0; i < props.showItems; i++) {
				rows.push(<CurrencyConverter key={i} instance={i} totalItems={props.showItems}/>);
			}
		return <div>{rows}</div>;
}

export default CurrencyConverterWrapper;
