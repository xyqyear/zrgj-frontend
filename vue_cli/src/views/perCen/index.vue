<template>
    <div class="perInfo">
        <el-card :body-style="{ padding: '10px 20px'}">
            <div class="card-title">
                <img class="image" src="../../assets/images/restaurant.jpg">
                <div class="right-format">
                    <p>饭店名称：餐饮管理有限公司xx分店</p>
                    <p>饭店电话：15712987878</p>
                    <p>饭店地址：重庆市渝北区华山南路16号</p>
                    <p>饭店简介：中餐、西餐、小吃、酒水饮料</p>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
export default ({
    name:'perCen',
    data(){
        return {}
    }
})
</script>
<style lang="scss" scopedSlots>
.card-title{
    display: flex;
    align-items: center;
}
.image{
    width: 200px;
    min-height: 100%;
    margin-right: 16px;
    border-radius: 5px;
}
.right-format{
    display: flex;
    text-align: left;
    flex-direction: column;
    line-height: 30px;
}
</style>