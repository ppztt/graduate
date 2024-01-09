data() {
    return {
        fullscreenLoading: false,
        loading: true,
        // 用户信息临时
        userInfo: {
            // 页面跳转
            action: "",
            account: "测试",
            address: null,
            city: "",
            createTime: "2023-01-10 03:59:30",
            creditCode: null,
            district: "",
            email: "",
            id: 177,
            management: null,
            newPassword: null,
            password: "52f24ccfeef7e6a0f4a17fbc45647361ebb06a839ec6172064a2167299e33d1d",
            phone: "13922108999",
            principal: null,
            principalTel: null,
            province: null,
            realname: "魏",
            roleId: 1,
            roleName: null,
            storeName: null,
            town: null,
            updateTime: "2023-01-10 03:59:30",
            usertype: 1,
            zipcode: ""
        },
        action: "",
        modalType: 1,
        isShowEnteringModal: false,
        // 开始结束日期限制
        pickerBeginDate: {
            disabledDate: (time) => {
                if (this.endTime) {
                    return (
                        time.getTime() >= new Date(this.endTime).getTime()
                    );
                }
            }
        },
        //结束日期限制
        pickerEndDate: {
            disabledDate: (time) => {
                if (this.startTime) {
                    return (
                        time.getTime() <= new Date(this.startTime).getTime()
                    );
                }
            }
        },
        // 弹出框数据
        formData: {
            regName: "",
            storeName: "",
            platform: "",
            onlineName: "",
            city: "",
            district: "",
            address: "",
            addrs: [],
            creditCode: "",
            management: "",
            details: "",
            principal: "",
            principalTel: "",
            contents1: "不提供假冒伪劣商品，不提供“三无”产品，不提供不合格商品，不提供来源不明商品，不提供过期商品，不提供缺陷商品，不提供侵犯知识产权商品。",
            contents2: "不作虚假宣传，不搞低价诱导；恪守服务承诺，履行合同约定；明码实价，明白消费；守法经营，诚信待客。",
            contents3: "履行保护消费者权益第一责任，提供便捷售后服务，高效处理消费纠纷，承担先行赔付和首问责任。",
            applicationDate: "",
        },
        formrules: {
            regName: [{ required: true, message: '经营者注册名称不能为空', trigger: 'blur' }],
            creditCode: [{ required: true, message: '统一社会信用代码不能为空，且为18位', trigger: 'blur' },
            { min: 18, max: 18, message: '统一社会信用代码应为18位', trigger: 'blur' }],
            onlineName: [{ required: true, message: '网店名称不能为空', trigger: 'blur' }],
            platform: [{ required: true, message: '所属平台不能为空', trigger: 'blur' }],
            storeName: [{ required: true, message: '门店名称不能为空', trigger: 'blur' }],
            addrs: [{ required: true, message: '经营场所不能为空', trigger: 'blur' }],
            management: [{ required: true, message: '经营类别不能为空', trigger: 'blur' }],
            details: [{ required: true, message: '详细类别不能为空', trigger: 'blur' }],
            principal: [{ required: true, message: '负责人姓名不能为空', trigger: 'blur' }],
            principalTel: [{ required: true, message: '手机号码不能为空', trigger: 'blur' },
            { pattern: /^1[3|5|7|8|9]\d{9}$/, message: "请输入正确的手机号", trigger: "blur" }],
        },
        districtDataArr: [],
        textList: {
            edit: "编辑",
            check: "查看",
            delist: "摘牌",
            audit: "审核",
        },
        activeManageType: [
            // 当前经营类别数据
        ],
        // 经营类别
        manageType: {
            commodities: [],
            services: [],
        },
        auditColumns: [
            {
                title: "审核单位",
                key: "name",
            },
            {
                title: "审核意见",
                key: "contents",
            },
            {
                title: "审核状态",
                key: "status",
            },
            {
                title: "审核时间",
                key: "createTime",
            },
        ],
        statusInfo: [
            { id: "1", value: "在期" },
            { id: "0", value: "摘牌" },
            { id: "2", value: "过期" },
            { id: "3", value: "过渡期" },
            { id: "4", value: "待审核" },
            { id: "5", value: "县级审核通过" },
            { id: "6", value: "行业协会审核通过" },
            { id: "7", value: "审核不通过" },
            { id: "8", value: "行业协会审核不通过" }
        ],
        management: "",
        dialogVisible: false, // 导入弹窗
        isShowComfirm: false, //显示弹窗
        comfirmContent: "", //弹窗内容
        uploadId: null,
        // ----
        // 搜索关键字
        searchMsg: "",
        startTime: "", // 开始时间
        endTime: "", // 结束时间
        // 城市级联工具
        city: "", //市
        district: "", //县
        town: "", //镇
        regionSelect: [], //地区选中
        regionData: [], //地区数据 一级市数据
        // cityData: [], //市数据
        districtData: [], //某市县数据
        townData: [], //某县镇数据
        status: "",
        statusData: [],
        // 表格
        tableHeight: null, //表格高度
        current: 1, //当前页
        size: 10, //每页页数
        total: 0, //总数
        columns: [
            {
                type: "selection",
                width: 60,
                align: "left",
                fixed: "left",
            },
            {
                title: "经营者注册名称",
                key: "regName",
                slot: "regName",
                fixed: "left",
                minWidth: 200,
                align: "left",
            },
            {
                title: "申请来源",
                key: "createType",
                minWidth: 200,
                align: "left",
            },
            {
                title: "创建人",
                key: "account",
                minWidth: 200,
                align: "left",
            },
            {
                title: "门店名称",
                key: "storeName",
                minWidth: 200,
                align: "left",
            },
            {
                title: "经营场所地址",
                key: "address",
                minWidth: 200,
                align: "left",
            },
            {
                title: "状态",
                key: "status",
                slot: "status",
                minWidth: 80,
                align: "left",
            },
            {
                title: "有效期",
                slot: "validity",
                minWidth: 170,
                align: "left",
            },
            {
                title: "创建时间",
                key: "createTime",
                minWidth: 200,
                align: "left",
            },
            {
                title: "通过时间",
                key: "startTime",
                minWidth: 100,
                align: "left",
            },
            {
                title: "统一社会信用代码",
                key: "creditCode",
                minWidth: 200,
                align: "left",
            },
            {
                title: "经营类别",
                key: "management",
                minWidth: 130,
                align: "left",
            },
            {
                title: "详细类别",
                key: "details",
                minWidth: 210,
                align: "left",
            },
            {
                title: "负责人",
                key: "principal",
                minWidth: 120,
                align: "left",
            },
            {
                title: "手机号码",
                key: "principalTel",
                minWidth: 140,
                align: "left",
            },

            {
                title: "操作",
                key: "action",
                slot: "action",
                fixed: "right",
                minWidth: 350,
                align: "left",
            },
        ],
        unitDataList: [],
        // --------
        isShowRemove: false,
        removeType: "one", //删除方式 all one
        idActive: null, //当前id
        selectDataList: [], //删除列表
        isShowEnteringModal: false,
        allowFiles: [".xlsm"],
        conditions: [],
        conditionList: [],
        dataList: [], //消费者列表
        selectionList: [],//消费者列表选中
        total: 0, //总记录数量
        pageSize: 10, //页面数量
        currentPage: 1, //初始页
        manager: ms.manager,
        // 详细类别
        manageType: {},
        // 被选中的类别的详细类别
        activeManageType: [],
        loading: true,//加载状态
        emptyText: '',//提示文字
        // 级联选
        canImport: true,
        // 消费者 1 无承诺 2
        type: "1",
        details: "",
        // 被删除的id
        ids: { ids: [] },
        isDown: false,
        searchMessage: {}
    }
},
methods: {
    // 关闭弹出框
    closeEnteringModal() {
        this.formData = {
            regName: "",
            storeName: "",
            platform: "",
            onlineName: "",
            city: this.userInfo.city,
            district: this.userInfo.district,
            address: "",
            addrs: [],
            creditCode: "",
            management: "",
            details: "",
            principal: "",
            principalTel: "",
            contents1: "不提供假冒伪劣商品，不提供“三无”产品，不提供不合格商品，不提供来源不明商品，不提供过期商品，不提供缺陷商品，不提供侵犯知识产权商品。",
            contents2: "不作虚假宣传，不搞低价诱导；恪守服务承诺，履行合同约定；明码实价，明白消费；守法经营，诚信待客。",
            contents3: "履行保护消费者权益第一责任，提供便捷售后服务，高效处理消费纠纷，承担先行赔付和首问责任。",
            applicationDate: "",
        }
        this.formData.addrs.push({
            city: this.userInfo.city,
            district: this.userInfo.district,
            address: ""
        })
        this.$refs['formApply'].resetFields()
    },
    currentChange: function (v) {
        this.current = v;
        let info = {
            ...this.searchMessage,
            current: this.current
        }
        this.debounce(this.getUnitList(info), 1000)
    },
    // 防抖
    debounce(fun, wait = 1500) {
        let timeout = null
        return function () {
            if (timeout) {//如果存在定时器就清空
                clearTimeout(timeout)
            }
            timeout = setTimeout(function () {
                fun()
            }, wait)
        }
    },
    sizeChange: function (v) {
        this.size = v;
        this.current = 1
        let info = {
            ...this.searchMessage,
            size: this.size
        }
        this.debounce(this.getUnitList(info), 1000)
    }
            ,
    changeStartTime(value) {
        this.startTime = value;
    },
    changeEndTime(value) {
        this.endTime = value;
    },
    clear(index = 0) {
        this.district = "";
        this.formData.district = ""
        this.formData.addrs[index].district = ""
    },
    cityChange: function (name, index) {
        // 一级市发生改变
        if (name) {
            let cityData_active = this.regionData.find((value) => value.name == name);
            this.districtData = cityData_active.children;
            this.district = this.userInfo.district || "";
            this.formData.district = ""
            // this.town = "";
        }
    },
    districtChange: function (name, index) {
        // 二级地 县等发生改变
        if (name) {
            let districtData_active = this.districtData.find((value => value.name == name));
            // this.townData = districtData_active.children;
            // this.town = "";
        }
    },
    beforeUploadAction(file) {
        if (this.allowFiles.indexOf(file.name.substring(file.name.lastIndexOf("."))) === -1) {
            this.$message.error({
                message: '该后缀格式的文件不支持上传，仅支持' + this.allowFiles.join(" / ") + '文件'
            }
            )
        }
        // 上传前
    },
    uploadConfirm() {
        // 确认上传
        ms.http
            .post('/xwh/applicants/import/' + this.type + "/" + this.uploadId + '.do')
            .then((even) => {
                if (even.code == 200) {
                    this.$message({
                        message: "导入成功",
                        type: 'success'
                    });
                    this.getUnitList(this.searchMessage);
                } else if (
                    even.code == 200 &&
                    even.data.length > 0
                ) {
                    this.$message.error("导入失败")
                    this.uploadId = even.data[0].fileId;
                    let errorMes = "";
                    even.data.forEach((item) => {
                        errorMes = errorMes + "<p>" + (item.rowNum ? '行:' + item.rowNum : "") + '错误:' + item.errorMsg + "</p>" + '<br/>';
                    });
                    this.$notify.error({
                        title: '导入失败详细信息',
                        message: errorMes,
                        dangerouslyUseHTMLString: true,
                        duration: 0
                    });
                } else {
                    this.$message.error("导入失败");
                    let errorMes = "";
                    even.data.forEach((item) => {
                        errorMes = errorMes + "<p>" + (item.rowNum ? '行:' + item.rowNum : "") + '错误:' + item.errorMsg + "</p>" + '<br/>';
                    });
                    this.$notify.error({
                        title: "导入失败详细信息",
                        message: errorMes,
                        dangerouslyUseHTMLString: true,
                        duration: 0
                    });
                }
                this.dialogVisible = false;
            });
    },
    uploadSucAction(even) {
        // console.log("导入成功", even);
        if (even.code == 200 && even.data.length > 0 && !even.data[0].errorMsg) {
            this.uploadId = even.data[0].fileId;
            this.uploadConfirm();
        } else if (
            even.code == 200 &&
            even.data.length > 0 &&
            even.data[0].errorMsg
        ) {
            this.uploadId = even.data[0].fileId;
            let errorMes = "";
            even.data.forEach((item) => {
                errorMes = errorMes + (item.rowNum ? '行:' + item.rowNum : "") + '错误:' + item.errorMsg;
            });
            this.comfirmContent = errorMes;
            this.dialogVisible = true;
        } else if (
            even.code == 500 &&
            even.data.length > 0 &&
            even.data[0].errorMsg
        ) {
            this.uploadId = even.data[0].fileId;
            let errorMes = "";
            even.data.forEach((item) => {
                errorMes = errorMes + "<p>" + (item.rowNum ? '行:' + item.rowNum : "") + '错误:' + item.errorMsg + "</p>" + '<br/>';
            });
            this.$notify.error({
                title: '错误',
                message: errorMes,
                dangerouslyUseHTMLString: true,
                duration: 0
            });
        } else if (even.code == 500) {
            this.$message.error("导入失败")
        }
    },
    uploadErrAction() {
        this.$message.error("导入失败");
    },
    downFile(url, timeout = 60000) {
        let iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.style.zIndex = "-999"
        iframe.src = url;
        document.body.appendChild(iframe);
        setTimeout(() => {
            document.body.removeChild(iframe);
        }, timeout)
    },
    downLoadTemplate: function () {
        // 模板下载
        this.fullscreenLoading = true
        // this.$message({
        //     showClose: true,
        //     message: "开始下载"
        // })
        axios({
            url: '/xwh/applicants/downTemplateFile/' + this.type + '.do',
            responseType: 'blob',
            noHandleResponse: true,
            timeout: 60000
        }).then(res => {
            if (res.code && res.code == 500) {
                this.$message.error(res.msg || "下载失败")
            } else {
                let filename = decodeURIComponent(res.headers['content-disposition'].match(/filename=(.*)$/)[1],
                    "utf-8");
                let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.setAttribute('download', filename);
                document.body.appendChild(a);
                a.click();
                a.remove();
                this.fullscreenLoading = false
            }
        })
    },
    exportData(command) {
        // 导出数据
        this.fullscreenLoading = true
        axios({
            url: '/xwh/applicants/export.do?status=' + command + '&type=' + this.type,
            responseType: 'blob',
            noHandleResponse: true,
            timeout: 60000
        }).then(res => {
            if (res.code && res.code == 500) {
                this.$message.error(res.msg || "导出失败")
            } else {
                let filename = decodeURIComponent(res.headers['content-disposition'].match(/filename=(.*)$/)[1], 'utf-8');
                let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.setAttribute('download', filename);
                document.body.appendChild(a);
                a.click();
                a.remove();
                this.fullscreenLoading = false
            }
        })
    },
    regionReset() {
        // 地区重设
        if (this.formData.city) {
            this.districtData =
                this.regionData.find((value) =>
                    value.value == this.formData.city
                ).children || [];
            if (this.formData.district) {
                this.townData =
                    this.districtData.find((value) =>
                        value.value == this.formData.district,
                    ).children || [];
            }
        }
    },
    // 查询数据
    searchInfo() {
        this.loading = true;
        this.current = 1
        let info = {
            search: this.searchMsg,
            city: this.city,
            district: this.district,
            status: this.status,
            management: this.management,
            startTime: this.startTime,
            current: this.current,
            size: this.size,
            details: this.details,
            endTime: this.endTime,
            town: this.town,
            type: this.type
        }
        this.searchMessage = info
        this.getUnitList(info)
    },
    // 获取表格数据
    getUnitList: function (info = {
        search: this.searchMsg,
        city: this.city,
        district: this.district,
        status: this.status,
        management: this.management,
        startTime: this.startTime,
        current: this.current,
        size: this.size,
        details: this.details,
        endTime: this.endTime,
        town: this.town,
        type: this.type
    }) {
        // 获取放心消费承诺单位列表
        this.loading = true;
        ms.http.post("/xwh/applicants/listPage.do", JSON.stringify(info), { headers: { 'Content-type': 'application/json;charset=UTF-8' }, })
            .then((res) => {
                let data = res.data;
                this.total = Number(data.total);
                this.unitDataList = data.records;
                this.loading = false;
            });
    },
    validityChange(date) {
        // 有效期发生改变
        // console.log("有效期",date)
        this.formData.startTime = date[0];
        this.formData.endTime = date[1];
    },
    // 获取地区信息
    getRegionData() {
        ms.http.get('/xwh/gd-regin.do').then((res) => {
            if (res.code == 200) {
                this.regionData = res.data
                this.getUserInfo();
            }
        })
    },
    getManagerType() {
        ms.http.get('/xwh/type/listGoodsAndServiceType.do').then((res) => {
            this.manageType = res.data
        })
    },
    managementChange(data) {
        // 主经营类别改变
        if (data == "商品类") {
            // 商品类
            this.activeManageType = this.manageType.commodities || [];
        } else if (data == "服务类") {
            // 经营类
            this.activeManageType = this.manageType.services || [];
        } else if (data == "商品及服务类") {
            this.activeManageType = [
                ...this.manageType.commodities,
                ...this.manageType.services,
            ];
        }
    },
    handleSubmit(name, type = 1) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                this.setApply(type);
            } else {
                this.$message.error("请按要求重新填写");
            }
        });
        // this.isShow = true;
        // this.$emit("update:isShow", true);
    },
    // 录入功能
    setApply(type) {
        let params = JSON.stringify({ ...this.formData, type, addrs: JSON.stringify(this.formData.addrs) })
        ms.http.post('/xwh/applicants/apply/input.do', params,
            { headers: { 'Content-type': 'application/json;charset=UTF-8' } }).then((res) => {
                if (res.code == 200) {
                    this.$message({
                        type: "success",
                        message: "录入成功"
                    })
                    this.isShowEnteringModal = false
                    this.getUnitList()
                } else {
                    this.$message.error(res.msg || "录入失败")
                }
            })
    },
    // 经营地址添加按钮
    addAddress() {
        let userInfo = this.userInfo
        if (this.formData.addrs === undefined) {
            this.formData.addrs = []
        }
        this.formData.addrs.push({
            city: userInfo.city || "",
            district: userInfo.district || "",
            address: "",
        });
        let data = this.resetRegion(userInfo.city);
        this.districtDataArr[this.formData.addrs.length - 1] = data;
        this.$forceUpdate();
    },
    resetRegion(cityName) {
        if (cityName) {
            let data = this.regionData.find((value) => value.name == cityName).children || [];
            this.districtDataArr.push(data);
            return data;
            // if (this.formData.district) {
            //   this.townData =
            //     Lodash.find(this.districtData, {
            //       name: this.formData.district,
            //     }).children || [];
            // }
        }
    },
    // 打开编辑等页面
    openNew(num, row) {
        this.$refs.check.style.display = "block"
        this.action = ms.manager + "/route/check.do?type=" + num + "&id=" + row.id + "&status=" + row.status;
    },
    // 删除单个单位
    deleteConsumer(id) {
        this.$confirm('确认删除该项数据?', '删除提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error',
            center: true
        }).then(() => {
            ms.http.post('/xwh/applicants/remove/' + id + '.do').then((res) => {
                if (res.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getUnitList(this.searchMessage)
                } else {
                    this.$message.error('删除失败')
                }
            })
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        });
    },
    //续期
    renew(row) {
        // 将 row.endTime 解析为 Date 对象
        const endTime = new Date(row.endTime);
        endTime.setFullYear(endTime.getFullYear() + 3);
        const newEndTime = endTime.toISOString().substring(0, 7);
        const time = '是否确定续期到：' + row.endTime + '~' + newEndTime;
        this.$confirm(time, '续期提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error',
            center: true
        }).then(() => {
            ms.http.post('/xwh/applicants/extensionDate.do' + '?id=' + row.id).then((res) => {
                if (res.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '续期成功!'
                    });
                    this.getUnitList(this.searchMessage)
                } else {
                    this.$message.error('续期失败')
                }
            })
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消续期'
            });
        });
    },
    // 为删除添加id
    addIDs(selection) {
        this.ids.ids = []
        selection.forEach((item) => {
            this.ids.ids.push(item.id)
        })
    },
    // 删除多个单位
    deleteMoreConsumer() {
        let ids = JSON.stringify(this.ids)
        this.$confirm('确认删除该项数据?', '删除提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error',
            center: true
        }).then(() => {
            ms.http.post('/xwh/applicants/remove.do', ids, { headers: { 'Content-type': 'application/json;charset=UTF-8' }, }).then((res) => {
                if (res.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getUnitList(this.searchMessage)
                } else {
                    this.$message.error('删除失败')
                }
            })
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        });
    },
    // 从上一级页面返回新页面时的成功的提示
    currentTopic(msg) {
        this.$message({
            message: msg,
            type: "success"
        })
    },
}
// 获取用户信息
let getUserInfo = () => {
    let id = sessionStorage.getItem('userId')
    ms.http.get('/xwh/user/userInfo.do', { id }).then((res) => {
        if (res.code == 200) {
            this.userInfo = { ...res.data, id }
            this.formData.addrs.push({
                city: this.userInfo.city,
                district: this.userInfo.district,
                address: ""
            })
            this.district = this.userInfo.district
            this.city = this.userInfo.city
            this.cityChange(this.userInfo.city)
            this.districtChange(this.userInfo.district)
            this.getUnitList();
            this.searchMessage = {
                search: this.searchMsg,
                city: this.city,
                district: this.district,
                status: this.status,
                management: this.management,
                startTime: this.startTime,
                current: this.current,
                size: this.size,
                details: this.details,
                endTime: this.endTime,
                town: this.town,
                type: this.type
            }
        }
    })
}