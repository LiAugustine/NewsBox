import { Link } from "react-router-dom";
import {

    Center, Tab, Tabs, TabList,
} from '@chakra-ui/react'


export default function TabLinks(tabSelected) {

    return (
        <Center>
            <Tabs variant='soft-rounded' colorScheme='green' defaultIndex={tabSelected.tab}>
                <TabList>
                    <Tab as={Link} to="/">Your News</Tab>
                    <Tab as={Link} to="/Customize">Customize Your Feed</Tab>
                    <Tab as={Link} to="/HotNews">Hot News</Tab>
                    <Tab as={Link} to="/NewsSearch">Advanced News Search</Tab>
                </TabList>
            </Tabs>
        </Center>
    )
}