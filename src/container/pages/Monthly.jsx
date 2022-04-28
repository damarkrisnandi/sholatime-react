import React from "react";
import { getJadwalSholatMonthlyById } from "../../utils/service";
import { DefaultTable } from "../../component/DefaultTable";
import { GlobalConsumer } from "../../context/context";
import './Monthly.css';

class Monthly extends React.Component {
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
        const data = getJadwalSholatMonthlyById(this.props.state.lokasiId, new Date());
        // const cities = getAllLokasi();
        Promise.all([data ]).then(([data]) => {
            this.setState({jadwalList: data.data.jadwal});
            console.log(this.state.jadwalList);
        })
    }

    render() {
        return (
            <div className="height-view">
                <h1>Jadwal Imsakiyyat Wilayah {this.props.state.lokasi} dan Sekitarnya</h1>
                <div>
                <DefaultTable 
                column={this.column}
                list={this.state.jadwalList}
                
                />
                </div>
            </div>
        )
    }
}

export default GlobalConsumer(Monthly);