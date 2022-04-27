import { TableContainer, Table, Thead, Tbody, Tfoot, Tr, Td, Th, Center, Spinner } from "@chakra-ui/react"
import './DefaultTable.css';
export function DefaultTable(props) {
    return (
        <TableContainer>
            <div className="scroll-inside">
            <Table size='sm'>
                
                <Thead>
                    <Tr>
                        {props.column.map(col => (
                            <Th key={col.header}>{col.header}</Th>    
                        ))}
                    </Tr>
                </Thead>
                
                <Tbody >
                    
                    {   props.list.length === 0 ? 
                        (
                            <Tr>
                                <Td colSpan={props.column.length}>
                                    <Center h='100px' w={'4xl'}>
                                        <Spinner color='red.500' />
                                    </Center>
                                </Td>
                            </Tr>
                        ) :
                        props.list.map((data) => (
                            <Tr key={data.date}>
                                {
                                    props.column.map(col => {
                                        const date = new Date();
                                        return (
                                            
                                                <Td 
                                                key={col.field} 
                                                bg={props.list[date.getDate() - 1].date === data.date ? 'teal.100' : ''}
                                                fontWeight={props.list[date.getDate() - 1].date === data.date ? 'bold' : ''}
                                                >
                                                    {data[col.field]}
                                                </Td>
                                            
                                        )}
                                    )
                                }

                            </Tr>
                        ))
                    }
                    
                </Tbody>
                
                <Tfoot>
                    <Tr>
                        {props.column.map(col => (
                            <Th key={col.header}>{col.header}</Th>    
                        ))}
                    </Tr>
                </Tfoot>
            </Table>
            </div>
        </TableContainer>
    )
}