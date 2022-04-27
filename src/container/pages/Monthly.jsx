import React from "react";
import { getAllLokasi, getJadwalSholatMonthly } from "../../utils/service";
import { DefaultTable } from "../../component/DefaultTable";

export default class Monthly extends React.Component {
    column = [
        {header: 'Tanggal', field: 'tanggal'},
        {header: 'Imsak', field: 'imsak'},
        {header: 'Subuh', field: 'subuh'},
        {header: 'Dzuhur', field: 'dzuhur'},
        {header: 'Ashar', field: 'ashar'},
        {header: 'Maghrib', field: 'maghrib'},
        {header: 'Isya', field: 'isya'}, 
    ];
    constructor(props) {
        super(props);
        this.state = {
            jadwalList: []
        }
    }
    componentDidMount() {
        const data = getJadwalSholatMonthly('banyumas', new Date());
        const cities = getAllLokasi();
        Promise.all([data, cities]).then(([data, cities]) => {
            console.log('good')
            this.setState({jadwalList: data.data.jadwal});
            console.log(this.state.jadwalList);
        })
    }

    render() {
        return (
            <div>
            <DefaultTable 
            column={this.column}
            list={this.state.jadwalList}
            />
            </div>
        )
    }
}