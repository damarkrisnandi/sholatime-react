import Today from './pages/Today';
import Example from './pages/Example';

import { BrowserRouter as Router, Route, NavLink , Routes} from 'react-router-dom';
import { Grid, GridItem, Stack, Button } from '@chakra-ui/react';
import React from 'react';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pathname: 'Today',
            clicked: 0
        }
    }
    routes = [
        {path: '/', name: 'Today', el: <Today />, id: 1},
        {path: '/month', name: 'This Month', el: <Example />, id: 2},
    ];
    
    pathname = window.location.pathname;

    // componentDidMount() {
    //     this.handleChangePath();
    // }

    handleChangePath = (value) => {
        this.setState({
            pathname: value.target.innerHTML
        })
    }

    render() {
        return (
        <Router>
            <Grid
            h='200px'
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(5, 1fr)'
            gap={2}
            >
            <GridItem colSpan={1}>
                <Stack direction='column' spacing={1} align='center'>
                    {this.routes.map(route => (
                        <NavLink  to={route.path} key={route.id}>
                            <Button 
                            key={route.name} 
                            colorScheme='teal' 
                            variant={ this.state.pathname === route.name  ? 'solid' : 'ghost'} 
                            w={'2xs'}
                            value={route.id}
                            onClick={(value) => this.handleChangePath(value)}
                            >
                            {route.name}
                            </Button>
                        </NavLink>
                    ))}
                    
                </Stack>
            </GridItem>
            <GridItem colSpan={4}>
            
                {/* <Today /> */}
                <Routes>
                {
                    this.routes.map(route => (
                    <Route path={route.path} element={route.el} key={route.id}/>
                    ))
                }
                {/* <Route path="/" exact element={<Today />}/>
                <Route path="/today" element={<Today />}/>
                <Route path="/example" element={<Example />} /> */}
                </Routes>
            
            </GridItem>
            </Grid>
          </Router>
        )
    }
}