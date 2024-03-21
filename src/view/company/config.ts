interface colType {
    id: string,
    label: string,
    width?: number,
    fixed?: string
}
interface formType {
    id: string
    label: string
}

export const columns: Array<colType> = [
    {
        id: 'regName',
        fixed: 'left',
        width: 150,
        label: '经营者注册名称'
    },
    {
        id: 'account',
        width: 100,
        label: '创建人'
    },
    {
        id: 'storeName',
        label: '门店名称'
    },
    {
        id: 'address',
        width: 120,
        label: '经营场所地址'
    },
    {
        id: 'status',
        label: '状态',
        width: 80  
    },
    {
        id: 'validity',
        label: '有效期'   
    },
    {
        id: 'createTime',
        label: '创建时间'
    },
    {
        id: 'startTime',
        label: '通过时间'   
    },
    {
        id: 'creditCode',
        width: 180,
        label: '统一社会信用代码'   
    },
    {
        id: 'principal',
        label: '负责人'
    },
    {
        id: 'principalTel',
        label: '手机号码'
    }
]

export const statusArr: Array<string> = ['在期', '过期', '待审核', '审核不通过']

export const detailLabel: Array<formType> = [
    {
        id: 'regName',
        label: '经营者名称'
    },
    {
        id: 'storeName',
        label: '店铺名称'
    },
    {
        id: 'address',
        label: '经营场所地区'
    },
    {
        id: 'creditCode',
        label: '统一社会信用代码'
    },
    {
        id: 'validity',
        label: '有效期'
    },
    {
        id: 'businessCategory',
        label: '经营类别'
    },
    {
        id: 'principalName',
        label: '负责人姓名'
    },
    {
        id: 'principalTel',
        label: '联系电话'
    }
]