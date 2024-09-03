import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { CommonComponentProps } from "../../../interface";
import { useDrag } from "react-dnd";
import { debounce } from "lodash-es";
import { useComponetsStore } from "../../../stores/components";

const LineChart: React.FC<CommonComponentProps> = ({ id, styles, options }) => {
  const { editorSize } = useComponetsStore();
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<any>(null);
  const [_, drag] = useDrag({
    type: "LineChart",
    item: {
      dragType: "move",
      type: "LineChart",
      id,
    },
  });
  const debounceResize = debounce(() => {
    chartInstanceRef.current?.resize();
  }, 150);
  useEffect(() => {
    // resize 时重新渲染chart
    window.addEventListener("resize", debounceResize);
    return () => {
      window.removeEventListener("resize", debounceResize);
    };
  }, [debounceResize]);
  useEffect(() => {
    debounceResize();
  }, [debounceResize, editorSize]);
  useEffect(() => {
    if (chartRef.current) {
      setTimeout(() => {
        chartInstanceRef.current = echarts.init(chartRef.current);
        chartInstanceRef.current?.setOption(options);
      }, 100);

      return () => {
        chartInstanceRef.current?.dispose();
      };
    }
  }, [options]);

  return (
    <div ref={drag}>
      <div ref={chartRef} data-component-id={id} style={{ width: "100%", height: "300px", ...styles }} />
    </div>
  );
};

export default LineChart;
