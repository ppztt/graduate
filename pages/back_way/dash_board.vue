<template>
  <div>
    <div class="dataBox">
      <div class="total">
        <p>监督对象</p>
        <span>2121 &nbsp;</span>个
      </div>
      <div class="Acomplain">
        <p>总投诉</p>
        <span>2121 &nbsp;</span>个
      </div>
      <div class="complained">
        <p>已处理投诉</p>
        <span>2121 &nbsp;</span>个
      </div>
      <div class="complaining">
        <p>未处理投诉</p>
        <span>2121 &nbsp;</span>个
      </div>
    </div>
    <div class="charts">
      <div class="pie">
        <Pie />
      </div>
      <div class="line">
        <Line/>
      </div>
    </div>
  </div>
</template>

<script setup>

definePageMeta({
  title: '数据中心'
})
</script>
<style scoped lang="scss">
.dataBox {
  margin-bottom: 20px;
  width: 100%;
  min-width: 700px;
  height: 200px;
  background: #fff;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 30px;
  display: flex;

  div {
    box-sizing: border-box;
    flex: 1;
    min-width: 140px;
    border-radius: 15px;
    margin-right: 25px;
    padding: 20px;
    width: 220px;
    height: 130px;
    background: #edf2fe;
    color: #25489b;
    font-weight: 700;

    span {
      margin-top: 15px;
      display: inline-block;
      font-size: 26px;
    }
  }

  .Acomplain {
    background: #fbedd4;
    color: #be5900;
  }

  .complained {
    background: #d5f9fa;
    color: #138261;
  }

  .complaining {
    background: #ffebe9;
    margin-right: 0;
    color: #c2453c;
  }
}
.charts {
  display: flex;
  width: 100%;
  height: calc(100vh - (250px + 60px)px);
  

  .pie {
    width: 500px;
    min-width: 500px;
    height: 400px;
    padding-top: 20px;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 15px;
  }

  .line {
    width: calc(100% - 520px);
    min-width: calc(100% - 550px);
    height: 400px;
    padding: 10px;
    padding-top: 20px;
    margin-left: 20px;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 15px;
  }
}
</style>