/* eslint-disable */

import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import SpinnerCustom from "../../../container/SpinnerCustom";
import { ThemeContext } from "../../../utils/ThemeContext";

export default function CarshFreeStaticsGraph() {
  const getCrashFreeUsersReducer = useSelector(
    (state) => state.getCrashFreeUsersReducer
  );

  // console.log("getCrashFreeUsersReducer", getCrashFreeUsersReducer);
  const { loading, data } = getCrashFreeUsersReducer;
  // console.log("data1234", data);
  let dt = data && data.response;
  const { theme } = React.useContext(ThemeContext);

  // console.log("theme", theme);

  // Date Formate
  const dateFormatter = (date) => {
    return moment(date).format("DD-MM-YYYY");
  };
  return (
    <>
      {data && data.count == 0 && (
        <p
          style={{
            width: "100%",
            height: "600%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: theme == "light-theme" ? `#000` : `#fff`,
          }}
        >
          No data found
        </p>
      )}

      {data && data.response.length > 0 && (
        <div style={{ width: "100%", height: 180 }}>
          <ResponsiveContainer>
            <AreaChart
              data={dt}
              margin={{
                top: 10,
                right: 0,
                left: -10,
                bottom: 0,
              }}
            >
              <XAxis
                stroke={theme == "light-theme" ? `#257d7c` : `#fff`}
                fill={theme == "light-theme" ? `#257d7c` : `#fff`}
                dataKey="date"
                tickCount={5}
                minTickGap={10}
                tickFormatter={dateFormatter}
              />
              <YAxis
                interval={1}
                dataKey="data"
                axisLine={false}
                stroke={theme == "light-theme" ? `#257d7c` : `#fff`}
              />
              <CartesianGrid
                stroke={theme == "light-theme" ? `#257d7c` : `#fff`}
                vertical={false}
                strokeDasharray="0 0 4"
              />
              <Tooltip />
              <Area
                type="monotoneY"
                dataKey="data"
                stroke={theme == "light-theme" ? `#257d7c` : `#fff`}
                fill={theme == "light-theme" ? `#257d7c` : `#fff`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {loading && <SpinnerCustom height="200px" />}
    </>
  );
}
