var filePrefix = "./static/map-json/"  //本地
// var filePrefix = "./static/map-json/"    //线上
export function filePrefixFn() {
	return filePrefix
}
export function cityNameFn(name) {
	var city;
	switch(name) {
		case "长沙市":
			city = "430100.json";
			break;
		case "株洲市":
			city = "430200.json";
			break;
		case "湘潭市":
			city = "430300.json";
			break;
		case "衡阳市":
			city = "430400.json";
			break;
		case "邵阳市":
			city = "430500.json";
			break;
		case "岳阳市":
			city = "430600.json";
			break;
		case "常德市":
			city = "430700.json";
			break;
		case "张家界市":
			city = "430800.json";
			break;
		case "益阳市":
			city = "430900.json";
			break;
		case "郴州市":
			city = "431000.json";
			break;
		case "永州市":
			city = "431100.json";
			break;
		case "怀化市":
			city = "431200.json";
			break;
		case "娄底市":
			city = "431300.json";
			break;
		case "湘西土家族苗族自治州":
			city = "433100.json";
			break;
			
		//--------------1岳阳市start------------------
		
			case "华容县":
			  city = "430623.json";
			  break;
		case "君山区":
			city = "430611.json";
			break;
		case "岳阳县":
			city = "430621.json";
			break;
		case "岳阳楼区":
			city = "430602.json";
			break;
		case "云溪区":
			city = "430603.json";
			break;
		case "临湘市":
			city = "430682.json";
			break;
		case "湘阴县":
			city = "430624.json";
			break;
		case "汨罗市":
			city = "430681.json";
			break;
		case "平江县":
			city = "430626.json";
			break;
		//--------------岳阳市end------------------
		//--------------2衡阳市start------------------
		case "祁东县":
			city = "430426.json";
			break;
		case "衡阳县":
			city = "430421.json";
			break;
		case "衡阳县":
			city = "430421.json";
			break;
		case "衡山县":
			city = "430423.json";
			break;
		case "南岳区":
			city = "430412.json";
			break;
		case "衡东县":
			city = "430424.json";
			break;
		case "石鼓区":
			city = "430407.json";
			break;
		case "珠晖区":
			city = "430405.json";
			break;
		case "雁峰区":
			city = "430406.json";
			break;
		case "蒸湘区":
			city = "430408.json";
			break;
		case "衡南县":
			city = "430422.json";
			break;
		case "常宁市":
			city = "430482.json";
			break;
		case "耒阳市":
			city = "430481.json";
			break;
			//--------------衡阳市end------------------
			//--------------3永州市start------------------
		case "东安县":
			city = "431122.json";
			break;
		case "冷水滩区":
			city = "431103.json";
			break;
		case "祁阳县":
			city = "431121.json";
			break;
		case "零陵区":
			city = "431102.json";
			break;
		case "双牌县":
			city = "431123.json";
			break;
		case "宁远县":
			city = "431126.json";
			break;
		case "新田县":
			city = "431128.json";
			break;
		case "道县":
			city = "431124.json";
			break;
		case "江永县":
			city = "431125.json";
			break;
		case "江华瑶族自治县":
			city = "431129.json";
			break;
		case "蓝山县":
			city = "431127.json";
			break;
			//--------------永州市end------------------
			//--------------4常德市start------------------
		case "石门县":
			city = "430726.json";
			break;
		case "澧县":
			city = "430723.json";
			break;
		case "临澧县":
			city = "430724.json";
			break;
		case "津市市":
			city = "430781.json";
			break;
		case "安乡县":
			city = "430721.json";
			break;
		case "桃源县":
			city = "430725.json";
			break;
		case "鼎城区":
			city = "430703.json";
			break;
		case "汉寿县":
			city = "430722.json";
			break;
		case "武陵区":
			city = "430702.json";
			break;
			//--------常德市end------------------
			//--------------5张家界市start------------------
		case "桑植县":
			city = "430822.json";
			break;
		case "慈利县":
			city = "430821.json";
			break;
		case "武陵源区":
			city = "430811.json";
			break;
		case "永定区":
			city = "430802.json";
			break;
			//--------张家界市end------------------
			//--------------6湘西土家族苗族自治州start------------------
		case "龙山县":
			city = "433130.json";
			break;
		case "永顺县":
			city = "433127.json";
			break;
		case "保靖县":
			city = "433125.json";
			break;
		case "古丈县":
			city = "433126.json";
			break;
		case "花垣县":
			city = "433124.json";
			break;
		case "吉首市":
			city = "433101.json";
			break;
		case "泸溪县":
			city = "433122.json";
			break;
		case "凤凰县":
			city = "433123.json";
			break;
			//--------湘西土家族苗族自治州end------------------
			//--------------7益阳市start------------------
		case "南县":
			city = "430921.json";
			break;
		case "沅江市":
			city = "430981.json";
			break;
		case "资阳区":
			city = "430902.json";
			break;
		case "赫山区":
			city = "430903.json";
			break;
		case "桃江县":
			city = "430922.json";
			break;
		case "安化县":
			city = "430923.json";
			break;
			//--------益阳市end------------------
			//--------------8怀化市start------------------
		case "沅陵县":
			city = "431222.json";
			break;
		case "辰溪县":
			city = "431223.json";
			break;
		case "溆浦县":
			city = "431224.json";
			break;
		case "麻阳苗族自治县":
			city = "431226.json";
			break;
		case "鹤城区":
			city = "431202.json";
			break;
		case "中方县":
			city = "431221.json";
			break;
		case "新晃侗族自治县":
			city = "431227.json";
			break;
		case "芷江侗族自治县":
			city = "431228.json";
			break;
		case "洪江市":
			city = "431281.json";
			break;
		case "会同县":
			city = "431225.json";
			break;
		case "靖州苗族侗族自治县":
			city = "431229.json";
			break;
		case "通道侗族自治县":
			city = "431230.json";
			break;
			//--------怀化市end------------------
			//--------------9娄底市start------------------
		case "新化县":
			city = "431322.json";
			break;
		case "冷水江市":
			city = "431381.json";
			break;
		case "涟源市":
			city = "431382.json";
			break;
		case "娄星区":
			city = "431302.json";
			break;
		case "双峰县":
			city = "431321.json";
			break;
			//--------娄底市end------------------
			//--------------10长沙市start------------------
		case "宁乡县":
			city = "430124.json";
			break;
		case "望城区":
			city = "430112.json";
			break;
		case "岳麓区":
			city = "430104.json";
			break;
		case "开福区":
			city = "430105.json";
			break;
		case "芙蓉区":
			city = "430102.json";
			break;
		case "天心区":
			city = "430111.json";
			break;
		case "雨花区":
			city = "430103.json";
			break;
		case "长沙县":
			city = "430121.json";
			break;
		case "浏阳市":
			city = "430181.json";
			break;
			//--------长沙市end------------------
			//--------------11湘潭市start------------------
		case "湘乡市":
			city = "430381.json";
			break;
		case "韶山市":
			city = "430382.json";
			break;
		case "湘潭县":
			city = "430321.json";
			break;
		case "雨湖区":
			city = "430302.json";
			break;
		case "岳塘区":
			city = "430304.json";
			break;
			//--------湘潭市end------------------
			//--------------12株洲市start------------------
		case "石峰区":
			city = "430204.json";
			break;
		case "荷塘区":
			city = "430202.json";
			break;
		case "天元区":
			city = "430211.json";
			break;
		case "芦淞区":
			city = "430203.json";
			break;
		case "株洲县":
			city = "430221.json";
			break;
		case "醴陵市":
			city = "430281.json";
			break;
		case "攸县":
			city = "430223.json";
			break;
		case "茶陵县":
			city = "430224.json";
			break;
		case "炎陵县":
			city = "430225.json";
			break;
			//--------株洲市end------------------
			//--------------13邵阳市start------------------
		case "邵东县":
			city = "430521.json";
			break;
		case "新邵县":
			city = "430522.json";
			break;
		case "双清区":
			city = "430502.json";
			break;
		case "北塔区":
			city = "430511.json";
			break;
		case "大祥区":
			city = "430503.json";
			break;
		case "邵阳县":
			city = "430523.json";
			break;
		case "隆回县":
			city = "430524.json";
			break;
		case "洞口县":
			city = "430525.json";
			break;
		case "武冈市":
			city = "430581.json";
			break;
		case "新宁县":
			city = "430528.json";
			break;
		case "绥宁县":
			city = "430527.json";
			break;
		case "城步苗族自治县":
			city = "430529.json";
			break;
			//--------邵阳市end------------------
			//--------------14郴州市start------------------
		case "安仁县":
			city = "431028.json";
			break;
		case "永兴县":
			city = "431023.json";
			break;
		case "桂东县":
			city = "431027.json";
			break;
		case "汝城县":
			city = "431026.json";
			break;
		case "资兴市":
			city = "431081.json";
			break;
		case "宜章县":
			city = "431022.json";
			break;
		case "苏仙区":
			city = "431003.json";
			break;
		case "北湖区":
			city = "431002.json";
			break;
		case "桂阳县":
			city = "431021.json";
			break;
		case "嘉禾县":
			city = "431024.json";
			break;
		case "临武县":
			city = "431025.json";
			break;
		case "宜章县":
			city = "431022.json";
			break;
			//--------郴州市end------------------
	}
	return city
}
































































































