import HotNews from "./HotNews";
import LocalNews from "./LocalNews";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function NewsTabs() {

    return (
        <div>
            <Tabs variant='soft-rounded' colorScheme='green'>
                <TabList>
                    <Tab>Hot News</Tab>
                    <Tab>Local News</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <HotNews />
                    </TabPanel>
                    <TabPanel>
                        <LocalNews />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
}
