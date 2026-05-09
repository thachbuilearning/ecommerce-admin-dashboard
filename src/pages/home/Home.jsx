import React, { useMemo, useState } from 'react'
import FeatureInfo from '../../components/featureinfo/FeatureInfo'
import Chart from '../../components/chart/Chart'
// import { userData } from '../../dummyData'
import styled from 'styled-components'
import WidgetSm from '../../components/widgetsm/WidgetSm'
import WidgetLg from '../../components/widgetlg/WidgetLg'
import { useEffect } from 'react'
import { userRequest } from '../../requestMethods'

const HomeWidgets = styled.div`
    display: flex;
 
    width: 100%;
`

const Home = () => {
    const [userStats, setUserStats] = useState([]);
    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    )


    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("users/stats");
                const sortedData = res.data
                    .sort((a, b) => a._id - b._id)
                    .map(item => ({
                        name: MONTHS[item._id - 1],
                        "Active User": item.total,
                    }));

                setUserStats(sortedData);
            } catch (error) {
                console.error(error);
            }
        };

        getStats();
    }, [MONTHS]);

    useEffect(() => {
        console.log("số lượng user đăng ký hàng tháng final:", userStats);
    }, [userStats]);

    return (
        <div>
            <FeatureInfo />
            <Chart data={userStats} title="User Analytics" dataKey="Active User" grid />
            <HomeWidgets>
                <WidgetSm />
                <WidgetLg />
            </HomeWidgets>
        </div>
    )
}


export default Home;