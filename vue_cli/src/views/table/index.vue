<template>
    <el-row  :gutter="30" type="flex" class="row-bg" justify="space-around">
        <el-col v-for="rows in branchData" :key="rows" :span="6">
            <div class="grid-content bg-purple">
                <el-card v-for="item in rows" :key="item.name" :body-style="{ display: 'flex', padding: '50px'}">
                    <div class="info">
                        <p class="floor">{{item.floor}}</p>
                        <p class="tableNum">{{item.tableNum}}</p>
                        <p class="tableMoney">{{item.tableMoney}}</p>
                    </div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>  
<script>
export default ({
    name:'table',
    data(){
        return {
            spotData:[
                {
                    name:'11',
                    floor:'一楼',
                    tableNum:'1号桌',
                    tableMoney:''
                },
                {
                    name:'12',
                    floor:'一楼',
                    tableNum:'2号桌',
                    tableMoney:''
                },
                {
                    name:'13',
                    floor:'一楼',
                    tableNum:'3号桌',
                    tableMoney:''
                },
                {
                    name:'14',
                    floor:'一楼',
                    tableNum:'4号桌',
                    tableMoney:''
                },
                {
                    name:'15',
                    floor:'一楼',
                    tableNum:'5号桌',
                    tableMoney:''
                },
                {
                    name:'16',
                    floor:'一楼',
                    tableNum:'6号桌',
                    tableMoney:''
                },
                {
                    name:'21',
                    floor:'二楼',
                    tableNum:'1号桌',
                    tableMoney:'566'
                },
                {
                    name:'22',
                    floor:'二楼',
                    tableNum:'2号桌',
                    tableMoney:'1352'
                },
                {
                    name:'23',
                    floor:'二楼',
                    tableNum:'3号桌',
                    tableMoney:'47'
                },
                {
                    name:'24',
                    floor:'二楼',
                    tableNum:'4号桌',
                    tableMoney:'89'
                },
                {
                    name:'25',
                    floor:'二楼',
                    tableNum:'5号桌',
                    tableMoney:'650'
                },
                {
                    name:'26',
                    floor:'二楼',
                    tableNum:'6号桌',
                    tableMoney:''
                },
                {
                    name:'27',
                    floor:'二楼',
                    tableNum:'7号桌',
                    tableMoney:''
                },
                {
                    name:'28',
                    floor:'二楼',
                    tableNum:'8号桌',
                    tableMoney:''
                },
                {
                    name:'29',
                    floor:'二楼',
                    tableNum:'9号桌',
                    tableMoney:''
                },
            ],
            branchData: []
        }
    },
    mounted() {
        this.getRow();
    },
    methods: {
        getRow(){
            let arr = [];
            let row = Math.ceil(this.spotData.length / 6);
            for (let i = 0; i < row; i++){
                arr[i] = [];
                let tableLast = this.spotData.length % 6 === 0 ? 6 : this.spotData.length % 6;
                let lastRow = i === (row - 1) ? tableLast : 6;
                for (let j = 0; j < lastRow; j++){
                    arr[i][j] = this.spotData[6 * i + j];
                }
            }

            this.branchData = arr;
        }
    },
})
</script>
