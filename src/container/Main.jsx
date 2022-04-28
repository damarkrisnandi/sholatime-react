import { BrowserRouter as Router, Route, NavLink , Routes} from 'react-router-dom';
import { Grid, GridItem, Stack, Button, Center, Container } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import './Main.css';

// import lazy
const Today = React.lazy(() => import('./pages/Today'));
const Monthly = React.lazy(() => import('./pages/Monthly'));
// import Today from './pages/Today';
// import Monthly from './pages/Monthly';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pathname: 'Today',
            clicked: 0,
            comp: () => (<Today />)
        }
    }
    routes = [
        {path: '/', name: 'Today', el: <Today />, id: 1},
        {path: '/month', name: 'This Month', el: <Monthly />, id: 2},
    ];
    
    pathname = window.location.pathname;

    handleChangePath = (value) => {
        this.setState({
            pathname: value.target.innerHTML,
            comp: () => (this.routes.find(d => d.name === value.target.innerHTML).el)
        })
    }

    LoaderMain = () => (
        <div>Sedang memuat...</div>
    )  
    render() {
        return (
        <Router>
            <Grid
            templateRows='repeat(1, 1fr)'
            templateColumns='repeat(5, 1fr)'
            gap={2}
            >
            <GridItem colSpan={1}>
                <Container>
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
                </Container>
            </GridItem>
            <GridItem colSpan={4} maxH={'100vh'} overflowY={'hidden'}>
            <div>
            <Suspense fallback={<this.LoaderMain />}>
                <Routes>
                {
                    this.routes.map(route => (
                    <Route path={route.path} element={route.el} key={route.id}/>
                    ))
                }
                </Routes>
            </Suspense>
            </div>
            </GridItem>
            </Grid>
          </Router>
        )
    }
}