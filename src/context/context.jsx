import React, {createContext} from "react";
import { getJadwalSholatById } from "../utils/service";

const RootContext = createContext();

// Provider
const Provider = RootContext.Provider;
const GlobalProvider = (Children) => {
    return (
        class ParentComp extends React.Component {
            state = {
                lokasi: 'KAB. BANYUMAS',
                lokasiId: '1402',
                nextName: 'IMSAK',
                nextTime: '00:00',
                isNextDay: false,
                timezoneOffset: 7,
                jadwal: [
                    {name: 'IMSAK', time: '00:00'},
                    {name: 'SUBUH', time: '00:00'},
                    {name: 'DZUHUR', time: '00:00'},
                    {name: 'ASHAR', time: '00:00'},
                    {name: 'MAGHRIB', time: '00:00'},
                    {name: 'ISYA', time: '00:00'}
                ],
            }

            setNextSholat = () => {
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
                    getJadwalSholatById(this.state.lokasiId, tomorrow).then(data => {
                        this.setState({
                            nextName:'IMSAK',
                            nextTime: data.data.jadwal.imsak,
                            isNextDay: true,
                            timezoneOffset: this.getTimezoneOffset(data.data.daerah),
                            jadwal: [
                                {name: 'IMSAK', time: data.data.jadwal.imsak},
                                {name: 'SUBUH', time: data.data.jadwal.subuh},
                                {name: 'DZUHUR', time: data.data.jadwal.dzuhur},
                                {name: 'ASHAR', time: data.data.jadwal.ashar},
                                {name: 'MAGHRIB', time: data.data.jadwal.maghrib},
                                {name: 'ISYA', time: data.data.jadwal.isya}
                            ]
                        })
                    })
                }
            }

            dispatch = (action) => {
                if (action.type === 'CHANGE_VALUE') {
                    this.setState(action.newValue.state, () => { this.setNextSholat() });
                }

                if (action.type === 'SET_NEXT_SHOLAT') {
                    this.setNextSholat()
                }
            }
            render() {
                return (
                    <Provider value={
                        {
                            state: this.state,
                            dispatch: this.dispatch
                        }
                    }>
                        <Children {...this.props}/>
                    </Provider>
                )
            }
        }
    )
}
export default GlobalProvider;

// Consumer
const Consumer = RootContext.Consumer;
export const GlobalConsumer = (Children) => {
    return (
        class ParentConsumer extends React.Component {
            render() {
                return (
                    <Consumer>
                        {
                            value => (
                            <Children {...this.props} {...value}/> 
                            )
                        }
                    </Consumer>
                )
            }
        }
        
        
    )
}