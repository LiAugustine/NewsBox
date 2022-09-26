import HotNews from "./HotNews"
import YourNews from "./YourNews"
import NewsSearch from "./NewsSearch"
import {
    Center,
    Tabs, TabList, TabPanel, TabPanels, Tab,
} from '@chakra-ui/react'

export default function NewsTabs() {

    return (
        <div>

            <Tabs variant='soft-rounded' colorScheme='green'>
                <Center>
                    <TabList>
                        <Tab>Hot News</Tab>
                        <Tab>Your News</Tab>
                        <Tab>Advanced News Search</Tab>
                    </TabList>
                </Center>
                <TabPanels>
                    <TabPanel>
                        <HotNews />
                    </TabPanel>

                    <TabPanel>
                        <YourNews />
                    </TabPanel>

                    <TabPanel>
                        <NewsSearch />
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </div >
    );
}
