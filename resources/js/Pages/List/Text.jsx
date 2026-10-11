
import DashboardLayout from "@/Layouts/Dashboard/Layout";
import WheelDatePicker from './Date/WheelDatePicker';
import { useState } from "react";

function Test() {

    const [da, setDa] = useState('');


    return (
        <>
            <WheelDatePicker
                maxYear={1409}
                minYear={1405}
                onChange={(v)=>setDa(v)}
            />

            <span>
                da is: {da}
            </span>
        </>
    )
}

Test.layout = page => <DashboardLayout children={page} />

export default Test;