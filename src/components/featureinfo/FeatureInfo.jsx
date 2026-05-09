import { ArrowDownward, ArrowUpward } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { userRequest } from '../../requestMethods'

const FeatureContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const FeatureItem = styled.div`
  flex: 1;
  margin: 0 20px;
  padding: 30px;
  border-radius: 10px;
  cursor: pointer;
  -webkit-box-shadow: 0px 10px 13px -7px #000000, 2px 3px 35px 11px rgba(0, 0, 0, 0.13); 
  box-shadow: 0px 10px 13px -7px #000000, 2px 3px 35px 11px rgba(0, 0, 0, 0.13);
`

const FeatureTitle = styled.span`
  font-size: 20px;
`

const FeaturedMoneyContainer = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
`

const FeaturedMoney = styled.span`
  font-size: 30px;
  font-weight: 600;
`

const FeaturedMoneyRate = styled.span`
  display: flex;
  align-items: center;
  margin-left: 20px;
  color: ${(props) => (props.type === "negative" ? "red" : "green")};
`

const FeaturedSub = styled.span`
font-size: 15px;
color: gray;`

const FeatureInfo = () => {

  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);

  const getIncome = async () => {
    try {
      const res = await userRequest.get("orders/income");
      const [prevMonth, currMonth] = res.data; // Destructure the response
      setIncome(res.data);

      // Calculate the percentage change
      const percentageChange = ((currMonth.total - prevMonth.total) / prevMonth.total) * 100;
      setPerc(percentageChange);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getIncome();
  }, []);


  console.log("This is our final store income:", income);



  console.log("This is final income change:", perc);


  return (
    <FeatureContainer>
      <FeatureItem>
        <FeatureTitle>Revenue</FeatureTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>${income[1]?.total || 0}</FeaturedMoney>
          <FeaturedMoneyRate type={perc < 0 ? "negative" : "positive"}>
            {perc.toFixed(1)}% {perc < 0 ? <ArrowDownward /> : <ArrowUpward />}
          </FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Compared to last month</FeaturedSub>
      </FeatureItem>
      <FeatureItem>
        <FeatureTitle>Sales</FeatureTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>$4,415</FeaturedMoney>
          <FeaturedMoneyRate type="negative">-1.4 <ArrowDownward /></FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Compared to last month</FeaturedSub>
      </FeatureItem>
      <FeatureItem>
        <FeatureTitle>Cost</FeatureTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>$3,415</FeaturedMoney>
          <FeaturedMoneyRate type="positive">+2.4 <ArrowUpward /></FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Compared to last month</FeaturedSub>
      </FeatureItem>
    </FeatureContainer>
  )
}

export default FeatureInfo
