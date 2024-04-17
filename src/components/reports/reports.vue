<template>
    <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
    <div>
        <el-card>
            <div id="main" style="width: 1000px;height:400px;"></div>
            <br>
            <br>
            <div id="secondChart" style="width: 1000px;height:400px;"></div>
            <!-- <br>
            <br>
            <div id="threeChart" style="width: 1000px;height:400px;"></div>
            <br>
            <br>
            <div id="fourChart" style="width: 1000px;height:400px;"></div>
            <br>
            <br> -->
            <!-- <dv-active-ring-chart :config="config" style="width:300px;height:300px" /> -->
            <!-- <dv-capsule-chart :config="config" style="width:300px;height:200px" /> -->
            <!-- <dv-water-level-pond :config="config" style="width:150px;height:200px" /> -->
            <!-- <dv-conical-column-chart :config="config" style="width:400px;height:200px;" /> -->
            <!-- <dv-percent-pond :config="config" style="width:200px;height:100px;" /> -->
            <!-- <dv-digital-flop :config="config" style="width:100px;height:50px;" /> -->
            <!-- <dv-scroll-board :config="config" style="width:500px;height:220px" /> -->
            <!-- <dv-scroll-ranking-board :config="config" style="width:500px;height:300px" /> -->
            <!-- <dv-flyline-chart-enhanced :config="config" :dev="true" style="width:1324px;height:1000px;" /> -->
            <!-- <img src="../../assets/bigmap0.jpg" alt=""> -->
            <!-- <div id="fourChart" style="width: 1000px;height:400px;"></div> -->
            <div id="fiveChart" style="width: 1000px;height:1000px;"></div>
        </el-card>

    </div>
