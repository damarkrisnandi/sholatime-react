import React from "react";
import Feature from "../../component/Feature";
import { getAllLokasi, getJadwalSholat, getLokasi, getJadwalSholatById } from "../../utils/service";
import { Container, Grid, Select } from "@chakra-ui/react";
import ConstantUtils from "../../utils/constants";
import CountDown from "../../component/Countdown";

export default class Today extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jadwal: [
                {name: 'IMSAK', time: '00:00'},
                {name: 'SUBUH', time: '00:00'},
                {name: 'DZUHUR', time: '00:00'},
                {name: 'ASHAR', time: '00:00'},
                {name: 'MAGHRIB', time: '00:00'},
                {name: 'ISYA', time: '00:00'}
            ],
            lokasi: '',
            lokasiId: '',
            timezoneOffset: 0,
            listKota: [],

            nextName: '',
            nextTime: null
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
        
        
        this.setState({
            jadwal: [
                {name: 'IMSAK', time: data.data.jadwal.imsak},
                {name: 'SUBUH', time: data.data.jadwal.subuh},
                {name: 'DZUHUR', time: data.data.jadwal.dzuhur},
                {name: 'ASHAR', time: data.data.jadwal.ashar},
                {name: 'MAGHRIB', time: data.data.jadwal.maghrib},
                {name: 'ISYA', time: data.data.jadwal.isya}
            ],
            lokasi: data.data.lokasi,
            lokasiId: data.data.id,
            timezoneOffset: this.getTimezoneOffset(data.data.daerah),
        }, () => {
            this.setNextSholat(true);    
        })
    }

    componentDidMount() {
        const cities = getAllLokasi();
        const data = getJadwalSholat('jakarta', new Date()); 
        
        Promise.all([cities, data]).then(([cities, data]) => {
            this.setState({
                jadwal: [
                    {name: 'IMSAK', time: data.data.jadwal.imsak},
                    {name: 'SUBUH', time: data.data.jadwal.subuh},
                    {name: 'DZUHUR', time: data.data.jadwal.dzuhur},
                    {name: 'ASHAR', time: data.data.jadwal.ashar},
                    {name: 'MAGHRIB', time: data.data.jadwal.maghrib},
                    {name: 'ISYA', time: data.data.jadwal.isya}
                ],
                lokasi: data.data.lokasi,
                lokasiId: data.data.id,
                timezoneOffset: this.getTimezoneOffset(data.data.daerah),
                listKota: cities,
                
            }, () => {
                this.setNextSholat(true);
            })
        })
        
    }

    handleChangeKota = (value) => {
        this.updateState(value.target.selectedOptions[0].value)
    }

    handleFinishTimer = async (isTrue) => {
        if (isTrue) {
            this.setNextSholat(true);
        }
    }

    setNextSholat = async (isNewJadwal) => {
        const now = new Date();
        const nowStr = `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}` +
        `:${now.getSeconds() < 10 ? '0' : ''}${now.getSeconds()}`;
        const nextSholatList = this.state.jadwal.filter(dt => {
        
            const hm = parseInt(nowStr.split(':').join(''));
            const hmn = parseInt(dt.time.split(':').join('') + '00');
            return hm < hmn
        })
        let nextSholat = null;
        if (nextSholatList.length > 0) {
            nextSholat = nextSholatList[0];
            this.setState({
                nextName:nextSholat.name,
                nextTime: nextSholat.time
            })
        } else {
            const tomorrow = new Date(new Date().getTime() + 86400000);
            const data = getJadwalSholatById(this.state.lokasiId, tomorrow);
            this.setState({
                jadwal: [
                    {name: 'IMSAK', time: data.data.jadwal.imsak},
                    {name: 'SUBUH', time: data.data.jadwal.subuh},
                    {name: 'DZUHUR', time: data.data.jadwal.dzuhur},
                    {name: 'ASHAR', time: data.data.jadwal.ashar},
                    {name: 'MAGHRIB', time: data.data.jadwal.maghrib},
                    {name: 'ISYA', time: data.data.jadwal.isya}
                ],
                timezoneOffset: this.getTimezoneOffset(data.data.daerah),
                nextName:'IMSAK',
                nextTime: data.data.jadwal.imsak
            })

            if (isNewJadwal) {
            }
        }
    }

    render() {
        return (
        <div>
            <Select 
            placeholder='Pilih Kota'
            onChange={(value) => this.handleChangeKota(value)}
            value={this.state.lokasiId+'-'+this.state.lokasi}
            >
                {
                    this.state.listKota.map((kota) => (
                        <option key={kota.id} value={kota.id+'-'+kota.lokasi} >{kota.lokasi}</option>
                    ))
                }
            </Select>

            
            <CountDown 
            name={this.state.nextName} 
            timeUntil={this.state.nextTime} 
            timezoneOffset={this.state.timezoneOffset}
            
            
            
            
            onFinishTimer={(value) => this.handleFinishTimer(value)}/>
            {/* <Text fontSize='3xl'>{this.state.lokasi}</Text> */}
            <Grid templateColumns={'repeat(' + this.state.jadwal.length + ', 1fr)'} gap={1}>
                {
                    this.state.jadwal.map(data => (
                        <Feature key={data.name} name={data.name} time={data.time} timezoneOffset={this.state.timezoneOffset}/>
                    ))
                }
            </Grid>

            
            </div>
        )
    }
}