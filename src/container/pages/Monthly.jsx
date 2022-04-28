import React from "react";
import { getJadwalSholatMonthlyById } from "../../utils/service";
import { DefaultTable } from "../../component/DefaultTable";
import { GlobalConsumer } from "../../context/context";
import './Monthly.css';
import { Box, Text } from "@chakra-ui/react";

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
        })
    }

    render() {
        return (
            <div className="height-view">
                <Box p={'2'}>
                    <Box maxW='6xl' borderRadius='lg' overflow='auto' bg='teal.500' color='white'>   
                        <Box p='6'>
                            <Text fontSize='2xl'>Jadwal Imsakiyyah Wilayah {this.props.state.lokasi} dan Sekitarnya</Text>
                            <DefaultTable 
                            column={this.column}
                            list={this.state.jadwalList}
                            />
                        </Box>
                    </Box>
                </Box>
            </div>
        )
    }
}

export default GlobalConsumer(Monthly);