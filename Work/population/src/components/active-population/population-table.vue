<template>
	<div id="carTable">
		<div class="tablebox" id="tablebox2" v-if="!isshownodata">
			<table border="1" cellspacing="1" cellpadding="1">
				<tr>
					<th v-for="(item, index) in thcontent">{{item}}</th>
				</tr>
				<tr v-for="(item,index) in data">
					<td>{{item.region_name}}</td>
					<td>{{item.popu_dense}}</td>
					<td>{{item.popu_num}}</td>
				</tr>
			</table>
		</div>
		<no-data :style="{height:height+'rem'}" v-if="isshownodata"/>
	</div>
</template>

<script>
	import noData from '../../base/no-data/no-data'
	export default {
		name: 'carTable',
		data() {
			return {
				thcontent: ['区域名称', '人口密度（人/km²）', '人口数量'],
				data: [],
      	isshownodata:false,
			}
		},
		props: ['dataList', "flag", "height", ],
		watch: {
			dataList(val) {
				if(val && val.length) {
					this.$nextTick(() => {
					var dom = document.getElementById("tablebox2");
					dom.style.height = (this.height - 0.2) + "rem"
				});
					this.isshownodata = false
				}else {
					this.isshownodata = true
				}
				if(this.flag == 1) {
					this.data = (this.dataList || []).slice(0, 5)
				} else {
					this.data = this.dataList
				}
			},
		},
		computed: {},
		mounted() {
			this.$nextTick(() => {
				var dom = document.getElementById("tablebox2");
				dom.style.height = (this.height - 0.2) + "rem"
			});
			if(this.flag == 1) {
				this.data = (this.dataList || []).slice(0, 5)
			} else {
				this.data = this.dataList
			}
		},
		components: {
			noData
		},
		methods: {},
	};
</script>

<style lang="scss" scoped>
	#carTable {
		.tablebox {
			width: 100%;
			background-size: contain;
			font-size: 14px;
			overflow-y: scroll;
			margin-top: 20px;
			overflow-y: scroll;
			&::-webkit-scrollbar {
				width: 4px;
				height: 4px;
			}
			&::-webkit-scrollbar-track {
				box-shadow: 0px 0px 3px #038fb2 inset;
				border-radius: 10px;
				background: #038fb2;
				width: 2px;
			}
			&::-webkit-scrollbar-thumb {
				border-radius: 10px;
				background: #038fb2;
			}
			table {
				width: 100%;
				tr {
					&:nth-child(odd) {
						background-color: rgba($color: #ffffff, $alpha: 0.05);
					}
				}
				th {
					padding: 14px;
					background-color: #293a4c;
					color: #00b5ff;
				}
				td {
					padding: 14px;
					text-align: center;
				}
			}
		}
	}
</style>
