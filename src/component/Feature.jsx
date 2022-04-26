import { Box, Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react"

function Feature(props) {
    return (
      <Box maxW='sm' borderWidth='2px' borderRadius='lg' overflow='auto' bg='teal.600' color='white'>   
        <Box p='6'>
            <Stat>
                <StatLabel>{props.name}</StatLabel>
                <StatNumber>{props.time}</StatNumber>
                <StatHelpText>GMT + {props.timezoneOffset}</StatHelpText>
            </Stat>
        </Box>
      </Box>
    )
  }

export default Feature;