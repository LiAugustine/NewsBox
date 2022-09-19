import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { TabMenu } from 'primereact/tabmenu';

export default function NewsTabs() {

    const [activeIndex, setActiveIndex] = useState(3);

    const items = [
        { label: 'Hot', icon: 'pi pi-fw pi-chart-bar' },
        { label: 'Local', icon: 'pi pi-fw pi-home' },
        { label: 'Your News', icon: 'pi pi-fw pi-pencil' },
        { label: 'News Search', icon: 'pi pi-fw pi-search' },
    ];

    return (
        <div>
            <div className="card">
                <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
                <p>Test</p>
            </div>
        </div>
    );
}
