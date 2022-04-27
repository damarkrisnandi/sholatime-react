import { Box, Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react"
import React from "react"

export default function CountDown(props) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const count = (timeEnd) => {
        
        var x = setInterval(() => {
            if (isChange) clearInterval(x);
            const now = new Date().getTime();
            const distance = timeEnd - now;

            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                props.onFinishTimer(true);
            }
            else {
                setChange(false);
                setTime({hours, minutes, seconds})
                
            }
        }, 1000);
    }

    const defaultTime = {hours: 0, minutes: 0, seconds: 0};
    const [time, setTime] = React.useState(defaultTime);
    let [isChange, setChange] = React.useState(false);

    React.useEffect(() => {
        setChange(true);
        if (props.timeUntil && isChange) {
            const time = props.timeUntil;
            const [h, m] = time.split(':');
            let date = new Date();
            if (props.isNextDay) {
                date = new Date(new Date().getTime() + 86400000);
            }
            date.setHours(parseInt(h), parseInt(m), 0, 0);
            count(date);
        } 
        return () => {}
    }, [props.timeUntil, isChange, count, props.isNextDay])

    return (
        <Box maxW='6xl' borderWidth='2px' borderRadius='lg' overflow='auto' bg='teal.500' color='white'>   
            <Box p='6'>
                <Stat>
                    <StatLabel key={props.name}>{'Next >> ' + props.name}</StatLabel>
                    <StatNumber fontSize={'6xl'}>{time.hours <= 9 ? '0' : '' }{time.hours}:{time.minutes <= 9 ? '0' : '' }{time.minutes}:{time.seconds <= 9 ? '0' : '' }{time.seconds}</StatNumber>
                    <StatHelpText>{props.name + ' ' + props.timeUntil} (GMT + {props.timezoneOffset}) || LOCAL TIMEZONE: GMT + {0 - (new Date().getTimezoneOffset() / 60)}</StatHelpText>
                </Stat>
            </Box>
        </Box>
    )
}