import React from "react";
import Picker from 'react-month-picker'
import MonthBox from 'react-monthbox';


class MonthPicker extends React.Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            singleValue: {year: 2014, month: 11},
            
        }

        this.pickAMonth = React.createRef();
    
    }

    render() {

        const pickerLang = {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            from: 'From', to: 'To'
        }
        const { singleValue } = this.state
    
        const makeText = m => {
            if (m && m.year && m.month) return (pickerLang.months[m.month-1] + '.' + m.year)
            return '?'
        }
    
        return (
            <ul>
                <li>
                   
                    <div className="edit">
                        <Picker
                            ref={this.pickAMonth}
                            years={[2008, 2011, 2012, 2014, 2016, 2018, 2020]}
                            value={singleValue}
                            lang={pickerLang.months}
                            onChange={this.handleAMonthChange}
                            onDismiss={this.handleAMonthDissmis}
                        >
                            <MonthBox value={makeText(singleValue)} onClick={this.handleClickMonthBox} />
                     </Picker>
                    </div>
                </li>
              
            </ul>
        )
    }
}

export default MonthPicker;