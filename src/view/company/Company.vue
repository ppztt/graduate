<template>
  <div v-if="route.name == 'company'">
    <div class="header">
      <div class="tools" ref="tools">
        <!-- 工具栏 -->
        <div class="tools_item">
            <el-input
                size="default"
                placeholder="请输入企业名称"
                v-model="searchObj.regName"
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
              accept="xlsx"
              :http-request="uploadFile">
              <el-button
                icon="Download"
                size="default"
                type="primary">
                导入
              </el-button>
            </el-upload>
          </div>
          <div class="item">
            <el-dropdown @command="exportData">
              <el-button icon="Upload" type="primary">
                导出
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :command="''">导出全部</el-dropdown-item>
                  <el-dropdown-item :command="1" divided>导出正常</el-dropdown-item>
                  <el-dropdown-item :command="2" divided>导出过期</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div class="item">
            <el-button
              icon="Folder"
              type="primary"
              @click="downLoadTemplate">
              模板下载
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <zt-table
      :loading="loading"
      :data="unitDataList"
      :pagination="pagination"
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
          <span v-if="col.id === 'validity'">
            <span>{{ row.startTime || '--' }}</span>
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
          <span v-else-if="col.id === 'status'">
            {{ statusMap[row[col.id]] || "--" }}
          </span>
          <span v-else-if="['create_time', 'update_time'].includes(col.id)">
            {{ formatDate(row[col.id], 'yyyy-MM-dd hh:mm:ss') || "--" }}
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
                  @click="openNew(0, row)">
                  查看
              </el-button>
              <el-button
                  text
                  type="primary"
                  @click="openNew(1, row)">
                  编辑
              </el-button>
              <el-button
                  text
                  type="primary"
                  @click="openNew(3, row)">
                  审核
              </el-button>
              <el-popconfirm
                cancel-button-text="取消"
                confirm-button-text="确认"
                title="是否确定删除?"
                @confirm="deleteConsumer(row.id)">
                <template #reference>
                  <el-button text type="danger">删除</el-button>
                </template>
              </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </zt-table>
    <!-- 录入弹出框 -->
    <company-dialog ref="company" @getData="getData"></company-dialog>
  </div>
  <router-view v-else></router-view>
</template>

<script setup lang="ts">
    import * as XLSX from 'xlsx'
    import { columns, statusMap } from './config.js'
    import { onMounted, reactive, ref, getCurrentInstance } from "vue";
    import { useRoute } from "vue-router";
    import { searchType, regionType } from "@/type/company";
    import {paginationType} from '@/type/common'
    import companyDialog from "./components/companyDialog.vue";
    import { formatDate, downLoad } from '@/utils/index.ts'
    import router from '@/router';

    const { proxy }: any = getCurrentInstance()
    const $api = proxy.$api
    const $success = proxy.$success
    const $error = proxy.$error

    const route = useRoute();
    const company = ref<any>(null);
    const paramsMap = {
      '经营者注册名称': 'regName',
      '社会统一信用代码': 'creditCode',
      '所属省份': 'province',
      '所属城市': 'city',
      '所属区/县': 'district',
      '所属城镇': 'town',
      '详细地址': 'address',
      '负责人姓名': 'charge_person_name',
      '负责人身份证号': 'charge_person_code',
      '负责人联系方式': 'charge_person_tel'
    }
    const tableTitle = columns
    const statusList = [
      {
        id: '',
        name: '全部'
      },
      {
          id: 'normal',
          name: "正常",
      },
      {
          id: 'expired',
          name: "过期",
      }
    ];
    // 搜索录入相关信息
    let searchObj: searchType = reactive({
        regName: "",
        province: '',
        city: "",
        district: "",
        town: '',
        management: "",
        status: '',
    })
    let fullscreenLoading: boolean = false;
    let unitDataList = ref<any>([]);
    let loading= ref<Boolean>(false);
    let pagination = ref<paginationType>({
      size: 10,
      current: 1,
      count: 0,
    })
    let provinceList = ref<Array<regionType>>([])
    let cityList = ref<Array<regionType>>([])
    let districtList= ref<Array<regionType>>([])
    let townList= ref<Array<regionType>>([])

    // 函数区域
    const getData = async (assignParams: any = {}) => {
      loading.value = true
      const params = {
        page: pagination.value.current,
        size: pagination.value.size,
        ...assignParams
      }
      try {
        const res = await $api.Company.getCompany(params)
        if (res.result) {
          unitDataList.value = [
            ...res.data
          ]
          pagination.value.count = res.count
          loading.value = false
        }
      } catch (error) {
        
      }
    }
    const searchInfo = () => {
      const params: any = {
        ...searchObj
      }
      getData(params)
    }
    const showDialog = () => {
        if(!company.value) return
        company.value.showDialog()
    };
    const addCompany = async (params: Array<Object>) => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '')
        const res = await $api.Company.addCompany({account: userInfo.name, ...params})
        if (res.result) {
          $success('添加成功')
          getData()
        }
      } catch (error) {
        console.log(error)
      }
    }
    const uploadFile = (e: any) => {
        // 获取文件信息
        const files = e.file
        // js读取文件API实体对象
        const fileReader = new FileReader()
        fileReader.onload = (e: any) => {
            try {
                // 使用xlsx库解析excel文件
                const res = XLSX.read(e.target.result, {type: 'binary'})
                let list: Array<Array<any>> = XLSX.utils.sheet_to_json(res.Sheets['Sheet1'], {header: 1})
                const keys: Array<string> = Object.keys(paramsMap)
                // 需要对比excel文件的标题是否符合规范, 所有标题都能对应上才为true
                const bol = keys.every((key: string, index: number) => {
                  // 使用该配置出来的list第一个数据为标题行
                  return key === list[0][index]
                })
                if (!bol) {
                  $error('请使用模板文件进行导入！')
                } else {
                  const key = Object.values(paramsMap)
                  // 将标题行数据去除
                  list.splice(0, 1)
                  // 遍历获取key: value 对象
                  const params: Array<Object> = list.map((item: any) => {
                    const obj: any = {}
                    key.forEach((k: string ,i: number)=> {
                      obj[k] = item[i]
                    })
                    return obj
                  })
                  // 执行添加企业函数
                  addCompany(params)
                }
            } catch (error) {
                
            }
        }
        fileReader.readAsBinaryString(files)
    }
    const exportData = () => {
    };
    const downLoadTemplate = () => {
      $api.Company.getModelFile({}, {responseType: 'blob'}).then((res: any) => {
        downLoad(res, 'model.xlsx')
      })
    }
    const addIDs = () => {};
    const handleSizeChange = (val: number) => {
      pagination.value.current = 1
      pagination.value.size = val
      getData()
    };
    const handleCurrentChange = (page: number) => {
      pagination.value.current = page
      getData()
    };
    const openNew = (num: number, row: any) => {
        router.push({
          name: 'companyDetails',
          query: {
            id: row.id,
            isEdit: num
          }
        })
    };
    const deleteConsumer = async (id: number) => {
        try {
          const res = await $api.Company.delCompany(id)
          if (res.result) {
            $success(res.message)
            getData()
          } else {
            $error(res.message)
          }
        } catch (error) {
          console.log(error)
        }
    }
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
        getData()
        getRegion('')
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