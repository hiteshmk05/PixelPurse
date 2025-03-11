import React from "react";
import { IgrPieChart, IgrPieChartModule } from "igniteui-react-charts";

IgrPieChartModule.register();

export function getDistinctColor(index) {
    const hue = (index * 360) / 12;
    return `hsl(${hue}, 70%, 50%)`;
}

const PieChart = ({ labels, data, chartTitle }) => {
    if (!Array.isArray(labels) || !Array.isArray(data) || labels.length !== data.length) {
        return <div>Error: Invalid data provided</div>;
    }

    const total = data.reduce((sum, value) => sum + value, 0);
    const normalizedData = total > 0 ? data.map(value => (value / total) * 100) : data;

    const fullData = labels.map((label, index) => ({
        Category: label,
        Value: normalizedData[index],
    }));

    const filteredData = fullData.filter(item => item.Value > 0);

    const colors = labels.map((label, index) => {
        if (label === "Paid") return "green";
        if (label === "Unpaid") return "red";
        return getDistinctColor(index);
    });

    return (
        <div className="flex flex-col items-center w-full">
            <h3 className="text-lg font-semibold mb-2 text-slate-300">{chartTitle}</h3>
            
            <div className="w-[300px] h-[300px]">
                {filteredData.length > 0 ? (
                    <IgrPieChart
                        dataSource={filteredData}
                        valueMemberPath="Value"
                        labelMemberPath="Category"
                        brushes={filteredData.map(item => colors[labels.indexOf(item.Category)])} 
                        width="100%"
                        height="100%"
                        labelsPosition="none"
                        othersCategoryThreshold={0}
                        othersCategoryType="Number"
                    />
                ) : (
                    <div className="text-center">No data available</div>
                )}
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
                {fullData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: colors[index] }}
                        ></div>
                        <span className="text-sm text-slate-300">
                            {item.Category}: {item.Value.toFixed(1)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PieChart;
