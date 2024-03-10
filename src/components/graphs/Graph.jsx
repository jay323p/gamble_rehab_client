import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
const Graph = ({ type, data, removeGridLines }) => {

    return (
        <div className="h-full w-full flex justify-center items-center">
            {type === 'Line' ? (
                <ResponsiveLine
                    data={data}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: 'point' }}
                    yScale={{
                        type: 'linear',
                        min: 'auto',
                        max: 'auto',
                        stacked: true,
                        reverse: false,
                    }}
                    theme={{
                        background: '#030806',
                        text: {
                            fontSize: 11,
                            fill: '#5FB495',
                            outlineWidth: 0,
                            outlineColor: 'transparent',
                        },
                        axis: {
                            domain: {
                                line: {
                                    stroke: '#5FB495',
                                    strokeWidth: 1,
                                },
                            },
                            legend: {
                                text: {
                                    fontSize: 12,
                                    fill: '#0D9B5C',
                                    outlineWidth: 0,
                                    outlineColor: 'transparent',
                                },
                            },
                            ticks: {
                                line: {
                                    stroke: '#5FB495',
                                    strokeWidth: 1,
                                },
                                text: {
                                    fontSize: 11,
                                    fill: '#5FB495',
                                    outlineWidth: 0,
                                    outlineColor: 'transparent',
                                },
                            },
                        },
                        grid: {
                            line: {
                                stroke: '#5FB495',
                                strokeWidth: removeGridLines ? 0 : 0.3,
                            },
                        },
                        legends: {
                            title: {
                                text: {
                                    fontSize: 11,
                                    fill: '#0D9B5C',
                                    outlineWidth: 0,
                                    outlineColor: 'transparent',
                                },
                            },
                            text: {
                                fontSize: 11,
                                fill: '#0D9B5C',
                                outlineWidth: 0,
                                outlineColor: 'transparent',
                            },
                            ticks: {
                                line: {},
                                text: {
                                    fontSize: 10,
                                    fill: '#0D9B5C',
                                    outlineWidth: 0,
                                    outlineColor: 'transparent',
                                },
                            },
                        },
                        annotations: {
                            text: {
                                fontSize: 13,
                                fill: '#0D9B5C',
                                outlineWidth: 2,
                                outlineColor: '#ffffff',
                                outlineOpacity: 1,
                            },
                            link: {
                                stroke: '#0D9B5C',
                                strokeWidth: 1,
                                outlineWidth: 2,
                                outlineColor: '#ffffff',
                                outlineOpacity: 1,
                            },
                            outline: {
                                stroke: '#0D9B5C',
                                strokeWidth: 2,
                                outlineWidth: 2,
                                outlineColor: '#ffffff',
                                outlineOpacity: 1,
                            },
                            symbol: {
                                fill: '#0D9B5C',
                                outlineWidth: 2,
                                outlineColor: '#ffffff',
                                outlineOpacity: 1,
                            },
                        },
                        tooltip: {
                            container: {
                                background: '#0D9B5C',
                                fontSize: 12,
                            },
                            basic: {},
                            chip: {},
                            table: {},
                            tableCell: {},
                            tableCellValue: {},
                        },
                    }}
                    yFormat=" >-.2f"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Game-#',
                        legendOffset: 36,
                        legendPosition: 'middle',
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: '$-Won',
                        legendOffset: -40,
                        legendPosition: 'middle',
                    }}
                    pointSize={7}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={1}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                />
            ) : type === 'Bar' ? (
                <ResponsiveBar
                    data={data}
                    keys={['wagered', 'won', 'profit']}
                    indexBy="gameNumber"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.3}
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={{ scheme: 'pastel1' }}

                    borderColor={{
                        from: 'color',
                        modifiers: [['darker', 1.6]],
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Game #',
                        legendPosition: 'middle',
                        legendOffset: 32,
                        color: '#5FB495'
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Money Stats',
                        legendPosition: 'middle',
                        legendOffset: -40,
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{
                        from: 'color',
                        modifiers: [['darker', 1.6]],
                    }}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                    role="application"
                    ariaLabel="Nivo bar chart demo"
                    barAriaLabel={(e) =>
                        e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
                    }
                />
            ) : (
                <ResponsivePie
                    data={data}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{
                        from: 'color',
                        modifiers: [['darker', 0.2]],
                    }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{
                        from: 'color',
                        modifiers: [['darker', 2]],
                    }}
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            size: 4,
                            padding: 1,
                            stagger: true,
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10,
                        },
                    ]}
                    fill={[
                        {
                            match: {
                                id: 'ruby',
                            },
                            id: 'dots',
                        },
                        {
                            match: {
                                id: 'c',
                            },
                            id: 'dots',
                        },
                        {
                            match: {
                                id: 'go',
                            },
                            id: 'dots',
                        },
                        {
                            match: {
                                id: 'python',
                            },
                            id: 'dots',
                        },
                        {
                            match: {
                                id: 'scala',
                            },
                            id: 'lines',
                        },
                        {
                            match: {
                                id: 'lisp',
                            },
                            id: 'lines',
                        },
                        {
                            match: {
                                id: 'elixir',
                            },
                            id: 'lines',
                        },
                        {
                            match: {
                                id: 'javascript',
                            },
                            id: 'lines',
                        },
                    ]}
                    legends={[
                        {
                            anchor: 'bottom',
                            direction: 'row',
                            justify: false,
                            translateX: 0,
                            translateY: 56,
                            itemsSpacing: 0,
                            itemWidth: 100,
                            itemHeight: 18,
                            itemTextColor: '#999',
                            itemDirection: 'left-to-right',
                            itemOpacity: 1,
                            symbolSize: 18,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000',
                                    },
                                },
                            ],
                        },
                    ]}
                />
            )}
        </div>
    );
};

export default Graph;