</template>
<script>
import * as echarts from 'echarts'
// import * as Charts from '@jiaminghi/charts'
import _ from 'lodash'
export default {
    data() {
        return {
            config: {
                points: [
                    {
                        name: '郑州',
                        coordinate: [0.48, 0.35]
                    },
                    {
                        name: '新乡',
                        coordinate: [0.52, 0.23]
                    },
                    {
                        name: '焦作',
                        coordinate: [0.43, 0.29]
                    },
                    {
                        name: '开封',
                        coordinate: [0.59, 0.35]
                    },
                    {
                        name: '许昌',
                        coordinate: [0.53, 0.47]
                    },
                    {
                        name: '平顶山',
                        coordinate: [0.45, 0.54]
                    },
                    {
                        name: '洛阳',
                        coordinate: [0.36, 0.38]
                    },
                    {
                        name: '周口',
                        coordinate: [0.62, 0.55]
                    },
                    {
                        name: '漯河',
                        coordinate: [0.56, 0.56]
                    },
                    {
                        name: '南阳',
                        coordinate: [0.37, 0.66]
                    },
                    {
                        name: '信阳',
                        coordinate: [0.55, 0.81]
                    },
                    {
                        name: '驻马店',
                        coordinate: [0.55, 0.67]
                    },
                    {
                        name: '济源',
                        coordinate: [0.37, 0.29]
                    },
                    {
                        name: '三门峡',
                        coordinate: [0.20, 0.36]
                    },
                    {
                        name: '商丘',
                        coordinate: [0.76, 0.41]
                    },
                    {
                        name: '鹤壁',
                        coordinate: [0.59, 0.18]
                    },
                    {
                        name: '濮阳',
                        coordinate: [0.68, 0.17]
                    },
                    {
                        name: '安阳',
                        coordinate: [0.59, 0.10]
                    }
                ],
                lines: [
                    {
                        source: '新乡',
                        target: '郑州'
                    },
                    {
                        source: '焦作',
                        target: '郑州'
                    },
                    {
                        source: '开封',
                        target: '郑州'
                    },
                    {
                        source: '许昌',
                        target: '郑州'
                    },
                    {
                        source: '平顶山',
                        target: '郑州'
                    },
                    {
                        source: '洛阳',
                        target: '郑州'
                    },
                    {
                        source: '周口',
                        target: '郑州'
                    },
                    {
                        source: '漯河',
                        target: '郑州'
                    },
                    {
                        source: '南阳',
                        target: '郑州'
                    },
                    {
                        source: '信阳',
                        target: '郑州'
                    },
                    {
                        source: '驻马店',
                        target: '郑州'
                    },
                    {
                        source: '济源',
                        target: '郑州'
                    },
                    {
                        source: '三门峡',
                        target: '郑州'
                    },
                    {
                        source: '商丘',
                        target: '郑州'
                    },
                    {
                        source: '鹤壁',
                        target: '郑州'
                    },
                    {
                        source: '濮阳',
                        target: '郑州'
                    },
                    {
                        source: '安阳',
                        target: '郑州'
                    }
                ],
                line: {
                    color: 'rgba(255, 0, 0, 0.1)',
                    width: 5
                },
                bgImgSrc: 'https://static.hao86.com/pc/map/img/bigmap0.jpg'
            },
            secondoptions: {
                // color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
                title: {
                    text: '用户来源'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgb(128, 255, 165)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(1, 191, 236)'
                                }
                            ])
                        },
                        emphasis: {
                            focus: 'series'
                        },
                    },
                    {
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgb(0, 221, 255)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(77, 119, 255)'
                                }
                            ])
                        },
                        emphasis: {
                            focus: 'series'
                        },
                    },
                    {
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgb(55, 162, 255)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(116, 21, 219)'
                                }
                            ])
                        },
                        emphasis: {
                            focus: 'series'
                        },
                    },
                    {
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgb(255, 0, 135)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(135, 0, 157)'
                                }
                            ])
                        },
                        emphasis: {
                            focus: 'series'
                        },
                    },
                    {
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        label: {
                            show: true,
                            position: 'top'
                        },
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgb(255, 191, 0)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(224, 62, 76)'
                                }
                            ])
                        },
                        emphasis: {
                            focus: 'series'
                        },
                    }
                ]
            },
            // 需要合并的数据
            options: {
                title: {
                    text: '用户来源'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#E9EEF3'
                        }
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        boundaryGap: false
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ]
            },
            threeoption: {
                title: {
                    text: 'Referer of a Website',
                    subtext: 'Fake Data',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 1048, name: 'Search Engine' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            fouroption: {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    data: [
                        'Direct',
                        'Marketing',
                        'Search Engine',
                        'Email',
                        'Union Ads',
                        'Video Ads',
                        'Baidu',
                        'Google',
                        'Bing',
                        'Others'
                    ]
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        selectedMode: 'single',
                        radius: [0, '30%'],
                        label: {
                            position: 'inner',
                            fontSize: 14
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 1548, name: 'Search Engine' },
                            { value: 775, name: 'Direct' },
                            { value: 679, name: 'Marketing', selected: true }
                        ]
                    },
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['45%', '60%'],
                        labelLine: {
                            length: 30
                        },
                        label: {
                            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                            backgroundColor: '#F6F8FC',
                            borderColor: '#8C8D8E',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                a: {
                                    color: '#6E7079',
                                    lineHeight: 22,
                                    align: 'center'
                                },
                                hr: {
                                    borderColor: '#8C8D8E',
                                    width: '100%',
                                    borderWidth: 1,
                                    height: 0
                                },
                                b: {
                                    color: '#4C5058',
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    lineHeight: 33
                                },
                                per: {
                                    color: '#fff',
                                    backgroundColor: '#4C5058',
                                    padding: [3, 4],
                                    borderRadius: 4
                                }
                            }
                        },
                        data: [
                            { value: 1048, name: 'Baidu' },
                            { value: 335, name: 'Direct' },
                            { value: 310, name: 'Email' },
                            { value: 251, name: 'Google' },
                            { value: 234, name: 'Union Ads' },
                            { value: 147, name: 'Bing' },
                            { value: 135, name: 'Video Ads' },
                            { value: 102, name: 'Others' }
                        ]
                    }
                ]
            },
            fiveoption: {
                backgroundColor: '#000',
                globe: {
                    baseTexture: 'https://echarts.apache.org/examples/data-gl/asset/world.topo.bathy.200401.jpg',
                    heightTexture: 'https://echarts.apache.org/examples/data-gl/asset/bathymetry_bw_composite_4k.jpg',
                    displacementScale: 0.2,
                    shading: 'realistic',
                    environment: 'https://echarts.apache.org/examples/data-gl/asset/starfield.jpg',
                    realisticMaterial: {
                        roughness: 'https://echarts.apache.org/examples/asset/get/s/data-1497599804873-H1SHkG-mZ.jpg',
                        metalness: 'https://echarts.apache.org/examples/asset/get/s/data-1497599800643-BJbHyGWQW.jpg',
                        textureTiling: [8, 4]
                    },
                    postEffect: {
                        enable: true
                    },
                    viewControl: {
                        autoRotate: false
                    },
                    light: {
                        main: {
                            intensity: 2,
                            shadow: true
                        },
                        ambientCubemap: {
                            texture: 'https://echarts.apache.org/examples/data-gl/asset/pisa.hdr',
                            exposure: 2,
                            diffuseIntensity: 2,
                            specularIntensity: 2
                        }
                    }
                }
            },
            result: {}
        }
    },
    async created() {

        console.log(this.result + 'beforeCreate')
    },
    // 此时,页面上的元素,已经被渲染完毕了
    async mounted() {
        const { data: res } = await this.$http.get('reports/type/1')
        if (res.meta.status !== 200) {
            return this.$message.error('获取折线图数据失败!')
        }
        this.result = res.data
        // 3. 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'))
        console.log(this.result)
        // 4. 指定图表的配置项和数据
        const result1 = _.merge(this.result, this.options)
        // 5. 使用刚指定的配置项和数据显示图表。
        myChart.setOption(result1)
        const result2 = _.merge(this.result, this.secondoptions)
        var secondChart = echarts.init(document.getElementById('secondChart'))
        secondChart.setOption(result2)
        // var threeChart = echarts.init(document.getElementById('threeChart'))
        // threeChart.setOption(this.threeoption)
        // var fourChart = echarts.init(document.getElementById('fourChart'), 'dark')
        // fourChart.setOption(this.fouroption)
        // var fiveChart = echarts.init(document.getElementById('fiveChart'), 'dark')
        // fiveChart.setOption(this.fiveoption)
    },
    methods: {
    }
}
</script>
<!-- <style lang="less" scoped>
.el-card {
    background-color: black;
}
</style> -->