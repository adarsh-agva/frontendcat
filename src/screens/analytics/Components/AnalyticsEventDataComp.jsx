import React from "react";
import CustomCard from "../../../container/CustomCard";
import EventDataWithDate from "./EventDataWithDate";
import StackData from "./StackData";

export default function AnalyticsEventDataComp() {
  return (
    <>
      <CustomCard height="100%">
        <EventDataWithDate />
        <StackData />
      </CustomCard>
    </>
  );
}
