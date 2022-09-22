import HotNews from "./HotNews"
import LocalNews from "./YourNews"
import NewsSearch from "./NewsSearch"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function NewsTabs() {

    return (
        <div>
            <Tabs variant='soft-rounded' colorScheme='green'>
                <TabList>
                    <Tab>Hot News</Tab>
                    <Tab>News Search</Tab>
                    <Tab>Your News</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <HotNews />
                    </TabPanel>

                    <TabPanel>
                        <NewsSearch />
                    </TabPanel>

                    <TabPanel>
                        <LocalNews />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
}
