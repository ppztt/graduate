<template>
  <div v-show="route.name == 'company'">
    <div class="header">
      <div class="tools" ref="tools">
        <!-- 工具栏 -->
        <div class="tools_item">
            <el-input
                size="default"
                placeholder="请输入企业名称"
                v-model="searchObj.searchMsg"
                :clearable="true">
            </el-input>
        </div>
        <div class="tools_item">
            <el-select
                size="default"
                placeholder="省"
                :clearable="true"
                filterable
                v-model="searchObj.province"
                @change="provinceChange(searchObj.province)"
                @clear="clear('province')">
                <el-option
                    v-for="item in provinceList"
                    :value="item.name"
                    :key="item.code"
                    :label="item.name">
                </el-option>
            </el-select>
        </div>
        <div class="tools_item">
          <el-select
            size="default"
            placeholder="市"
            :clearable="true"
            filterable
            v-model="searchObj.city"
            @change="cityChange(searchObj.city)"
            @clear="clear('city')">
            <el-option
                v-for="item in cityList"
                :value="item.name"
                :key="item.code"
                :label="item.name">
            </el-option>
          </el-select>
        </div>
        <div class="tools_item">
          <el-select
            size="default"
            v-model="searchObj.district"
            placeholder="县/区"
            :clearable="true"
            @change="districtChange(searchObj.district)"
            @clear="clear('district')">
            <el-option
                v-for="item in districtList"
                :value="item.name"
                :key="item.code"
                :label="item.name">
            </el-option>
          </el-select>
        </div>
        <div class="tools_item">
          <el-select
            size="default"
            v-model="searchObj.town"
            placeholder="乡/镇"
            :clearable="true">
            <el-option
                v-for="item in townList"
                :value="item.name"
                :key="item.code"
                :label="item.name">
            </el-option>
          </el-select>
        </div>
        <div class="tools_item">
          <el-select
            size="default"
            placeholder="状态"
            v-model="searchObj.status">
            <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="list-header-btns">
        <div class="left">
          <el-button
            icon="Search"
            size="default"
            type="primary"
            @click="searchInfo"
          >
            查询
          </el-button>
        </div>
        <div class="right">
          <div class="item">
            <el-button
              icon="EditPen"
              size="default"
              type="primary"
              @click="showDialog"
            >
              录入
            </el-button>
          </div>
          <div class="item">
            <el-upload
              class="upload"
              :show-file-list="false"
              accept="xlsm"
              :before-upload="beforeUploadAction"
              :on-success="uploadSucAction"
              :on-error="uploadErrAction"
              :action="'/xwh/applicants/preImport.do?type=' + type"
            >
              <el-button
                icon="Download"
                size="default"
                type="primary"
                :disabled="!canImport"
                :title="!canImport ? '没有权限导入' : ''"
              >
                导入
              </el-button>
            </el-upload>
          </div>
          <div class="item">
            <el-dropdown
              @command="exportData"
              v-loading.fullscreen.lock="fullscreenLoading"
            >
              <el-button icon="Upload" size="default" type="primary">
                <!-- <img class="left" src="@/assets/images/1_20.png" alt /> -->
                导出
                <!-- <img class="right" src="@/assets/images/1_15.png" alt /> -->
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :command="''">导出全部</el-dropdown-item>
                  <el-dropdown-item :command="1" divided
                    >导出在期</el-dropdown-item
                  >
                  <el-dropdown-item :command="0" divided
                    >导出摘牌</el-dropdown-item
                  >
                  <el-dropdown-item :command="2" divided
                    >导出过期</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div class="item">
            <el-button
              icon="Folder"
              size="default"
              type="primary"
              @click="downLoadTemplate"
            >
              模板下载
            </el-button>
          </div>
          <div class="item">
            <el-button
              icon="Delete"
              size="default"
              type="danger"
              @click="deleteMoreConsumer"
            >
              删除
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <el-main class="container">
      <zt-table
        :loading="loading"
        :data="unitDataList"
        @select="addIDs"
        @select-all="addIDs"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange">
        <el-table-column
          fixed="left"
          width="60"
          type="selection"
          :align="'left'">
        </el-table-column>
        <el-table-column
          v-for="col in tableTitle"
          :key="col.id"
          :prop="col.id"
          :label="col.label"
          :width="col.width"
          :fixed="col.fixed">
          <template #default="{ row }">
            <span v-if="col.id === 'status'">{{ statusArr[row[col.id]] }}</span>
            <span v-else-if="col.id === 'validity'">
              <span>{{ row.startTime }}</span>
              <span v-if="row.startTime">~</span>
              <span>{{ row.endTime }}</span>
            </span>
            <span v-else-if="col.id === 'address'">
              <span>{{ row.province || "" }}</span>
              <span>{{ row.city || "" }}</span>
              <span>{{ row.district || "" }}</span>
              <span>{{ row.town || "" }}</span>
              <span>{{ row.address }}</span>
            </span>
            <span v-else>{{ row[col.id] || "--" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="350">
          <template #default="{ row }">
            <div style="display: flex;">
                <el-button
                    text
                    type="primary"
                    @click="openNew(1, row)">
                    查看
                </el-button>
                <el-button
                    text
                    type="primary"
                    @click="openNew(0, row)">
                    编辑
                </el-button>
                <el-button
                    text
                    type="primary"
                    @click="openNew(3, row)">
                    审核
                </el-button>
                <el-button
                    text
                    type="primary"
                    @click="openNew(2, row)">
                    摘牌
                </el-button>
                <el-button
                    text
                    type="danger"
                    @click="deleteConsumer(row.id)">
                    删除
                </el-button>
            </div>
          </template>
        </el-table-column>
      </zt-table>
    </el-main>
    <!-- 录入弹出框 -->
    <company-dialog ref="company" @getMockData="getMockData"></company-dialog>
  </div>
  <router-view v-show="route.name !== 'company'"></router-view>
</template>

<script setup lang="ts">
    import { columns, statusArr } from './config.js'
    import { onMounted, reactive, ref, getCurrentInstance } from "vue";
    import { useRoute } from "vue-router";
    import { searchType, pagination, regionType } from "@/type/company";
    import companyDialog from "./components/companyDialog.vue";

    const { proxy }: any = getCurrentInstance()
    const $api = proxy.$api

    const route = useRoute();
    const company = ref(null);
    const tableTitle = columns
    const statusList = [
    {
        id: 0,
        name: "全部",
    },
    {
        id: 1,
        name: "在期",
    },
    {
        id: 2,
        name: "过期",
    },
    {
        id: 3,
        name: "待审核",
    },
    {
        id: 4,
        name: "审核不通过",
    },
    ];
    // 搜索录入相关信息
    let searchObj: searchType = reactive({
    searchMsg: "",
    city: "",
    district: "",
    management: "",
    status: 0,
    });
    let type: string = "";
    let fullscreenLoading: boolean = false;
    let canImport: boolean = false;
    let unitDataList = ref([
    {
        address: "有迎福路527",
        applicationDate: "2024-03-21",
        city: "广州市",
        creditCode: "12440000455859567F",
        district: "天河区",
        principal: "雍某某",
        principalTel: "13267852536",
        province: "广东省",
        regName: "广东金融学院",
        town: "龙洞街道",
    },
    ]);
    let loading: boolean = false;
    let pagination: pagination = {
    size: 10,
    current: 1,
    total: 0,
    };
    let provinceList = ref<Array<regionType>>([])
    let cityList = ref<Array<regionType>>([])
    let districtList= ref<Array<regionType>>([])
    let townList= ref<Array<regionType>>([])

    // 函数区域
    const showDialog = () => {
        console.log(company.value);
        company.value.showDialog();
    };
    const searchInfo = () => {};
    const beforeUploadAction = () => {};
    const uploadSucAction = () => {};
    const uploadErrAction = () => {};
    const exportData = () => {};
    const downLoadTemplate = () => {};
    const deleteMoreConsumer = () => {};
    const addIDs = () => {};
    const handleSizeChange = () => {};
    const handleCurrentChange = () => {};
    const openNew = (num: number, row: Object) => {
        console.log(num, row);
    };
    const deleteConsumer = (num: number) => {
        console.log(num);
    };
    const renew = (row: Object) => {
        console.log(row);
    };
    const getMockData = () => {
    //   console.log(JSON.parse(localStorage.getItem("companyData")));
    //   unitDataList.value = [JSON.parse(localStorage.getItem("companyData"))];
    };
    const provinceChange = (val: string) => {
        const code: number | undefined = Number(provinceList.value.find((item: regionType) => item.name === val)?.code)
        getRegion('province', {
            province: Number((code + '').slice(0, 2))
        })
    }
    const cityChange = (val: string) => {
        const code: number | undefined = Number(cityList.value.find((item: regionType) => item.name === val)?.code)
        getRegion('city', {
            province: (code + '').slice(0, 2),
            city: (code + '').slice(2, 4)
        })
    }
    const districtChange = (val: string) => {
        const code: number | undefined = Number(districtList.value.find((item: regionType) => item.name === val)?.code)
        getRegion('district', {
            province: (code + '').slice(0, 2),
            city: (code + '').slice(2, 4),
            district: (code + '').slice(4, 6)
        })
    }
    const getRegion = async (type: string, assignParams = {}) => {
        const params: any = {
            province: '',
            city: '',
            district: '',
            ...assignParams
        }
        const res = await $api.Company.getRegion(params)
        switch (type) {
            case '':
                provinceList.value = res.data
                break;
            case 'province':
                cityList.value = [...res.data]
                break
            case 'city':
                districtList.value = [...res.data]
                break
            case 'district':
                townList.value = [...res.data]
                break
            default:
                break;
        }
    }
    const clear = (val: string) => {
        switch (val) {
            case 'province':
                provinceList.value = []
                cityList.value = []
                districtList.value = []
                townList.value = []
                break
            case 'city':
                cityList.value = []
                districtList.value = []
                townList.value = []
                break;
            case 'districtList':
                districtList.value = []
                townList.value = []
                break
            case 'town':
                townList.value = []
                break
            default:
                break;
        }
    }
    onMounted(() => {
        // getManagerType();
        getRegion('')
        getMockData();
    });
</script>

<style lang="scss" scoped>
.header {
  background: #fff;
  padding: 20px;
  .tools {
    display: flex;
    justify-content: space-between;
  }
}
.container {
  margin-top: 20px;
  background: #fff;
}

[v-cloak] {
  display: none;
}
.blue_btn {
  background: #5d7cc9 !important;
  color: #fff !important;
  border: 0;
}

.blue_btn:hover {
  background: #899ed1 !important;
  color: #fff !important;
  border: 0;
  outline: none;
}
.list-header-btns {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .right {
    display: flex;
    .item {
      margin-left: 15px;
    }
  }
}

.ivu-dropdown {
  margin-left: 0 !important;
}

.form-part {
  margin: 15px 0;
  font-size: 16px;
  font-weight: bold;
}

.submit-btns {
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-btns button:not(:last-child) {
  margin-right: 10px;
}

.el-select__tags {
  overflow-x: auto !important;
  flex-wrap: inherit !important;
}

.new {
  width: 30px;
  height: 20px;
  position: absolute;
  top: 0;
  left: 0;
}

.el-table__body-wrapper::-webkit-scrollbar {
  width: 18px;
  height: 18px;
}

.el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #dddee0;
  border-radius: 30px;
  border: 6px solid #fff;
}

.el-scrollbar__wrap::-webkit-scrollbar {
  width: 18px;
  height: 18px;
}

.el-pagination {
  text-align: right;
}

.el-notification {
  overflow: auto !important;
  max-height: 80% !important;
}

.el-button--primary:focus {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  background: #409eff;
}
</style>