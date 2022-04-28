import React from "react";
import Feature from "../../component/Feature";
import { getAllLokasi, getJadwalSholatById } from "../../utils/service";
import { Grid, Select } from "@chakra-ui/react";
import ConstantUtils from "../../utils/constants";
import CountDown from "../../component/Countdown";
import { GlobalConsumer } from "../../context/context";

class Today extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listKota: [],
        }
    }

    getTimezoneOffset = (region) => {
        const constants = new ConstantUtils();
        if (constants.WIB.includes(region)) {
            return 7;
        } else if (constants.WITA.includes(region)) {
            return 8;
        } else if (constants.WIT.includes(region)) {
            return 9;
        }

        return 7;
    }

    updateState = async (lokasi) => {
        const data = await getJadwalSholatById(lokasi.split('-')[0], new Date()); 
        
        this.props.dispatch({type: 'CHANGE_VALUE', newValue: {
            state: {...this.props.state, 
                lokasi: data.data.lokasi,
                lokasiId: data.data.id,
                timezoneOffset: this.getTimezoneOffset(data.data.daerah),
                jadwal: [
                    {name: 'IMSAK', time: data.data.jadwal.imsak},
                    {name: 'SUBUH', time: data.data.jadwal.subuh},
                    {name: 'DZUHUR', time: data.data.jadwal.dzuhur},
                    {name: 'ASHAR', time: data.data.jadwal.ashar},
                    {name: 'MAGHRIB', time: data.data.jadwal.maghrib},
                    {name: 'ISYA', time: data.data.jadwal.isya}
                ],
            }
        }})
    }

    componentDidMount() {
        const cities = getAllLokasi();
        const data = getJadwalSholatById(this.props.state.lokasiId, new Date()); 
        
        Promise.all([cities, data]).then(([cities, data]) => {
            this.props.dispatch({type: 'CHANGE_VALUE', newValue: {
                state: {...this.props.state, 
                    lokasi: data.data.lokasi,
                    lokasiId: data.data.id,
                    timezoneOffset: this.getTimezoneOffset(data.data.daerah),
                    jadwal: [
                        {name: 'IMSAK', time: data.data.jadwal.imsak},
                        {name: 'SUBUH', time: data.data.jadwal.subuh},
                        {name: 'DZUHUR', time: data.data.jadwal.dzuhur},
                        {name: 'ASHAR', time: data.data.jadwal.ashar},
                        {name: 'MAGHRIB', time: data.data.jadwal.maghrib},
                        {name: 'ISYA', time: data.data.jadwal.isya}
                    ],
                }
            }})
                
            this.setState({listKota: cities}, () => {
                this.props.dispatch({type: 'SET_NEXT_SHOLAT'});
            })
        })
        
    }

    handleChangeKota = (value) => {
        this.updateState(value.target.selectedOptions[0].value)
    }

    handleFinishTimer = async (isTrue) => {
        if (isTrue) {
            this.props.dispatch({type: 'SET_NEXT_SHOLAT'});
        }
    }

    render() {
        console.log(this.props)
        return (
        <div>
            <Select 
            placeholder='Pilih Kota'
            onChange={(value) => this.handleChangeKota(value)}
            value={this.props.state.lokasiId+'-'+this.props.state.lokasi}
            >
                {
                    this.state.listKota.map((kota) => (
                        <option key={kota.id} value={kota.id+'-'+kota.lokasi} >{kota.lokasi}</option>
                    ))
                }
            </Select>

            
            <CountDown />

            <Grid templateColumns={'repeat(' + this.props.state.jadwal.length + ', 1fr)'} gap={1}>
                {
                    this.props.state.jadwal.map(data => (
                        <Feature key={data.name} name={data.name} time={data.time}/>
                    ))
                }
            </Grid>

            
            </div>
        )
    }
}

export default GlobalConsumer(Today);