		var normalColor = "#DBDBDB";
		
		var nameTextStyleX = {
			color: normalColor,
			bottom: 0,
			align: "center",
			padding: [10, 0, 0, 10],
		};
		
		var nameTextStyleY = {
			color: normalColor,
			bottom: 0,
			align: "center",
			padding: [0, 0, 0, -20],
		};
		
		var axisLabel = {
			textStyle: {
			color: normalColor,
			},
		};
		
		var hiddenLabel = {
			show: false,
			emphasis: {
			show: true,
		  	},
		};
		
		let axisLine = {
			show: true,
			lineStyle: {
			color: "#24687F",
			},
		};
		
		/**
		 * 产业发展情况
		 * @param {Object} yearsDate
		 * @param {Object} dataEstate
		 */
		function renderLine(yearsDate, dataEstate) {
			let _this = this;
			let commonOption = {
				type: "line",
				label: hiddenLabel,
				smooth: false,
				symbol: "circle",
				symbolSize: 6,
				lineStyle: {
					normal: {
						width: 1,
					},
				},
			};
			
			let myChart = echarts.init(document.querySelector(".industry"));

			// 产业发展情况
			let lineData = dataEstate.dataValuesGdp;
			let lineData2 = dataEstate.dataValuesSzjj;

			this.seriesData = [
				//   GDP 增长曲线
				{
					name: "GDP增长",
					...commonOption,
					itemStyle: {
						normal: {
							color: "#DFD97D",
							borderColor: "rgb(223,217,125,0.3)",
							borderWidth: 5,
						},
						emphasis: {
							borderColor: "rgb(223,217,125,0.3)",
							borderWidth: 8,
						},
					},
					data: lineData,
				},
				// 数字经济增长曲线
				{
					name: "数字经济增长曲线",
					...commonOption,
					itemStyle: {
						normal: {
							color: "#1BDA99",
							borderColor: "rgb(124,123,22,0.3)",
							borderWidth: 5,
						},
						emphasis: {
							borderColor: "rgb(223,217,125,0.3)",
							borderWidth: 8,
							// symbolSize: 7,
						},
					},
					data: lineData2,
				},
			];
			let option = {
				legend: {
					bottom: "8%",
					textStyle: {
						fontSize: 12,
						color: "#fff",
					},
					data: ["数字经济增长曲线", "GDP增长", "物联网", "大数据"],
				},
				grid: {
					top: 60,
					bottom: "25%",
					height:180,
					left: "10%",
					right: "10%",
				},
				tooltip: {
					show: true,
					trigger: "axis",
				},
				xAxis: {  // 数字经济产业发展情况
					name: "年份",
					nameTextStyle: nameTextStyleX,
					type: "category",
					axisTick: {
						show: true,
					},
					axisLabel,
					axisLine,
					data: yearsDate,
				},

				yAxis: [{
					name: "百分比",
					nameTextStyle: nameTextStyleY,
					color: "#B5C9FF",
					splitLine: {
						show: true,
						lineStyle: {
							color: "#24687F",
							type: "dashed",
						},
					},
					axisTick: {
						show: false,
					},
					axisLine: {
						show: false,
					},
					axisLabel,
					type: "value",
					max: 80,
					min: 0,
				},
				],

				tooltip: {
					trigger: "axis",
					formatter: function (params) {
						var relVal = params[0].name;
						for (var i = 0, l = params.length; i < l; i++) {
							relVal +=
									"<br/>" + params[i].seriesName + " : " + params[i].value + "%";
						}
						return relVal;
					},
				},
				series: this.seriesData,
			};

			myChart.setOption(option);
			window.addEventListener("resize", function () {
				myChart.resize();
			});
		}
		
		/**
		 * 企业发展情况
		 * @param {Object} yearsDate
		 * @param {Object} dataCompany
		 */
    	function renderDevelopLine(num, yearsDate, dataCompany) { 
    		
			let _this = this;
			
			let unit = ["亿元"]; 
			
			let labelNames = ["注册资本"];
			
			let numSize = "亿元";
			
			let numTitle = "注册资本";
			
				if(num == "0"){
					unit = ["亿元"];
					numSize = "亿元";
					labelNames = ["注册资本"];
					numTitle = "注册资本";
				}else if(num == "1"){
					unit = ["户"];
					numSize = "户";
					labelNames = ["市场主体总量"];
					numTitle = "市场主体总量";
				}else if(num == "2"){
					unit = ["户"];
					numSize = "户";
					labelNames = ["市场主体新增"];
					numTitle = "市场主体新增";
				}
			
			let myChart = echarts.init(document.querySelector(".companyeGrow"));
			
			// 基于准备好的dom，初始化echarts实例
			let icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAAA4CAYAAAAYeR0sAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTdFOEUxOTBERjVEMTFFQTk3MDM5RDkxMEVCMjg1MzQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTdFOEUxOTFERjVEMTFFQTk3MDM5RDkxMEVCMjg1MzQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBRkYwQ0E3RkRGNUMxMUVBOTcwMzlEOTEwRUIyODUzNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBRkYwQ0E4MERGNUMxMUVBOTcwMzlEOTEwRUIyODUzNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pk9UdREAAAGrSURBVHja7NxBboMwEIVhDCaiVW/XHjPna0oDdu3URtPBpKtgIv1PsgiEbPg0ZrIZM03vjYoJq01HUjc+rLnrzssFq6BewurVD+SRPDZGHW/Pfp4/xnAcI5wVN7ylyspAepF9weQaks0lgw0CyyUgp/BIHbD8ejqFSrvadNIXsDQaqQPWCLTeii98AcvzHqsK1oqi6eKy4iav0JyoOrJfVygbDqf6iqXp2Goy2BKPUXEuf7ZKt4RG01G34lzaDr0GK/33oq3fv6J8YYtcrpX+d7EF1q2ou2l5Rs+FCdiTBTDACGAEMMAIYAQwwAhgBDDACGAEMMAIYAQwwAhgBDDACGAEMMAIYAQwwAhgBDDACGAEMAIYYKQiGJPc6sT8910rTvS4HADrYN1zWI3fA+k4FVYsIruhK2cckTpVVkLzVr3PfFMeskj2A9MT3FZgXv0gV1cG9M16aBV5PJopoN3AnADawmIyTh0wI1xiprwlfoX1Km5ghOxxOkU5KfY7g10T2tCsB16CVe89JsfvfXbd+U/TMSa4U/M77k0HuH2w9DS3KbpErHjhR4ABAFfgf0w4R48pAAAAAElFTkSuQmCC";

	      	let labelStyle = {
		        show: true,
		        position: "top",
		        padding: [10, 25],
		        color: "#fff",
		        width: 100,
		        height: 35,
		        borderWidth: 1,
		        borderColor: "rgba(223,217,125,0.3)",
		        borderRadius: 1,
		        rich: {},
		        lineHeight: 20,
		        textStyle: {
					fontSize: 14,
					color: "#FFFF00",
					center: true,
					align: "center",
	        	},
		        backgroundColor: {
					image: icon,
					with: "100",
		        },
		        formatter: function (params) {
		        	
			        const { dataIndex } = params;
			        let index = labelNames.findIndex(
			            (item) => item === params.seriesName
			        );
			        let curUnit = unit[index];
			        const label = `${params.name}年${params.seriesName}\r\n{c2|${params.value}}${curUnit}`;
			        return label;
	        	},
	        rich: {
				c2: {
				fontSize: 18,
				fontWeight: "bold",
				fontFamily: "Microsoft YaHei",
				},
	        },
	        fontSize: 12,
	        fontWeight: "normal",
      	};
      	
      	let companyOption = {
	        grid: {
		        top: "15%",
		        bottom: "23%",
		        left: "10%",
		        right: "10%",
		        contain: true,
	        },
	        
	        tooltip: {
		        show: true,
		        trigger: "axis",
		        formatter: function () {
		            return "";
		        },
	        },
	        
	        xAxis: {
		        name: "年份",
		        nameTextStyle: nameTextStyleX,
		        type: "category",
		        axisTick: {
		        	show: true,
		        },
		        axisLabel,
		        axisLine,
		        data: yearsDate,
	        },

        yAxis: [{
        	
			name: unit,
			type: 'value',
			nameTextStyle: nameTextStyleY,
			color: "#B5C9FF",
			splitLine: {
				show: true,
				lineStyle: {
				color: "#24687F",
				type: "dashed",
				},
			},
			axisTick: {
				show: false,
			},
			axisLine: {
				show: false,
			},
			axisLabel,
				type: "value",
				
			}],
			
        series: [{
        	
            name: numTitle,
            type: "line",
            label: {
	            show: false,
	            emphasis: {
	            	...labelStyle,
	            },
            },
            smooth: false,
            symbol: "circle",
            symbolSize: 6,
            lineStyle: {
	            normal: {
	                width: 1,
	            },
            },
            itemStyle: {
              normal: {
                color: "#0CFEFF",
                borderColor: "rgb(27,218,153,0.3)",
                borderWidth: 5,
              },
              emphasis: {
                borderColor: "rgba(255,255,0,0.3)",
                borderWidth: 5,
                color: "#FFFF00",
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
	                0,
	                0,
	                0,
	                1,
	                [{
	                    offset: 0,
	                    color: "rgba(0,183,184,0.8)",
	                    },
	                    {
	                    offset: 1,
	                    color: "rgba(16,43,79,0.2)",
	                }],
	                false
                ),
              },
            },
            data: dataCompany.dataValues
          }],
      	};
      
	    myChart.setOption(companyOption);
	    
	    window.addEventListener("resize", function () {
	    	myChart.resize();
    	});
    }
    
    /**
     * 各区域经济排名
     * @param {Object} cityObject
     */
	function renderRankBar(cityObject) {
	    // 基于准备好的dom，初始化echarts实例
	    let dom = document.querySelector(".countyEstateRank");
	    
	    if (!dom) return;
	    
	    var myChart = echarts.init(dom);
	    let labelStyle = {
	        show: true,
	        position: "top",
	        padding: [10, 25],
	        color: "#fff",
	        rich: {},
	        lineHeight: 20,
	        textStyle: {
		        fontSize: 14,
		        color: "#fff",
		        center: true,
		        align: "center",
	        },
	        formatter: '{c}  {name|{a}}',
	        
	        rich: {
		        c2: {
		            fontSize: 16,
		            fontFamily: "Microsoft YaHei",
		        }
	        },
	        fontSize: 12,
	        fontWeight: "normal",
	      };
	      
	      let yData = cityObject.dataValues;
	      let xData = cityObject.dataNames;
	      
	      let option = {
	        // dataZoom,
	        tooltip: {
		        trigger: "axis",
		        formatter: "{b} : {c}%",
		        axisPointer: {
		        // 坐标轴指示器，坐标轴触发有效
		        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
		        },
	        },
	        
	        grid: {
		        top: "12%",
		        bottom: "45%",
		        left:"5%",
		        contain: true,
	        },
	        
	        xAxis: [{
	            name: "区域",
	            nameTextStyle: nameTextStyleX,
	            axisTick: {
	              show: false,
	            },
	            splitLine: {
	              show: false,
	            },
	            axisLine: {
	              lineStyle: {
	                color: "rgb(38, 93, 160)", //坐标轴的颜色
	              },
	            },
	            axisLabel: {
	              interval: 0,
	              textStyle: {
	                color: "rgb(143,187,206)",
	                // fontSize: 16,
	              },
	              rotate: 20 // 文本倾斜
	            },
	            type: "category",
	            data: xData,
	          }],
	        yAxis: [{
	            name: "亿元",
	            nameTextStyle: nameTextStyleY,
	            splitLine: {
		            show: true,
		            lineStyle: {
		                color: "#24687F",
		                type: "dashed"
		            }
	            },
	            
	            type: "value",
	
	            min: 0,
	            max: 100,
	            axisTick: {
	            	show: false,
	            },
	            axisLabel: {
		            textStyle: {
			            // fontSize: 16,
			            color: "rgb(143,187,206)", //坐标的字体颜色
		            },
	            	formatter: "{value} ",
	            },
	            axisLine: {
		            lineStyle: {
		                color: "rgb(38, 93, 160)", //坐标轴的颜色
		            },
	            },
	          },
	        ],
	        series: [{
	            type: "bar",
	            name: "亿",
	            data: yData,
	            barWidth: "20px",
	            label: {
		            show: false,
		            emphasis: { ...labelStyle },
	            },
	            // barGap: 0,
	            itemStyle: {
	            	color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
		                offset: 0,
		                color: "#0099FC",
	                },
	                {
		                offset: 1,
		                color: "#0EE3EF",
	                },
	            	]),
	            },
	        }],
	    };
	    
	    myChart.setOption(option);
	    window.addEventListener("resize", function () {
	        myChart.resize();
	    });
    }
	
	/**
	 * 地图数据交互
	 * @param {Object} dataObj 传入顶级菜单
	 */
	function renderMap(dataObj) {
		
		var basePara = {
			uploadedDataURL: "../../source/js/echartsModel/map/jxs.json",
			myChart: echarts.init(document.querySelector(".mapEcharts")),
			isReturn: false,
			data: dataObj
		}
		
		jxMap(basePara);
		
		//点击事件,根据点击某个省份计算出这个省份的数据
	    basePara.myChart.on('click', function (params) {
			
			if(window.companyMain.parent >= 1){
				basePara.data.forEach(function (item, index){
		    		if(params.name == item.AREA_NAME){
		    			
		    			window.companyMain.area = item.AREA_VALUE;
		    			//console.log("打印全局参数：" + JSON.stringify(window.companyMain));
		    			
		    			// 刷新页数据
		    			setMapRefresh();
		    			
		    		}
				})
				return false;
			}
			
	        switch(params.name) {
			    case "南昌市":
						basePara.uploadedDataURL = "../../source/js/echartsModel/map/360100.json";
			        break;
		        
		        case "九江市":
						basePara.uploadedDataURL = "../../source/js/echartsModel/map/jiujiang.json";
			        break;
			        
		        case "景德镇市":
						basePara.uploadedDataURL = "../../source/js/echartsModel/map/jingdezhen.json";
			        break;
			        
		        case "上饶市":
						basePara.uploadedDataURL = "../../source/js/echartsModel/map/shangrao.json";
			        break;
			        
		        case "鹰潭市":
						basePara.uploadedDataURL = "../../source/js/echartsModel/map/yingtan.json";
			        break;
			        
		        case "宜春市":
						basePara.uploadedDataURL = "../../source/js/echartsModel/map/yichun.json";
			        break;
			        
		        case "新余市":
						basePara.uploadedDataURL = "../../source/js/echartsModel/map/xinyu.json";
			        break;
			        
		        case "萍乡市":
						basePara.uploadedDataURL = "../../source/js/echartsModel/map/pingxiang.json";
			        break;
			        
		        case "吉安市":
						basePara.uploadedDataURL = "../../source/js/echartsModel/map/jian.json";
			        break;
			        
		        case "抚州市":
						basePara.uploadedDataURL = "../../source/js/echartsModel/map/fuzhou.json";
			        break;
			        
			   case "赣州市":
			        	basePara.uploadedDataURL = "../../source/js/echartsModel/map/ganzhou.json";
			}
	        
	        basePara.isReturn = true;
	        // 获取点击区域代码
	    	basePara.data.forEach(function (item, index){
	    		if(params.name == item.AREA_NAME){
	    			
	    			// 标注为区域后不可点击(0:省， 1:地区)
	    			window.companyMain.parent = 1;
	    			
	    			window.companyMain.area = item.AREA_VALUE;
	    			//console.log("打印全局参数：" + JSON.stringify(window.companyMain));
	    			
	    			// 刷新地图数据
	    			ajChilderMap(basePara);
	    			
	    			// 刷新页数据
	    			setMapRefresh();
	    			
	    		}
			})
	    });
	}
	
	function jxMap(basePara){
		
		var option = null;
		
		var conData = [];
		var conObj = {};
		basePara.data.forEach(function (item, index){
			conObj = {};
			conObj.name = item.AREA_NAME;
			conObj.value = item.entAllNum;
			conData.push(conObj);
		})
		
		var center = conData;
		
		$.get(basePara.uploadedDataURL, function(json) {
		    echarts.registerMap('js', json);
		    
    		option = {
				toolbox: {
			        feature: {
			            myTool1: {
			                show: basePara.isReturn,
			                title: '返回',
			                icon: "image://../../source/img/return.png",
			                
			                onclick: function (e){
			                	basePara.uploadedDataURL = "../../source/js/echartsModel/map/jxs.json";
			                	basePara.isReturn= false;
			                	window.companyMain.parent =	 0;
			                	window.companyMain.area = window.PROVINCE;
			                	
			                	//渲染地图
			                	jxMap(basePara);
			                	
			                	//刷新地图数据
			                	ajChilderMap(basePara);
			                	
			                	//刷新页面数据
			                	setMapRefresh();
			                }
			            }
			        },
			        itemSize:22
			    },
			    
    			tooltip: {
                trigger: 'item',
					formatter:function (params) {
						//产业排名
						//console.log(JSON.stringify(basePara.data[0]));
						
						var val0, val1, val2 = ''
						basePara.data.forEach(function(item, index){
							if(item.AREA_NAME == params.name){
								item.szjjMapData.forEach(function(v, i){
									switch(i) {
									    case 0:
									        	val0 = "<br>" + v.CHAIN_NAME + "：" + v.ENTTOTALSUM;
												val0 =  v.CHAIN_NAME + "：" + v.ENTTOTALSUM;
									        break;
									    // case 1:
									    //  		val1 = "<br>" + v.CHAIN_NAME + "：" + v.ENTTOTALSUM;
									    //     break;
								        // case 2:
									     		// val2 = "<br>" + v.CHAIN_NAME + "：" + v.ENTTOTALSUM;
									       //  break;
									} 
								})
							}
						})
						
						
						// var relDiv = "数字经济企业总数：" + params['value'] + val0 + val1 + val2;
						var relDiv =val0 ;
						return relDiv;
					}
	           },
		        visualMap: {
		            show: false,
		            max: 100,
		            seriesIndex: [3],
		            inRange: {
		                color: ['#A5DCF4', '#006edd']
		            }
		        },
		        geo: [{
		            map: 'js',
		            roam: false, //是否允许缩放
		            zoom: 1.2, //默认显示级别
		            scaleLimit: {
		                min: 0,
		                max: 3
		            }, //缩放级别
		            itemStyle: {
		                normal: {
		                    areaColor: '#013C62',
		                    shadowColor: '#072045',
		                    shadowBlur:0,
		                    shadowOffsetX: 6,
		                    shadowOffsetY: 10,
		                }
		            },
		            tooltip: {
		                show: false
		            }
		        }],
        		series: [
		            //地图
		            {
		                type: 'map',
		                mapType: 'js',
		                geoIndex: -1,
		                zoom: 1.2, //默认显示级别
		                label: {
		                    show: true,
		                    color: '#ffffff',
		                    emphasis: {
		                        color: 'white',
		                        show: false
		                    }
		                },
	                	itemStyle: {
	                		areaColor: 'red',
		                    normal: {
		                        borderColor: '#558bff',
		                        borderWidth: 1,
		                        areaColor: '#2e6ec7'
		                    },
		                    emphasis: {
		                        areaColor: '#0fdcf2',
		                        borderWidth: 0,
		                        color: 'green'
		                    }
	                	},
		                data: center
	            	}
        	]
    	};
    	basePara.myChart.setOption(option);
	});
	}
	
	/**
	 * 市区地图数据请求
	 */
	function ajChilderMap(pareData){
		var childrenData = {
				area: window.companyMain.area
				}
	    			
		$.ajax({
			type: "POST",
			url: BASE_URL + '/industryDistributionController/szjjMapData',
			data: {param: JSON.stringify(childrenData)},
			cache: false,
			success: function(res){
				var result = JSON.parse(res);
				if(result.status == 10001) {
					
					pareData.data = result.data.entlist;
					
					jxMap(pareData);
					//console.log("打印地图入参：" + JSON.stringify(basePara.data));
				    
				}else if(result.status == 10003) {
					localStorage.clear();
				}else{
				    this.$message.error(result.data.msg);
				}
	        }
		})
	}
	
	/**
	 * 刷新页面数据
	 */
	function setMapRefresh(){
		
		// 左上：产业发展情况
		switchFun(window.companyMain.PARENT_DL, window.companyMain.area);
		
		// 左下：企业发展情况
		companyFun("0", window.companyMain);
		
		
		// 中下：区域产业排名
		szjjByAreaList(window.companyMain);
		
		// 右下： 企业列表
		getEnterpriseList({page:"1", limit: window.wLimit, PARENT_DL:window.companyMain.PARENT_DL, AREA:window.companyMain.area});
	}